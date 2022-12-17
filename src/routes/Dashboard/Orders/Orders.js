import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AxiosJWT from '../../../axios'
import { callApiStart } from '../../../redux/apiSlice'
import { loginSuccess } from '../../../redux/authSlice'
import { PaperClipIcon } from '@heroicons/react/20/solid'
import './_.css'

const Orders = () => {
    // redux
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.login.currentUser)

    const [orders, setOrders] = useState()

    const handleCallAPIOrder = () => {
        const Axios = AxiosJWT(user, dispatch, loginSuccess)
        dispatch(callApiStart())
        Axios.post('https://api.travels.games/api/v1/order/show/all/super')
            .then(res => {
                // console.log(res.data);
                setOrders(res.data.data)
            })
            .catch(err => {
                console.log(err.reponse.data);
            })
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
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Applicant Information</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
            </div>
            <div className="border-t border-gray-200">
                <dl className='grid gap-4 grid-cols-1'>
                    {orders && orders.map((order, index) => (
                        <div key={index} className="bg-gray-50 hover:bg-gray-100 cursor-pointer px-4 py-5 m-2 rounded-lg">
                            <div
                                onClick={() => handleDropdown(order._id)}
                            >
                                <dt className="text-sm font-medium text-green-500">{order._id}</dt>
                                <dd className="mt-1 text-sm text-gray-500 font-medium sm:col-span-2 sm:mt-0">{order.username}</dd>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{order.info}</dd>
                                <dd className={`mt-1 text-sm sm:col-span-2 font-medium sm:mt-0 ${order.statusCode === '00' ? 'text-green-600' : 'text-red-600'}`}>{order.status}</dd>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{order.amount}</dd>
                            </div>

                            {/* drop */}
                            {(!!dropdownId && dropdownId === order._id) && (
                                <div className='bg-white mt-2 dropdown-order '>
                                </div>
                            )}
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    )
}

export default Orders