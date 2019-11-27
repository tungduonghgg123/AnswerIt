// TODO: move this to tweb3 util

const decimal = 6

exports.toTEA = (unit) => {
  return Number(unit) / (10 ** decimal)
}

exports.toUNIT = (tea) => {
  tea = (+tea).toFixed(decimal)
  return tea * (10 ** decimal)
}
