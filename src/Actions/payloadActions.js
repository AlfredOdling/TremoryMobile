import {
  SEND_PAYLOAD,
} from "./payloadActionTypes"

export function sendPayload(payload) {
  return {
    type: SEND_PAYLOAD,
    data: payload,
  }
}

export {
  SEND_PAYLOAD,
}