import React, { Component } from 'react';
import ConceptModal from './conceptModal';

class HistoryTab extends Component {
  render() {
    const { history } = this.props;
    var data = "";
    if(!history){
        data = <h3>No history</h3>
    }else{
        if(history.length === 0){
            data = <h3>No history</h3>
        }else{
            data = 
            <div style={{overflowY: "scroll"}}>
            {history.map(historyItem => {
                return (
                    <div style={{marginBottom: "10px", borderBottom: "solid 1px #757575"}} key={historyItem.Date_Created}>
                        <ul style={{listStyle: "none"}}>
                            <li>Action: {historyItem.Action}</li>
                            <li>Created: {historyItem.Creator_Name}</li>
                            <li>Approved: {historyItem.is_approved? "True": "False"}</li>
                            <li>Field: {historyItem.Field}</li>
                            <li>Old Value: {historyItem.Previous_Value}</li>
                            <li>New Value: {historyItem.New_Value}</li>
                            <li>Item Processor: {historyItem.Processor_Name}</li>
                            <li>Process date: {historyItem.Processed_Date}</li>
                        </ul>
                    </div>
                );
            })}
            </div>
        }
    }
    return (
        <div>
            {this.props.isAuthenticated && 
                <div className={"row"} style={{width: "100%", paddingRight: "42%", display: "inline-block", margin: "5px"}}>
                    <ConceptModal parent={this.props.conceptName}/>
                </div>
            }
            <div>{data}</div>
        </div>
    );
  }
}

export default HistoryTab;
