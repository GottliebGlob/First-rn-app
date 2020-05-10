import {DARK_THEME, LIGHT_THEME} from "../types"

export const enableLight = () => {
    return {type: LIGHT_THEME}
}

export const enableDark = () => {
  return {  type: DARK_THEME }
}
