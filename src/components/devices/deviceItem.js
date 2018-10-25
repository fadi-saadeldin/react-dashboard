import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editStatus } from '../../actions';

class DeviceItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayEditInputs: false,
      name: this.props.device.name,
      status: this.props.device.active,
      error: "",
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.updated_device == this.state.name) {
      if (nextProps.update_success) {
        this.setState({ displayEditInputs: false, error: '' });
      } else if (!nextProps.update_success) {
        this.setState({ error: 'error try again' })
      }
    }
  }

  onSubmit(e) {
    e.preventDefault();
    let name = this.state.name;
    let status = this.state.status;
    this.props.editStatus({ name, status });
  }
  onStatusChange(e) {
    this.setState({ status: e.target.value });

  }

  render() {
    const { displayEditInputs } = this.state;
    const { name, unit, value, active, timestamp } = this.props.device;
    let status;
    let editInputs;
    if (displayEditInputs) {
      status = "";
      editInputs = (
        <div className="inline-wrap">
          <div className="inline-wrap_inner">
            <form onSubmit={this.onSubmit}>
              <div className=" form-group">
                <select onChange={this.onStatusChange.bind(this)} value={this.state.status} className="form-control" name="status" width="100px;">
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
              <input
                type="submit"
                value="Save"
                className="btn  float-right btn-primary"
              />
              <button
                type="button"
                onClick={() => {
                  this.setState(prevState => ({
                    displayEditInputs: !prevState.displayEditInputs
                  }));
                }}
                value="cancel"
                className="btn  btn-inline float-right mr-3"
              >Cancel</button>
            </form>
          </div>
          <div>{this.state.error ? this.state.error : ""}</div>
        </div >
      );
    } else {
      status =
        (<button type="button" onClick={() => {
          this.setState(prevState => ({
            displayEditInputs: !prevState.displayEditInputs
          }));
        }} className="text-success ">
          {(active) ? 'active' : 'inactive'}
        </button>
        )

    }
    return (
      <tr>
        <th>{name}</th>
        <th>{value}</th>
        <th>{unit}</th>
        <th>
          <div >
            {status}
          </div>
          {editInputs}
        </th>
        <th>{timestamp}</th>
      </tr>
    );
  }
}
export default connect(null, { editStatus })(DeviceItem);
