import { SIGNING_UP_USER, LOGGING_IN_USER, LOGGED_IN_USER, LOGOUT_USER, FETCHING_AUTH_USER, FETCHED_AUTH_USER, FETCHING_EMPLOYEE_DETAILS, FETCHED_EMPLOYEE_DETAILS, UPDATED_USER } from './actionTypes';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL

const signingUpUser = (isSigningUpUser) => {
    return {
        type: SIGNING_UP_USER,
        isSigningUpUser
    }
}

export const loggedInUser = (user) => {
    return {
        type: LOGGED_IN_USER,
        user
    }
}

export const updateUser = (user) => {
    return {
        type: UPDATED_USER,
        user
    }
}

export const handleSignUpUserAction = (user, callback) => {
    return async dispatch => {
        dispatch(signingUpUser(true));
        try {
            const { data } = await axios.post(BASE_URL + '/auth/signup', user);
            console.log(data);
            localStorage.setItem('token', JSON.stringify(data.user));
            dispatch(loggedInUser(data.user))
            if (typeof callback === 'function') callback();
        } catch (error) {
            alert("User already exist!")
            console.log('error', error);
            window.location.reload()
        }
        dispatch(signingUpUser(false));
    }
}

export const handleLoginUserAction = (user, callback) => {
    return async dispatch => {
        try {
            const { data } = await axios.post(BASE_URL + '/auth/login', user);
            console.log(data);
            localStorage.setItem('token', JSON.stringify(data.user));
            dispatch(loggedInUser(data.user))
            if (typeof callback === 'function') callback();
        } catch (error) {
            alert("User not found!")
            console.log('error', error);
            window.location.reload()
        }
    }
}

export const handleUserUpdateAction = (user) => {
    return async dispatch => {
        try {
            // const { data } = await axios.post(BASE_URL + '/user/update', user);
            // console.log(data);
            localStorage.setItem('token', JSON.stringify(user));
            dispatch(updateUser(user))
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const handleLogoutAction = () => {
    localStorage.removeItem('token');
    window.location.reload();
}