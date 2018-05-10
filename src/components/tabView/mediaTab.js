import React, { Component } from 'react';
import { Checkbox, Col, Form, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import MediaModal from '../common/modals/mediaModal';
import DeleteMediaModal from '../common/modals/deleteMediaModal';
import UpdateMediaModal from '../common/modals/updateMediaModal';


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
            var count = 0;
            data = media.map(mediaItem => {
                count++;
                var mediaObject;
                if(mediaItem.type === 'Image'){
                    mediaObject = <img style={{display: "block", width: "250px", margin: "0 auto"}} src={mediaItem.url} alt={mediaItem.caption}/>
                }else if(mediaItem.type === 'Icon'){
                    mediaObject = <img style={{display: "block", width: "50px", margin: "0 auto"}} src={mediaItem.url} alt={mediaItem.caption}/>
                }else{
                    mediaObject = (
                                <video width={320} height={240} controls style={{display: "block", margin: "0 auto"}} >
                                    <source src={mediaItem.url} type={"video/mp4"} />
                                    Your browser does not support the video tag.
                                </video> )
                }
                return (
                    <div style={{backgroundColor: "#f5f5f5", padding: "10px", marginBottom: "10px", borderRadius: "10px"}} key={mediaItem.url + count}>
                    {this.props.isAuthenticated && 
                        <div className={"row"} style={{width: "98%", display: "inline-block", margin: "5px"}}>
                            <DeleteMediaModal url={mediaItem.url} conceptName={this.props.conceptName} refreshConcept={this.props.refreshConcept}/>
                            <UpdateMediaModal mediaItem={mediaItem} conceptName={this.props.conceptName} refreshConcept={this.props.refreshConcept}/>
                        </div>
                    }
                    <Form horizontal>
                        <FormGroup controlId="formHorizontalUrl">
                            <Col componentClass={ControlLabel} sm={2}>
                            URL:
                            </Col>
                            <Col sm={10}>
                                <FormControl type="text" placeholder="" value={mediaItem.url} readOnly/>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalCaption">
                            <Col componentClass={ControlLabel} sm={2}>
                            Caption
                            </Col>
                            <Col sm={10}>
                            <FormControl type="text" placeholder="" value={mediaItem.caption} readOnly/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalCredit">
                            <Col componentClass={ControlLabel} sm={2}>
                            Credit
                            </Col>
                            <Col sm={10}>
                            <FormControl type="text" placeholder="" value={mediaItem.credit} readOnly/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalType">
                            <Col componentClass={ControlLabel} sm={2}>
                            Type
                            </Col>
                            <Col sm={10}>
                            <FormControl type="text" placeholder="" value={mediaItem.type} readOnly/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col smOffset={2} sm={10}>
                            {mediaItem.isPrimary === "true" ?
                                <Checkbox readOnly checked>Primary?</Checkbox> :
                                <Checkbox readOnly>Primary?</Checkbox>
                            }
                            </Col>
                        </FormGroup>
                    </Form>
                    {mediaObject}
                    </div>
                );
            });
        }
    }
    return (
        <div>
            {this.props.isAuthenticated && 
                <div className={"row"} style={{width: "100%", paddingRight: "46%", display: "inline-block", margin: "5px"}}>
                    <MediaModal conceptName={this.props.conceptName} refreshConcept={this.props.refreshConcept}/>
                </div>
            }
            <div>{data}</div>
        </div>
    );
  }
}

export default MediaTab;
