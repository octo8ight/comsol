import axios from 'axios';
import { API_URL } from 'utils/constant';

export const addModuleRequest = (data, setList) => {
    axios.post(`${API_URL}/create/list`, data)
        .then(res => {
            getModuleList(setList);
        })
        .catch(error => console.log(error));
}

export const getModuleList = (setList) => {
    axios.get(`${API_URL}/get/list`)
        .then(res => {
            setList(res.data);
        })
        .catch(err => console.log(err));
}

export const getModuleDetail = (id, token, setData) => {
    axios.post(`${API_URL}/get/item`, {id, token})
        .then(res => {
            setData(res.data);
        })
        .catch(err => console.log(err));
}

export const sendModuleOffer = data => {
    axios.post(`${API_URL}/create/offer`, data)
        .then(res => {
            return res.data;
        })
        .catch(err => console.log(err));
}

export const acceptOfferStatus = (data, token, setDetail) => {
    axios.post(`${API_URL}/offer/accept`, data)
        .then(res => {
            console.log(res.data);
            getModuleDetail(data.id, token, setDetail);
        })
        .catch(err => console.log(err));
}

export const rejectOfferStatus = (data, token, setDetail) => {
    axios.post(`${API_URL}/offer/reject`, data)
        .then(res => {
            getModuleDetail(data.id, token, setDetail);
        })
        .catch(err => console.log(err));
}