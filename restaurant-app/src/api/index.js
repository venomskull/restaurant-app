import axios from 'axios';

const BASE_URL = 'http://localhost:36360/api/';
export const ENDPOINTS = {
    CUSTOMER: 'Customer',
    FOODITEM: 'FoodItem',
    ORDER: 'Order'
}

export const createAPIEndPoint = (endpoint) => {
    const url = BASE_URL + endpoint + '/';
    
    return {

        fetchAll: () => axios.get(url),
        fetchById: (id) => axios.get(url + id),
        create: (newRecord) => axios.post(url, newRecord),
        update: (id, updateRecord) => axios.put(url + id, updateRecord),
        delete: (id) => axios.delete(url + id)
    }
}

