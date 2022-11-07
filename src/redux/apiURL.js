import axios from "axios";
import { loginFailed, loginStart, loginSuccess, logoutFailed, logoutStart, logoutSuccess } from "./authSlice";
import AxiosJWT from '../axios'

const login = (user, dispatch, navigate) => {
    dispatch(loginStart())

    axios.post('http://localhost/api/v1/auth/login', user, {
        withCredentials: true,
    })
        .then(res => {
            dispatch(loginSuccess(res.data.data))
            navigate('/')
        })
        .catch(() => {
            dispatch(loginFailed())
        })
}

const logout = (user, dispatch, navigate) => {
    const Axios = AxiosJWT(user, dispatch, logoutSuccess)
    dispatch(logoutStart())

    Axios.post('http://localhost/api/v1/auth/logout', user?._id, {
        headers: {
            token: `Travel ${user?.accessToken}`
        }
    })
        .then(res => {
            dispatch(logoutSuccess())
            navigate('/')
        })
        .catch(err => {
            dispatch(logoutFailed())
        })
}

export { login, logout }