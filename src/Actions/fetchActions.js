export function fetch(type) {
  return {
    type
  }
}

export function fetchSuccess(type, data) {
  if (data) {return { type, data }} 
  else {return { type }}
}

export function fetchFailure(type, errorMsg) {
  return {
    type,
    errorMsg
  }
}