import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getDevices} from '../../actions';
import DevicesDashboard from '../devices/devicesDashboard';
class Landing extends Component {

  render() {
    return (
      <div className="dashboard">
      <div className="container">
           <h1>Dashboard</h1>
            <DevicesDashboard/>
      </div>
      </div>
    );
  }
}
export default Landing;

