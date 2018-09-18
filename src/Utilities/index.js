export const checkIfAllInputsAreFilled = (...params) => {
  for (let i = 0; params.length > i; i++) {
    if (params[i] === null || params[i] === undefined) return false
  }
  return true
}
