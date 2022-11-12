import axios from "axios";
import jwt_decode from 'jwt-decode'
import { API_HOST } from "./init";

const AxiosJWT = (user, dispatch, stateSuccess) => {
    const axiosJWT = axios.create()
    const date = new Date()
    const id = user?._id

    axiosJWT.interceptors.request.use(async (config) => {
        const jwtDecodeToken = jwt_decode(user?.accessToken)
        if (jwtDecodeToken.exp < date.getTime() / 1000) {
            const res = await axios.post(`${API_HOST}/api/v1/auth/refresh`, id, {
                withCredentials: true,
            })
            const refreshUser = {
                ...user,
                accessToken: res.data.data.accessToken
            }
            dispatch(stateSuccess(refreshUser))
            config.headers['token'] = `Travel ${res.data.data.accessToken}`
            config.headers['user_id'] = user?._id
            config.withCredentials = true
        } else {
            config.headers['token'] = `Travel ${user?.accessToken}`
            config.headers['user_id'] = user?._id
            config.withCredentials = true
        }
        return config
    }, (err) => {
        return Promise.reject(err)
    })

    return axiosJWT
}

export default AxiosJWT