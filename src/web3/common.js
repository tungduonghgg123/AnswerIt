// TODO: move this to tweb3 util

const decimal = 6
const moment = require('moment')

exports.timestamp2date = (timestamp) => {
  return moment.unix(timestamp).format('DD/MM/YYYY HH:mm')
}
exports.toTEA = (unit) => {
  return Number(unit) / (10 ** decimal)
}

exports.toUNIT = (tea) => {
  tea = (+tea).toFixed(decimal)
  return tea * (10 ** decimal)
}

exports.toUNIXTimestamp = (dateObj) => {
  try {
    return Math.round(dateObj.getTime() / 1000)
  } catch (e){
    throw e
  }
}