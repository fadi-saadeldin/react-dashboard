import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDevices } from '../../actions';
import { Spinner, SearchInput } from '../common';
import DevicesList from './devicesList';
import _ from 'lodash';
let activeDevicesCount = 0;
let inActiveDevicesCount = 0;
let searchResults=[];
searchResults['devices_list']=[];
let activeDevices;
let inActiveDevices;
let devicesContent;
let counterContent;
let searchInput;
class DevicesDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      searchTrue: false
    };
  }
  componentDidMount() {
    this.props.getDevices();
  }
  //handle in change input
  handleInput(value) {
    let nameSearchResults = _.filter(this.props.devices.devices_list, function (item) {
      return item.name.indexOf(value) > -1;
    });
    searchResults['devices_list'] = nameSearchResults;
    this.setState({ searchTrue: true, searchValue: value });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.devices.update_success) {
      this.setState({ searchTrue: false, searchValue: '' });
    }
  }
  render() {
    const { devices_list, loading, updated_device, update_success } = this.props.devices;
    if (devices_list === null || loading) {
      <Spinner loading={true} />
    } else {
      if (Object.keys(devices_list).length > 0) {
        //  search input conetnt
        searchInput = <SearchInput
          placeholder="Search device"
          value={this.state.searchValue}
          handleChange={this.handleInput.bind(this)}
        />
        // get devices counter content
        if(this.state.searchTrue){
         activeDevices = _.filter(searchResults.devices_list, { 'active': true });
         inActiveDevices = _.filter(searchResults.devices_list, { 'active': false })
        }else{
           activeDevices = _.filter(devices_list, { 'active': true });
           inActiveDevices = _.filter(devices_list, { 'active': false })
        }
        activeDevicesCount = Object.keys(activeDevices).length;
        inActiveDevicesCount = Object.keys(inActiveDevices).length;
        counterContent = <div className="devices-counter">Active Devices: {activeDevicesCount}   Inactive Devices: {inActiveDevicesCount}</div>

        //  Devices List content
        devicesContent = <DevicesList
          devices={(this.state.searchTrue) ? searchResults : this.props.devices}
        />
      } else {
        <div />
      }
    }
    return (
      <div className="diveces-list">
        <div className="content-header">
          {counterContent}
          {searchInput}
        </div>
        {devicesContent}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  devices: state.devices
});

export default connect(mapStateToProps, { getDevices, })(
  DevicesDashboard
);

