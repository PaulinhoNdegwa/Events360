import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'
import { Platform } from 'react-native'

// 10.10.161.255
const baseUrl = Platform.OS === "ios" ? "http://127.0.0.1:8000/" : "http://10.0.2.2:8000/"

const getToken = async () => {
    return AsyncStorage.getItem('userToken');
}

class Api {
    methods = ['get', 'post', 'put', 'delete']
    constructor() {
        this.axios = (token) => axios.create({
            baseURL: baseUrl,
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json",
                'Authorization': `Bearer ${token || ''}`
            }
        });

        this.methods.forEach(method => {
            Api.prototype[method] = async (url, data = {}) => {
                const token = await getToken();
                return this.axios(token)[method](url, data);
            }
        })
    }



}
export const axiosWithToken = new Api();
