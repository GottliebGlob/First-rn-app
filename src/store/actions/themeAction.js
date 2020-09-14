import {DARK_THEME, LIGHT_THEME, LOAD_THEME} from "../types"
import {DB} from "../../core/db";

export const loadTheme = () => {
    return async dispatch => {
        const theme = await DB.getTheme()
        let [t] = Object.values(...theme)
        if (theme.length === 0) {
            await DB.insertTheme()
            console.log('inserted')
        }
        dispatch({
            type: LOAD_THEME,
            payload: t
        })
    }
}

export const enableLight = () => async dispatch => {
  await DB.enableLight()
    dispatch({type: LIGHT_THEME})
}

export const enableDark = () => async dispatch => {
    await DB.enableDark()
  dispatch( {  type: DARK_THEME })
}


