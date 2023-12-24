// File: axiosConfig.js

//import axios from 'axios';
//
//// Add this configuration globally in your app
//axios.defaults.withCredentials = true;
//
//export default axios;
// axiosConfig.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    withCredentials: true,
});

export default instance;
