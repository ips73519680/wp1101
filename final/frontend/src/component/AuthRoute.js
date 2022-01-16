import { Route, Navigate, useLocation } from 'react-router-dom'
import { message } from 'antd';
// import isAuth from '../utiluty/isAuth';


export default function AuthRoute({ children }) {
    let location = useLocation();

    return localStorage.getItem('token') ? children : <Navigate to="/SignInPage" state={{ from: location }} />;
}



