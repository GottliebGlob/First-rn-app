import {LOAD_EVENTS, REMOVE_EVENT, ADD_EVENT} from "../types";

const initialState ={
    actEvents: [],
    multiEvents: []
}

export const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_EVENTS:
            return {
                ...state,
                actEvents: action.payload.filter(event => !event.repeat),
                multiEvents: action.payload.filter(event => event.repeat)
            }
        case REMOVE_EVENT:
            return {
                ...state,
                actEvents: state.actEvents.filter(p => p.id !== action.payload),
                multiEvents: state.multiEvents.filter(p => p.id !== action.payload)
            }
        case ADD_EVENT:
            return {
                ...state,
                actEvents: [{ ...action.payload }, ...state.actEvents]

            }
        default: return state;
    }
}
