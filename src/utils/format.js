/**
 * Converts the given number to a string.
 *
 * @param {number} number The number to format.
 * @returns {string}
 */
export function formatNumber(number) {
  let enString = String(Math.round(number))
  const decimalDelimiterPosition = enString.indexOf('.')

  enString = enString.replace(/\d(?=(?:\d{3})+(?:\.|$))/g, (digit, index) =>
    decimalDelimiterPosition < 0 || index < decimalDelimiterPosition ? `${digit},` : digit
  )

  // Swap around . and ,
  return enString.replace(/[.,]/g, character => {
    return character === '.' ? ',' : '.'
  })
}
