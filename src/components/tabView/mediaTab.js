import React, { Component } from 'react';

class MediaTab extends Component {
  render() {
    const { media } = this.props;
    var data = "";
    if(!media){
        data = <h3>No media</h3>
    }else{
        if(media.length === 0){
            data = <h3>No media</h3>
        }else{
            data = media.map(mediaItem => {
                return JSON.stringify(mediaItem);
            });
        }
    }
    return (
        <div>{data}</div>
    );
  }
}

export default MediaTab;
