import React, { Component } from 'react';
import AddNameModal from '../common/modals/addNameModal';
import DeleteConceptModal from '../common/modals/deleteConceptModal';
import AddConceptModal from '../common/modals/addConceptModal';
import UpdateConceptNameModal from '../common/modals/updateConceptNameModal';

class NameTab extends Component {
  render() {
    const { alternates } = this.props;

    var altNames = "";
    if (!alternates){
        altNames = <h4>No alternate names</h4>
    }
    else{
        if(alternates.length=== 0){
            altNames = <h4>No alternate names</h4>
        }else{
            var count = 0;
            altNames = 
            <div>
                {alternates.map(altItem => {
                    count++;
                    return (
                        <div style={{backgroundColor: "#f5f5f5", padding: "5px", marginBottom: "5px", borderRadius: "5px", height: "40px"}} key={count}>
                            <strong>Type: {altItem.Type}</strong> - <strong>{altItem.Name}</strong>
                            {this.props.isAuthenticated &&
                                <UpdateConceptNameModal parentConcept={this.props.conceptName} conceptName={altItem.Name} refreshConcept={this.props.refreshConcept}/>
                            }
                        </div>
                    );
                    }
                )}
            </div>
        }
    }
    return (
        <div>
            {this.props.isAuthenticated &&
              <div>
                <div className={"row"} style={{width: "100%", paddingRight: "35%", display: "inline-block", margin: "5px"}}>
                    <AddNameModal style={{marginLeft: '10px'}} conceptName={this.props.conceptName} refreshConcept={this.props.refreshConcept}/>
                    <DeleteConceptModal style={{marginLeft: '10px'}} conceptName={this.props.conceptName} />
                    <AddConceptModal parentConcept={this.props.conceptName}/>
                </div>
              </div>
            }
            <h3 style={{textTransform: "capitalize"}}>{this.props.conceptName}</h3>
            {altNames}
        </div>
    );
  }
}

export default NameTab;
