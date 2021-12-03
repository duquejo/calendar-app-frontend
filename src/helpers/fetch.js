
const baseUrl = process.env.REACT_APP_API_URL;

const fetchWithoutToken = ( endPoint, data, method = 'GET' ) => {
    const url = `${ baseUrl }/${ endPoint }`; // localhost:3001/api/
    if( method === 'GET' ){
        return fetch( url );
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( data )
        });
    }
};

const fetchWithToken = ( endPoint, data, method = 'GET' ) => {
    const url = `${ baseUrl }/${ endPoint }`; // localhost:3001/api/
    const token = localStorage.getItem( 'token' ) || '';

    if( method === 'GET' ){
        return fetch( url, {
            method,
            headers: {
                'x-token': token
            }
        } );
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify( data )
        });
    }
};

export {
    fetchWithoutToken,
    fetchWithToken
};