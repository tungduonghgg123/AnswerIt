const moment = require('moment')

function timestamp2date(timestamp) {
  return moment.unix(timestamp).format('DD/MM/YYYY HH:mm')
}
function differentive(tp1, tp2) {
  console.log(timestamp2date(tp1))
  console.log(timestamp2date(tp2))
  const moment1 = moment.unix(tp1)
  const moment2 = moment.unix(tp2)
  return moment1.diff(moment2, 'minutes')
}

console.log(differentive(1575392892 ,1575392006))