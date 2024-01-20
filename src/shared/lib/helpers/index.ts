import { PRESSURE_UNITS } from '../constants'

export const capitalizeFirstLetter = (str: string) => {
  if (!str) return ''

  return str.charAt(0).toUpperCase() + str.slice(1)
}
