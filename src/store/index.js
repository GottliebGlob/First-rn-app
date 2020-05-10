import {createStore, combineReducers} from "redux";
import {eventReducer} from "./reducers/eventReducer"
import {themeReducer} from "./reducers/themeReducer"

const rootReducer = combineReducers({
    event: eventReducer,
    theme:  themeReducer
})

export default createStore(rootReducer)
