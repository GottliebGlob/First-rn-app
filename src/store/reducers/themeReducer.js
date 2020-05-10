import {DARK_THEME} from "../types"
import {LIGHT_THEME} from "../types"

const initialState = {
    theme: false
}

export const themeReducer = (state = initialState, action) => {
    switch (action.type) {
        case LIGHT_THEME: return {...state, theme : false}
        case DARK_THEME: return {...state, theme : true}
        default: return state
    }
}
