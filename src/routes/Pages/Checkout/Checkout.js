import AxiosJWT from '../../../axios';
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../../../redux/authSlice';
import Components from '../../../components';
import { useEffect } from 'react';
import { callApiClear, callApiFailed, callApiStart, callApiSuccess } from '../../../redux/apiSlice';
import { redirect, useNavigate, useParams } from 'react-router-dom';
import { API_HOST } from '../../../init';

const Checkout = () => {
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

    // checkout
    const [data, setData] = useState({});
    const { oid } = useParams()
    const [order, setOrder] = useState()
    useEffect(() => {
        dispatch(callApiStart())
        const Axios = AxiosJWT(user, dispatch, loginSuccess)
        Axios.post(`${API_HOST}/api/v1/order/show/one/${oid}`)
            .then(res => {
                dispatch(callApiSuccess())
                setOrder(res.data.data[0])
            })
            .catch(err => {
                console.log(err);
                const { data } = err?.response
                dispatch(callApiFailed(data))
            })
    }, [])

    const handleChangeData = (target) => {
        const { name, value } = target
        setData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handlePayment = () => {
        dispatch(callApiStart())
        const Axios = AxiosJWT(user, dispatch, loginSuccess)
        Axios.post(`${API_HOST}/api/v1/order/checkout/${oid}`, data)
            .then(res => {
                console.log(res.data);
                const { data, ...rest } = res.data
                dispatch(callApiSuccess(rest))
                window.open(data, '_blank', 'noopener,noreferrer');
            })
            .catch(err => {
                console.log(err);
                const { data } = err?.response
                dispatch(callApiFailed(data))
            })
    }

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
            {isLoader && (
                <Components.Loader />
            )}

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
                <div className="flex w-full flex-col justify-start items-start">
                    <div className="">
                        <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Check out</p>
                    </div>
                    <div className="mt-2">
                        <a
                            href="/"
                            className="
								text-base
								leading-4
								focus:outline-none focus:underline
								hover:underline hover:text-gray-800
								text-gray-600
							"
                        >
                            Back to my bag
                        </a>
                    </div>
                    <form>
                        <div className="mt-8">
                            {/* momo */}
                            <div className="">
                                <label htmlFor="check-momo" className="flex justify-center items-center hover:bg-gray-300 p-2 bg-gray-100 rounded cursor-pointer">
                                    <input
                                        id="check-momo"
                                        type="checkbox"
                                        checked={data?.type === 'momo'}
                                        value={'momo'}
                                        name='type'
                                        class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mx-2"
                                        onChange={(e) => handleChangeData(e.target)}
                                        required
                                    />
                                    <img src="https://business.momo.vn/assets/landingpage/img/931b119cf710fb54746d5be0e258ac89-logo-momo.png"
                                        className="object-cover h-16"
                                    />
                                    <p className="p-2">Payment by MOMO</p>
                                </label>

                            </div>
                            {/* vnpay */}
                            <div className="my-2">
                                <label htmlFor="check-vnpay" className="flex justify-center items-center hover:bg-gray-300 p-2 bg-gray-100 rounded cursor-pointer">
                                    <input
                                        id="check-vnpay"
                                        type="checkbox"
                                        checked={data?.type === 'vnpay'}
                                        value={'vnpay'}
                                        name='type'
                                        class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mx-2"
                                        onChange={(e) => handleChangeData(e.target)}
                                        required
                                    />
                                    <img src="https://www.plusweb.vn/uploads/public/2017/04/27/1493267750016_apps-icon-vnpay.png"
                                        className="object-cover h-16"
                                    />
                                    <p className="p-2">Payment by VNPAY</p>
                                </label>

                            </div>
                        </div>
                        <div className="mt-12">
                            <button
                                type={`${data?.type ? 'button' : 'submit'}`}
                                className="py-2 px-8 bg-red-500 hover:bg-red-600 rounded text-white"
                                onClick={data?.type ? handlePayment : null}
                            >
                                Payment
                            </button>
                        </div>
                    </form>

                </div>

                <div className='w-full'>
                    <div className="m-4">
                        <p className="text-black font-bold">Create order <u className="text-blue-500">{oid}</u> success!</p>
                    </div>
                    {order && (
                        <div className="flex flex-col justify-start items-start border rounded w-full p-2 md:p-4">
                            <div className="w-full">
                                <div className="flex justify-between w-full items-center mt-4">
                                    <p className="text-xl font-bold leading-4 text-gray-800">Thông tin người dùng</p>
                                </div>
                                <div className="flex my-8 flex-col items-end w-full space-y-2">
                                    <div className="flex justify-between w-full items-center">
                                        <p className="text-lg leading-4 text-black">Họ & Tên:</p>
                                        <p className="text-lg font-thin leading-4 text-black">Nguyễn Văn Bảo</p>
                                    </div>
                                    <div className="flex justify-between w-full items-center">
                                        <p className="text-lg leading-4 text-black">Email:</p>
                                        <p className="text-lg font-thin leading-4 text-black">baonguyen2001aa@gmail.com</p>
                                    </div>
                                    <div className="flex justify-between w-full items-center">
                                        <p className="text-lg leading-4 text-black">Số điện thoại:</p>
                                        <p className="text-lg font-thin leading-4 text-black">0326447480</p>
                                    </div>
                                    <div className="flex justify-between w-full items-center">
                                        <p className="text-lg leading-4 text-black">Địa chỉ:</p>
                                        <p className="text-lg font-thin leading-4 text-black">53 Võ Văn Ngân, TP. Thủ Đức, TP. Hồ Chí Minh</p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full">
                                <div>
                                    <h1 className="text-2xl font-bold leading-6 text-gray-800">Thông tin đơn hàng</h1>
                                </div>
                                <div className="flex my-8 flex-col items-end w-full space-y-2">
                                    <div className="flex justify-between w-full items-center">
                                        <p className="text-lg leading-4 text-black">Mô tả:</p>
                                        <p className="text-lg font-thin leading-4 text-black">{order.info}</p>
                                    </div>
                                    <div className="flex justify-between w-full items-center">
                                        <p className="text-lg leading-4 text-black">Trạng thái:</p>
                                        <p
                                            className={`text-lg leading-4 font-bold ${order.statusCode === '00' ? 'text-green-500' : 'text-red-500'}`}
                                        >
                                            {order.status}
                                        </p>
                                    </div>
                                    <div className="flex justify-between w-full items-center">
                                        <p className="text-lg leading-4 text-black">Tổng số sản phẩm:</p>
                                        <p className="text-lg font-thin leading-4 text-black">{order.items.length}</p>
                                    </div>
                                    <div className="flex justify-between w-full items-center">
                                        <p className="text-lg leading-4 text-black">Tổng số tiền:</p>
                                        <p className="text-lg font-thin leading-4 text-black">{order.amount.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Checkout;
