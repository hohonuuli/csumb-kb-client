import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { refreshConcept } from '../../actions/index';
import {Treebeard, decorators} from 'react-treebeard';
import './treeView.css';
import style from './treeViewStyle';
import * as filters from './filter';


class TreeView extends Component {

  constructor(props){
        super(props);
        this.state = {
          touchedData: {},
          untouchedData: {},
        };
        this.onToggle = this.onToggle.bind(this);
  }

  onToggle(node, toggled){
    if(this.state.cursor){this.state.cursor.active = false;}
    node.active = true;
    if(node.children){ node.toggled = toggled; }
    this.setState({ cursor: node });

    var nodeName = encodeURIComponent((node.name).trim());
    this.props.refreshConcept(nodeName)
  }

  componentWillMount(){
    fetch("http://localhost:8083/kb/v1/phylogeny/down/object")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({touchedData: result, untouchedData:result});
      },
      (error) => {
        console.log(error);
      }
    )
  }
  onFilterMouseUp(e){
    const filter = e.target.value.trim();
    if (!filter || filter.length < 4) {
        return this.setState({touchedData: this.state.untouchedData});
    }
    var filtered = filters.filterTree(this.state.touchedData, filter);
    filtered = filters.expandFilteredNodes(filtered, filter);
    this.setState({touchedData: filtered});
  }
  render() {

    return (
      <div className="col-sm-3 col-md-3 sidebar">
        <input className="form-control" style={{marginBottom: "10px"}} onKeyUp={this.onFilterMouseUp.bind(this)} placeholder="Search" type="text"/>
        <ul className="nav nav-sidebar">
          <ul className="nav nav-list">
            <Treebeard
                data={this.state.touchedData}
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
    return bindActionCreators({refreshConcept: refreshConcept}, dispatch);
}

decorators.Header = ({style, node}) => {
    return (
        <div style={style.base}>
            <div style={style.title}>
                {node.name}
            </div>
        </div>
    );
};
decorators.Toggle = ({style}) =>{
  const {height, width} = style;
    const midHeight = height * 0.5;
    const points = `0,0 0,${height} ${width},${midHeight}`;

    return (
        <div style={style.base}>
            <div style={style.wrapper}>
                <svg height={height} width={width}>
                    <polygon points={points} style={style.arrow}/>
                </svg>
            </div>
        </div>
    );
}

export default connect(mapStateToProps, matchDispatchToProps)(TreeView);
