import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-app-react-2cdb1-default-rtdb.firebaseio.com/'
});

export default instance;