import axios from 'axios';

const instance = axios.create ({
    baseURL: 'https://react-my-burger-9ddcd.firebaseio.com/'
});

export default instance;