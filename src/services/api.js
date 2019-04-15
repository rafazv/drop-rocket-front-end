import axios from 'axios';

const api = axios.create({
    baseURL: "https://drop-rocket-backend.herokuapp.com/"
});

export default api;