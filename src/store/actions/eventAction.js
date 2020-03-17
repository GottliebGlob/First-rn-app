import {LOAD_EVENTS, ADD_EVENT, REMOVE_EVENT} from "../types";
import {DATA} from "../../data";

export const loadEvents = () => {
    return{
        type: LOAD_EVENTS,
        payload: DATA
    }
}

export const removeEvent = id => {
    return {
        type: REMOVE_EVENT,
        payload: id
    }
}

export const addEvent = post => {
    post.id = Date.now().toString()

    return {
        type: ADD_EVENT,
        payload: post
    }
}
