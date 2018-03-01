import {   
  SEND_PAYLOAD,
 } from '../Actions/payloadActions'

const initialState = { 
  payload: [],
}

const payloadReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_PAYLOAD:
      return {
        ...state,
        payload: action.data
      }

    default:
      return state
  }
}

export default payloadReducer