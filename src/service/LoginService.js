import axios from "axios";
import {BASE_URL,HEADERS } from "../service/UrlUtils";


export function validateLogin(email, pwd) {
    const URI = "/api/v1/auth/authenticate";
    const data = {
        "email": email,
        "password": pwd
    }
    return axios.post(BASE_URL + URI, data, HEADERS());
}

export const signin = (data) => {
    return axios.post(BASE_URL + '/api/v1/auth/authenticate', data);
}

export const signup = (data) => {
    return axios.post(BASE_URL + '/api/v1/auth/register', data, HEADERS());
}



export const signout = () => {
    // localStorage.removeItem('user');
    sessionStorage.removeItem('user');
}

export const signoutFromServer = () => {
    const URI = '/api/v1/auth/logout';
    return axios.post(BASE_URL + URI,{},HEADERS());
}

export const saveDataToBrowser = (data) => {
    // localStorage.setItem('user', JSON.stringify(data));
    sessionStorage.setItem('user', JSON.stringify(data));
}

export const getUser = () => {
    // return JSON.parse(localStorage.getItem('user'));
    return JSON.parse(sessionStorage.getItem('user'));
}


export const getSkillFromBackend = () => {
    const URI = '/skill';
    return axios.get(BASE_URL + URI,HEADERS());
}


export const getReportFromBackend = () => {
    return axios.get("http://localhost:8080/api/categories/report",HEADERS());
}


export const getAllUsersFromBackend = () => {
    return axios.get("http://localhost:8080/api/categories/alluser",HEADERS());
}

export const deletecontentFromBackend = (contentId) => {
    return axios.delete(`http://localhost:8080/api/categories/deletecontent/${contentId}`,HEADERS());
}
