import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
  } from "react-router-dom";
import { startChecking } from "../actions/auth";
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking, uid } = useSelector(state => state.auth );

    useEffect(() => {
        dispatch( startChecking() );
    }, [ dispatch ]);

    if( checking ) {
        return <h5>Wait a second...</h5>;
    }

    return (
    <Router>
        <Routes>
            <Route path="/login" element={ 
                <PublicRoute isLoggedIn={ !! uid }>
                    <LoginScreen /> 
                </PublicRoute>
            }></Route>
            <Route path="/" element={ 
                <PrivateRoute isLoggedIn={ !! uid }>
                    <CalendarScreen />
                </PrivateRoute>
            }></Route>
            <Route path="*" element={ <Navigate replace to="/"/> }></Route>
        </Routes>
    </Router>
    )
};