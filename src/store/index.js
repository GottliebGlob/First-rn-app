import {createStore, combineReducers} from "redux";
import {eventReducer} from "./reducers/eventReducer";

const rootReducer = combineReducers({
    event: eventReducer
})

export default createStore(rootReducer)
