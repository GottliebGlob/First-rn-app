import {LOAD_EVENTS, ADD_EVENT, REMOVE_EVENT} from "../types";
import {DB} from '../../core/db'

export const loadEvents = () => {
    return async dispatch => {
        const events = await DB.getEvents()
        dispatch({
            type: LOAD_EVENTS,
            payload: events
        })
    }
}

export const removeEvent = id => async dispatch => {
    await DB.removeEvent(id)
    dispatch( {
        type: REMOVE_EVENT,
        payload: id
    })
}

export const addEvent = post => async dispatch => {

    const payload = post
    const id = await DB.createEvent(payload)
    payload.id = id

    dispatch( {
        type: ADD_EVENT,
        payload: payload
    })
}
