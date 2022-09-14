/**
 * Check if all values in a comma-separated string are contained in an array
 *
 * @param commaSeparatedString - A comma-separated string of values that can be transformed to an array
 * @param ReferenceArray - The larger array to check if all string values are contained within
 * @returns boolean Returns 'true' if all elements of CS string are in the reference array, else 'false'
 */
export const isStringInArray = (commaSeparatedString: string, ReferenceArray: string[]) => {
  const result = commaSeparatedString.split(',').every(element => {
    return ReferenceArray.includes(element.replace(/^\s+/, ''))
  })

  if (result) return true
  return false
}
