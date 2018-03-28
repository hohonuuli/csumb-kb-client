import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { setCurrentObject } from '../../actions/index';
import {Treebeard, decorators} from 'react-treebeard';
import './treeView.css';
import style from './treeViewStyle';

decorators.Header = ({style, node}) => {
    return (
        <div style={style.base}>
            <div style={style.title}>
                {node.name}
            </div>
        </div>
    );
};

class TreeView extends Component {

  constructor(props){
        super(props);
        this.state = {
          treeData: {},
        };
        this.onToggle = this.onToggle.bind(this);
  }

  onToggle(node, toggled){
        if(this.state.cursor){this.state.cursor.active = false;}
        node.active = true;
        if(node.children){ node.toggled = toggled; }
        this.setState({ cursor: node });

        var nodeName = encodeURIComponent((node.name).trim());
        fetch("http://localhost:8083/kb/v1/concept/" + nodeName)
        .then(res => res.json())
        .then(
          (result) => {
            this.props.setCurrentObject(result);
          },
          (error) => {
            console.log(error);
          }
        )
  }

  componentWillMount(){
    fetch("http://localhost:8083/kb/v1/phylogeny/down/object")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({treeData: result});
      },
      (error) => {
        console.log(error);
      }
    )
  }
  render() {

    return (
      <div className="col-sm-3 col-md-2 sidebar">
        <ul className="nav nav-sidebar">
          <ul className="nav nav-list">
            <Treebeard
                data={this.state.treeData}
                onToggle={this.onToggle}
                style={style}
                decorators={decorators}
            />
          </ul>
        </ul>
      </div>
    );
  }
}

// Get apps state and pass it as props to currentObject
//      > whenever state changes, the currentObject will automatically re-render
function mapStateToProps(state) {
    return {
        currentObject: state.currentObject
    };
}

// Get actions and pass them as props to to currentObject
//      > now currentObject has this.props.currentObject
function matchDispatchToProps(dispatch){
    return bindActionCreators({setCurrentObject: setCurrentObject}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(TreeView);
