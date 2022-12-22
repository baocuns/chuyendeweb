import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AxiosJWT from '../../../axios'
import { callApiFailed, callApiStart, callApiSuccess } from '../../../redux/apiSlice'
import { loginSuccess } from '../../../redux/authSlice'
import { PaperClipIcon } from '@heroicons/react/20/solid'
import * as Ci from 'react-icons/ci'
import dayjs from 'dayjs'
import Components from '../../../components'
import relativeTime from 'dayjs/plugin/relativeTime'

import { Link } from 'react-router-dom'
dayjs.extend(relativeTime)

const Orders = () => {
	// redux
	const dispatch = useDispatch()
	const user = useSelector((state) => state.auth.login.currentUser)
	const api = useSelector((state) => state.api.api)
	const [isAlert, setIsAlert] = useState(api.isFetching)
	useEffect(() => {
		setIsAlert(api.isFetching)
	}, [api.isFetching])

	// app
	const [typeBox, setTypeBox] = useState(localStorage.getItem('typeBox'))
	const [orders, setOrders] = useState()

	const handleCallAPIOrder = () => {
		const Axios = AxiosJWT(user, dispatch, loginSuccess)
		dispatch(callApiStart())
		Axios.post('https://api.travels.games/api/v1/order/show/all/super')
			.then((res) => {
				// console.log(res.data.data);
				setOrders(res.data.data)
				dispatch(callApiSuccess())
			})
			.catch((err) => {
				console.log(err.reponse.data)
				dispatch(callApiFailed())
			})
	}

	const handleChangetypeBox = (value) => {
		setTypeBox(value)
		localStorage.setItem('typeBox', value)
	}

	useEffect(() => {
		handleCallAPIOrder()
	}, [])

	// --------------------------------dropdown
	const [dropdownId, setDropdownId] = useState()
	const handleDropdown = (id) => {
		dropdownId === id && setDropdownId(null)
		dropdownId !== id && setDropdownId(id)
	}
	return (
		<div className="overflow-hidden bg-white shadow sm:rounded-lg m-4">
			{isAlert && <Components.Loader />}
			<div className="px-4 py-5 sm:px-6 flex">
				<div className="w-4/5">
					<h3 className="text-lg font-medium leading-6 text-gray-900">Orders</h3>
					<p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
				</div>
				<div className="w-1/5 flex justify-end">
					<div className="inline-flex rounded-md shadow-sm mr-2" role="group">
						<button
							type="button"
							className={`py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-green-400 focus:z-10 ${
								typeBox === 'list' ? 'bg-green-400 text-white' : ''
							}`}
							onClick={() => handleChangetypeBox('list')}
						>
							<Ci.CiBoxList size={24} />
						</button>
						<button
							type="button"
							className={`py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-r-md border border-gray-200 hover:bg-gray-100 hover:text-green-400 focus:z-10 ${
								typeBox === 'grid' ? 'bg-green-400 text-white' : ''
							}`}
							onClick={() => handleChangetypeBox('grid')}
						>
							<Ci.CiGrid41 size={24} />
						</button>
					</div>
				</div>
			</div>
			<div className="border-t border-gray-200 p-4">
				<dl className={`grid gap-4 ${typeBox === 'list' ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-3'}`}>
					{orders &&
						orders.map((order, index) => (
							<Link to={`/dashboard/orders/details/${order._id}`} key={index} className="">
								<div
									className={`bg-white text-primary-content peer-checked:bg-gray-50 peer-checked:text-secondary-content drop-shadow-md m-2 w-auto rounded p-3 cursor-pointer hover:bg-gray-100 ease-in-out duration-300 ${
										typeBox === 'list' ? 'hover:scale-105' : 'hover:scale-105'
									}`}
								>
									<div className="flex my-1">
										<div className="text-black">Date:</div>
										<div className="text-black mx-2 font-thin">
											{dayjs(order.createdAt).fromNow()}
										</div>
									</div>
									<div className="flex my-1">
										<div className="text-black font-bold">Order ID: </div>
										<div className="text-green-500 mx-2 underline ">{order._id}</div>
									</div>
									<div className={`flex ${typeBox === 'list' ? 'flex-row' : 'flex-col'}`}>
										<div className={`${typeBox === 'list' ? 'w-1/4 mr-8' : 'w-full flex'}`}>
											<div className="text-gray-600 font-bold mr-2">User</div>
											<div className="text-black font-light">{order.username}</div>
										</div>
										<div className={`${typeBox === 'list' ? 'w-1/4 mr-8' : 'w-full flex'}`}>
											<div className="text-gray-600 font-bold mr-2">Description</div>
											<div className="text-black font-light line-clamp-1">{order.info}</div>
										</div>
										<div className={`${typeBox === 'list' ? 'w-1/4 mr-8' : 'w-full flex'}`}>
											<div className="text-gray-600 font-bold mr-2">Status</div>
											<div
												className={`text-black font-light line-clamp-1 ${
													order.statusCode === '00' ? 'text-green-600' : 'text-red-600'
												}`}
											>
												{order.status}
											</div>
										</div>
										<div className={`${typeBox === 'list' ? 'w-1/4 mr-8' : 'w-full flex'}`}>
											<div className="text-gray-600 font-bold mr-2">Amount</div>
											<div className="text-black font-light">
												{order.amount.toLocaleString('it-IT', {
													style: 'currency',
													currency: 'VND',
												})}
											</div>
										</div>
									</div>
								</div>
							</Link>
						))}
				</dl>
			</div>
		</div>
	)
}

export default Orders
