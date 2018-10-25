import axios from 'axios';
import {
GET_ERRORS,
GET_DEVICES,
LOADING,
UPDATE_STATUS_ERROR,
UPDATE_STATUS_SUCCESS,
} from './types';

// on Change name 
// export const nameChanged = (text) => {
//   return {
//     type: NAME_CHANGED,
//     payload: text
//   };
// };


const serverUrl='http://localhost:8888';
// Get current profile
export const getDevices = (name,success) => dispatch => {
  // dispatch(setParticipantLoading());
  axios
    .get(serverUrl+'/device')
    .then(res =>
    dispatch({
      type:GET_DEVICES,
      payload:res.data.data,
      success:(success)?success:'',
      device_name:(name)?name:''
    })
    )
    .catch(err =>console.log(err)   
    );
};
// Edit Device Status
export const editStatus = ({name,status}) => dispatch => {
  axios
    .patch(serverUrl+`/device/${name}?active=${status}`)
      .then(res => {
        if(res.status==200){
          editStatusSuccess(dispatch, name);
        }
      }
    )
    .catch(err => editStatusFail(dispatch, name)
    );
};
// Edit Status Success 
const editStatusSuccess = (dispatch, name) => {
  let success=true
  dispatch(getDevices(name,success));

};
// Edit Status Fail
const editStatusFail = (dispatch, name) => {
  let success=false
  dispatch(getDevices(name,success));
};





// Profile loading
export const setParticipantLoading = () => {
  return {
    type: PARTICIPANT_LOADING
  };
};


