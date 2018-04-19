import React, { Component } from 'react';


class NameTab extends Component {
  render() {
    const { alternates } = this.props;
    var altName = "";
    if (!alternates){
      altName = <h4>No alternate names</h4>
    }
    else{
        if(alternates.length=== 0){
           altName = <h4>No alternate names</h4>
        }else{
            var count = 0;
            altName = alternates.map(altItem => {
                count++;
                return (
                    <div style={{backgroundColor: "#f5f5f5", padding: "5px", marginBottom: "5px", borderRadius: "5px"}} key={count}>
                    {altItem}
                    </div>
                );
            });

        }
    }
    return (
        <div>
            {altName}
        </div>
    );
  }
}

export default NameTab;
