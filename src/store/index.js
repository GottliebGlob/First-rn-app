import {createStore, combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {eventReducer} from "./reducers/eventReducer"
import {themeReducer} from "./reducers/themeReducer"

const rootReducer = combineReducers({
    event: eventReducer,
    theme:  themeReducer
})

export default createStore(rootReducer, applyMiddleware(thunk))
