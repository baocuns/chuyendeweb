import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import * as Hi from 'react-icons/hi'
import { loginSuccess } from '../../../redux/authSlice'
import { API_HOST } from '../../../init'
import Components from '../../../components'
import AxiosJWT from '../../../axios'
import { callApiClear, callApiFailed, callApiStart, callApiSuccess } from '../../../redux/apiSlice'

const Order = () => {
	// redux
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const user = useSelector((state) => state.auth.login.currentUser)
	const api = useSelector((state) => state.api.api)
	const [isLoader, setIsLoader] = useState(api?.isFetching)
	// loader
	useEffect(() => {
		setIsLoader(api?.isFetching)
		!api?.isFetching && dispatch(callApiClear())
	}, [api])

	//
	const { oid } = useParams()
	const [order, setOrder] = useState()

	useEffect(() => {
		dispatch(callApiStart())
		const Axios = AxiosJWT(user, dispatch, loginSuccess)
		Axios.post(`${API_HOST}/api/v1/order/show/one/${oid}`)
			.then((res) => {
				dispatch(callApiSuccess())
				setOrder(res.data.data[0])
			})
			.catch((err) => {
				console.log(err)
				const { data } = err?.response
				dispatch(callApiFailed(data))
			})
	}, [])

	return (
		<div
			className="
				flex
				justify-center
				items-center
				2xl:container 2xl:mx-auto
				lg:py-16
				md:py-12
				py-9
				px-4
				md:px-6
				lg:px-20
				xl:px-44
			"
		>
			{isLoader && <Components.Loader />}
			<div
				className="
					flex
					w-full
					sm:w-9/12
					lg:w-full
					flex-col
					lg:flex-row
					justify-center
					items-center
					lg:space-x-10
					2xl:space-x-36
					space-y-12
					lg:space-y-0
				"
			>
				<div className="flex flex-col w-full">
					{order && (
						<div>
							<div className="flex flex-col justify-start items-start border w-full p-4 md:p-8 rounded shadow-md">
								<div className="w-full">
									<div className="flex justify-start w-full items-center mt-4">
										<p className="text-xl font-bold mr-2 leading-4 text-gray-800">
											Thông tin người dùng
										</p>
									</div>
									<div className="flex my-8 flex-row items-end w-full">
										<div className="h-16 md:h-24 w-16 md:w-24 flex-shrink-0 overflow-hidden rounded-md mr-4">
											<img
												src={`${API_HOST}/api/v1/views/show/photos/${order.user[0].images[0]}`}
												className="h-full w-full object-cover object-center"
											/>
										</div>
										<div className="flex flex-col w-full space-y-2">
											<div className="flex justify-start w-full items-center">
												<p className="text-lg leading-4 mr-2 text-black">Họ & Tên:</p>
												<p className="text-lg font-thin leading-4 text-black">
													{order.user[0].fullname}
												</p>
											</div>
											<div className="flex justify-start w-full items-center">
												<p className="text-lg leading-4 mr-2 text-black">Email:</p>
												<p className="text-lg font-thin leading-4 text-black">
													{order.user[0].email}
												</p>
											</div>
											<div className="flex justify-start w-full items-center">
												<p className="text-lg leading-4 mr-2 text-black">Số điện thoại:</p>
												<p className="text-lg font-thin leading-4 text-black">
													{order.user[0].phone}
												</p>
											</div>
											<div className="flex justify-start w-full items-center">
												<p className="text-lg leading-4 mr-2 text-black">Địa chỉ:</p>
												<p className="text-lg font-thin leading-4 text-black">
													{order.user[0].address}
												</p>
											</div>
										</div>
									</div>
								</div>
								<div className="w-full">
									<div>
										<h1 className="text-2xl font-bold leading-6 text-gray-800">
											Thông tin đơn hàng
										</h1>
									</div>
									<div className="flex my-8 flex-col items-end w-full space-y-2">
										<div className="flex justify-start w-full items-center">
											<p className="text-lg leading-4 mr-2 text-black">Mô tả:</p>
											<p className="text-lg font-thin leading-4 text-black">{order.info}</p>
										</div>
										<div className="flex justify-start w-full items-center">
											<p className="text-lg leading-4 mr-2 text-black">Trạng thái:</p>
											<p
												className={`text-lg leading-4 font-bold ${
													order.statusCode === '00' ? 'text-green-500' : 'text-red-500'
												}`}
											>
												{order.status}
											</p>
										</div>
										<div className="flex justify-start w-full items-center">
											<p className="text-lg leading-4 mr-2 text-black">Tổng số sản phẩm:</p>
											<p className="text-lg font-thin leading-4 text-black">{order.items.length}</p>
										</div>
										<div className="flex justify-start w-full items-center">
											<p className="text-lg leading-4 mr-2 text-black">Tổng số tiền:</p>
											<p className="text-lg font-thin leading-4 text-black">
												{order.amount.toLocaleString('it-IT', {
													style: 'currency',
													currency: 'VND',
												})}
											</p>
										</div>
									</div>
								</div>
								{order.statusCode !== '00' && (
									<div className="w-full flex justify-end">
										<Link
											to={`/checkout/${order._id}`}
											className="p-2 bg-green-500 hover:bg-green-600 text-white rounded"
										>
											To Payment
										</Link>
									</div>
								)}
							</div>
							{/* list */}
							<div className="mt-4">
								<ul role="list" className="-my-6 divide-y divide-gray-200">
									{order &&
										order.tours.map((tour, index) => (
											<li key={index} className="flex py-6">
												<div className="h-16 md:h-24 w-16 md:w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
													<img
														src={`${API_HOST}/api/v1/views/show/photos/` + tour.images[0]}
														alt={tour.title}
														className="h-full w-full object-cover object-center"
													/>
												</div>

												<div className="ml-4 flex flex-1 flex-col">
													<div>
														<div className="flex justify-start text-base font-medium text-gray-900">
															<h3>
																<a href={'#'} className="text-sm md:text-base">
																	{tour.title}
																</a>
																<p className="mt-1 text-xs md:text-sm text-gray-500 flex items-center font-normal">
																	{tour.description.substr(0, 200)}...
																</p>
															</h3>
															<div>
																<p className="ml-4 text-sm md:text-base">
																	<strike>
																		{tour.price.toLocaleString('it-IT', {
																			style: 'currency',
																			currency: 'VND',
																		})}
																	</strike>
																</p>
																{tour.price !== tour.sale && (
																	<p className="ml-4 text-sm md:text-base">
																		{tour.sale.toLocaleString('it-IT', {
																			style: 'currency',
																			currency: 'VND',
																		})}
																	</p>
																)}
															</div>
														</div>
														<p className="mt-1 text-xs md:text-sm text-gray-500 flex items-center">
															{tour.address_start} <Hi.HiArrowRight className="mx-1 text-red-500" />{' '}
															{tour.address_end}
														</p>
													</div>
												</div>
											</li>
										))}
								</ul>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default Order
