import * as actionsTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionsTypes.AUTH_START
    };
};

export const authSuccess = (idToken, userID) => {
    return {
        type: actionsTypes.AUTH_SUCCESS,
        idToken: idToken,
        userID: userID
    };
};

export const authFail = (error) => {
    return {
        type: actionsTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionsTypes.AUTH_LOGOUT
    }
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    }
};

export const auth = (email, password, isSignup) =>{
    return dispatch => {
        dispatch(authStart());
        const authData ={
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBq3Vcgb3LVpkOEZeXOPKYXeXyoIT5eJPY';
        if (!isSignup){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBq3Vcgb3LVpkOEZeXOPKYXeXyoIT5eJPY';
        }
        axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));

            })
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionsTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token){
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()){
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime() / 1000)));
            }
            dispatch(authSuccess())
        }
    };
};