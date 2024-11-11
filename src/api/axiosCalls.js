import axios from 'axios';

const axiosInstance = axios.create();

export const getRequest = (endpoint) => {
    return axiosInstance.get(endpoint)
        .then((response) => response)
        .catch((error) => { console.error(`Fail Get Request Error Is: ${error}`); throw error;}
    );
}

export const postRequest = (endpoint, data) => {
    return axiosInstance.post(endpoint, data)
        .then((response) => response)
        .catch((error) => { console.error(`Fail Get Request Error Is: ${error}`); throw error;}
    );
}

export default axiosInstance;