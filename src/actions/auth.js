import { types } from "../types/types";
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch";
import Swal from 'sweetalert2';

export const startLogin = ( email, password ) => {
    return async dispatch => {
        const response = await fetchWithoutToken( 'auth', { email, password }, 'POST' );
        const body = await response.json();

        if( body.ok ) {
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch( login({
                uid: body.uid,
                name: body.name
            }) );
        } else {
            Swal.fire('Error', body.msg, 'error' );
        }
    };
};

export const startRegister = ( email, password, name ) => {
    return async dispatch => {
        const response = await fetchWithoutToken( 'auth/new', { name, email, password }, 'POST' );
        const body = await response.json();

        if( body.ok ){
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime() );            

            dispatch( login({
                uid: body.uid,
                name
            }) );
        } else {
            Swal.fire('Error', body.msg, 'error' );
        }
    };
};

export const startChecking = () => {
    return async dispatch => {
        const response = await fetchWithToken( 'auth/renew' );
        const body = await response.json();

        if( body.ok ){
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime() );            

            dispatch( login({
                uid: body.uid,
                name: body.name
            }) );
        } else {
            dispatch( checkingFinish() );
        }
    };
};

export const checkingFinish = () => ({ type: types.authCheckingFinish });

export const login = user => ({
    type: types.authLogin,
    payload: user
});

/**
 * 
 * @see Must be async because these response will affect the auth uid changes,
 * so the useEffect will rerender the AppRouter again (Redirect to login) 
 */
export const startLogout = () => {
    return dispatch => {
        localStorage.clear();
        dispatch( startEventClean() );
        dispatch( logout() );
    };
};

export const logout = () => ({ type: types.authLogout });
export const startEventClean = () => ({ type: types.eventClear });