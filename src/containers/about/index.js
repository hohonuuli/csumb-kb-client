import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
import imagePath from './assetHelper';

class About extends Component {
  render() {
    return (
      <Grid>
        <Row>
        <h1>About:
            <small></small>
        </h1>
        <p>Hello! We are the team behind the new MBARI knowledgebase application. 
            This application was created in partnership between California State University, Monterey and M.B.A.R.I.
            as a computer science senior capstone project for CST 499 for the Spring 2018 semester. 
            We are graduating undergraduate computer science students with concentrations in software engineering.
            This application is powered by Spark framework as the back-end, and HTML + React JS for the front-end.</p>
        <h4>Source code:
            <small></small>
        </h4>
        <p>Source code for both ends of the project are available via Github. <a href="https://github.com/hohonuuli/csumb-kb-server" target="_blank" rel="noopener noreferrer">Back-end Server</a> and <a href="https://github.com/hohonuuli/csumb-kb-client" target="_blank" rel="noopener noreferrer">Front-end client</a></p>
        <div className="col-lg-12">
          <h2>Our Team</h2>
        </div>

        <div className="col-lg-3 col-sm-6 text-center">
          <img style={{borderRadius: "100px"}}  src={imagePath('lucas.png')} alt="Lucas"/>
          <h3>Lucas Childers</h3>
          <p>Part of the back-end team</p>
          <p><a href="https://github.com/LucasChilders" target="_blank" rel="noopener noreferrer">Github</a></p>
        </div>

        <div className="col-lg-3 col-sm-6 text-center">
          <img style={{borderRadius: "100px"}}  src={imagePath('meya.png')} alt="Meya"/>
          <h3>Meya Gorbea</h3>
          <p>Part of the front-end team</p>
          <p><a href="https://github.com/meyag9" target="_blank" rel="noopener noreferrer">Github</a></p>
        </div>

        <div className="col-lg-3 col-sm-6 text-center">
          <img style={{borderRadius: "100px"}}  src={imagePath('tomas.png')} alt="Tomas"/>
          <h3>Tomas Hernandez</h3>
          <p>Part of the front-end team</p>
          <p><a href="https://github.com/ttoti" target="_blank" rel="noopener noreferrer">Github</a></p>
        </div>

        <div className="col-lg-3 col-sm-6 text-center">
          <img style={{borderRadius: "100px"}} src={imagePath('dario.png')} alt="Dario"/>
          <h3>Dario Molina</h3>
          <p>Part of the back-end team</p>
          <p><a href="https://github.com/dariomolina93" target="_blank" rel="noopener noreferrer">Github</a></p>
        </div>
        </Row>
      </Grid>
    );
  }
}

export default About;
