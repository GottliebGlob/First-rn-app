import {DARK_THEME, LOAD_THEME} from "../types"
import {LIGHT_THEME} from "../types"

const initialState = {
    theme: 0
}

export const themeReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_THEME: return {...state, theme: action.payload}
        case LIGHT_THEME: return {...state, theme : 0}
        case DARK_THEME: return {...state, theme : 1}
        default: return state
    }
}
