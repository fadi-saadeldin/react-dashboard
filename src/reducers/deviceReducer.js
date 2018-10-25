import {
  GET_ERRORS,
  GET_DEVICES,
  LOADING,
  UPDATE_STATUS_ERROR,
  UPDATE_STATUS_SUCCESS
} from '../actions/types';

const initialState = {
  devices_list: null,
  loading: false,
  errors:"",
  error:"",
  updated_device:"",
  update_success:""

};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DEVICES:
    return {
      devices_list: action.payload,
      loading: false,
      updated_device:action.device_name,
      update_success:action.success
    };
    case UPDATE_STATUS_SUCCESS:
    return {
      update_device_success:action.payload
    };
    case UPDATE_STATUS_ERROR:
    return {

      error:'error',
      update_device_error:action.payload
    };
    default:
      return state;
  }
}
