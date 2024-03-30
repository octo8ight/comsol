import axios from 'axios';
import { API_URL } from 'utils/constant';
import {setAuthState} from '../lib/authSlice';

export const signAction = (data) => dispatch => {
    axios.post(`${API_URL}/user/sign`, data)
        .then(res => {
            dispatch(setAuthState({
                auth: true,
                isAdmin: String(data.address) === String("4kYZcFZu18uXicMwmqBQ7cxs6SRv3qWQKeYWjVktuuEj") ? true : false,
                token: res.data
            }));
        })
        .catch(err => console.log(err));
}