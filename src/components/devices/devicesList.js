import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDevices } from '../../actions';
import {Spinner,SearchInput} from '../common';
import DeviceItem from './deviceItem';

class DevicesList extends Component {
  render(){
    const { devices_list, loading, updated_device, update_success } = this.props.devices;
    return(
<table className="table table-striped">
          <thead>
            <tr >
              <th>Name</th>
              <th>Value</th>
              <th>Unit</th>
              <th>Status</th>
              <th>TimeStamp</th>
            </tr>
          </thead>
          <tbody>
            {devices_list.map((device, i) =>
              <DeviceItem
                key={i}
                updated_device={updated_device}
                update_success={update_success}
                device={device}
              />)
            }
          </tbody>
        </table>
    )
          }
        }
        
        export default DevicesList