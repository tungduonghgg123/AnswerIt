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
exports.diffTime =(time) => {
  // Set new thresholds
  // moment.relativeTimeThreshold("s", 10);
  moment.relativeTimeThreshold('ss', 60);
  moment.relativeTimeThreshold('m', 60);
  moment.relativeTimeThreshold('h', 20);
  // moment.relativeTimeThreshold("d", 25);
  // moment.relativeTimeThreshold("M", 10);

  moment.updateLocale('en', {
    relativeTime: {
      future: 'in %s',
      past: '%s ago',
      s: '%d secs',
      ss: '%d secs',
      m: 'a minute',
      mm: '%d minutes',
      h: '%d hour',
      hh: '%d hours',
      d: 'a day',
      dd: '%d days',
      M: 'a month',
      MM: '%d months',
      y: 'a year',
      yy: '%d years',
    },
  });
  return moment.unix(time).fromNow();
}
exports.MODIFY_TIME = 15 * 60
