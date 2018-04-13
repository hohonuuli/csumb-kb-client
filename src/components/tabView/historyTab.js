import React, { Component } from 'react';

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
            data = <div style={{overflowY: "scroll", height: "350px"}}>{history.map(historyItem => {
                return JSON.stringify(historyItem);
            })}</div>
        }
    }
    return (
        <div>{data}</div>
    );
  }
}

export default HistoryTab;
