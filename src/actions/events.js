import Swal from "sweetalert2";

import { fetchWithToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";


export const eventStartAddNew = event => {
    return async ( dispatch, getState ) => {

        const { uid, name } = getState().auth;

        try {
            
            const response = await fetchWithToken( 'events', event, 'POST' );
            const body = await response.json();

            if( body.ok ) {
                
                event.id = body.event.id;
                event.user = {
                    _id: uid,
                    name
                };
                console.log( event );
                dispatch( eventAddNew( event ) );
            }
        } catch (error) {
            console.error(error);
        }

    };
};

const eventAddNew = event => ({ 
    type: types.eventAddNew,
    payload: event
});

export const eventSetActive = event => ({ 
    type: types.eventSetActive,
    payload: event
});

export const eventClearActiveEvent = () => ({ type: types.eventClearActiveEvent });

export const eventStartDelete = () => {
    return async ( dispatch, getState ) => {
        const { id } = getState().calendar.activeEvent;
        try {
            const response = await fetchWithToken( `events/${ id }`, {}, 'DELETE' );
            const body = await response.json();
            if ( body.ok ) {
                dispatch( eventDeleted() );
            } else {
                Swal.fire('Error', body.msg, 'error' );
            }
        } catch (error) {
            console.error(error);
        }
    };
};
const eventDeleted = () => ({ type: types.eventDeleted });

export const eventStartUpdated = event => {
    return async dispatch => {
        try {
            const response = await fetchWithToken( `events/${ event.id }`, event, 'PUT' );
            const body = await response.json();
            if ( body.ok ) {
                dispatch( eventUpdated( event ) );
            } else {
                Swal.fire('Error', body.msg, 'error' );
            }
        } catch (error) {
            console.error(error);
        }
    }
};

const eventUpdated = event => ({
    type: types.eventUpdated,
    payload: event
});

export const eventStartLoading = () => {
    return async dispatch => {
        
        try {
            const response = await fetchWithToken( 'events' );
            const body = await response.json();

            const events = prepareEvents( body.events );
            dispatch( eventLoaded( events ) ); // Could broke the app the incoming date format
        } catch (error) {
            console.error(error);
        }
    };
};

const eventLoaded = events => ({
    type: types.eventLoaded,
    payload: events
});