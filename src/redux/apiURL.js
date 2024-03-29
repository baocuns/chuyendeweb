import axios from 'axios'
import {
	loginFailed,
	loginStart,
	loginSuccess,
	logoutFailed,
	logoutStart,
	logoutSuccess,
} from './authSlice'
import AxiosJWT from '../axios'
import { API_HOST } from '../init'

const login = (user, dispatch, navigate) => {
	dispatch(loginStart())

	axios
		.post(`${API_HOST}/api/v1/auth/login`, user, {
			withCredentials: true,
		})
		.then((res) => {
            const Axios = AxiosJWT(res.data.data, dispatch, loginSuccess)
			Axios.post(`https://api.travels.games/api/v1/profile/show/details/${res.data.data.username}`).then(
				(res) => {
					// console.log(res.data.data);
					localStorage.setItem('profile', JSON.stringify(res.data.data[0]))
				}
			)
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

	Axios.post(`${API_HOST}/api/v1/auth/logout`, user?._id, {
		headers: {
			token: `Travel ${user?.accessToken}`,
		},
	})
		.then((res) => {
			dispatch(logoutSuccess())
			navigate('/')
		})
		.catch((err) => {
			dispatch(logoutFailed())
		})
}

export { login, logout }
