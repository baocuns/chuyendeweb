import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { callApiClear, callApiFailed, callApiStart, callApiSuccess } from '../../../redux/apiSlice'
import AxiosJWT from '../../../axios'
import { loginSuccess } from '../../../redux/authSlice'
import Components from '../../../components'
import { API_HOST } from '../../../init'
import * as Hi from "react-icons/hi";


export default function Cart({Open, handleOpen}) {
    // redux
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.auth.login.currentUser)
    const api = useSelector((state) => state.api.api)
    const [isLoader, setIsLoader] = useState(api?.isFetching)

    const [open, setOpen] = useState(true)
    const handleClose = () => {
        setOpen(false)
        handleOpen()
    }
    useEffect(() => {
        setOpen(Open)
    }, [Open])

    const [carts, setCarts] = useState()
    const [total, setTotal] = useState(0)
    const [items, setItems] = useState([])

    const handleChangeItems = (target) => {
        const { value } = target
        var it = items
        if (it.some(e => e === value)) {
            it = it.filter(e => e !== value)
        } else {
            it.push(value)
        }
        // total
        var _total = 0
        carts && carts.tours.map(tour => {
            if (it.some(e => e === tour.slug)) {
                _total += tour.sale
            }
        })

        setItems(it)
        setTotal(_total)
    }

    const handleCreateOrder = () => {
        const data = {
            items: items
        }
        dispatch(callApiStart())
        const Axios = AxiosJWT(user, dispatch, loginSuccess)
        Axios.post(`${API_HOST}/api/v1/order/create`, data)
            .then(res => {
                dispatch(callApiSuccess())
                handleClose()
                navigate(`/checkout/${res.data.data._id}`)
            })
            .catch(err => {
                console.log(err);
                const { data } = err?.response
                dispatch(callApiFailed(data))
            })
    }

    useEffect(() => {
        if (user) {
            dispatch(callApiStart())
            const Axios = AxiosJWT(user, dispatch, loginSuccess)
            Axios.post(`${API_HOST}/api/v1/cart/show`)
                .then(res => {
                    dispatch(callApiSuccess())
                    setCarts(res.data.data[0])
                    var _total = 0
                    res.data.data[0].tours.map(e => {
                        _total += e.price
                    })
                    setTotal(_total)
                })
                .catch(err => {
                    console.log(err);
                    const { data } = err?.response
                    dispatch(callApiFailed(data))
                })
        }
    }, [user])

    // loader
    useEffect(() => {
        setIsLoader(api?.isFetching)
        !api?.isFetching && dispatch(callApiClear())
    }, [api])

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={handleClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    {isLoader && (
                        <Components.Loader />
                    )}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-lg">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                                                        onClick={handleClose}
                                                    >
                                                        <span className="sr-only">Close panel</span>
                                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mt-8">
                                                <div className="flow-root">
                                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                        {carts && carts.tours.map((tour, index) => (
                                                            <li key={index} className="flex py-6">
                                                                <div className="flex-shrink-0 overflow-hidden">
                                                                    <div className='mr-3'>
                                                                        <input
                                                                            type={'checkbox'}
                                                                            value={tour.slug}
                                                                            onChange={(e) => handleChangeItems(e.target)}
                                                                            className='w-4 h-4'
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="h-16 md:h-24 w-16 md:w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                    <img
                                                                        src={`${API_HOST}/api/v1/views/show/photos/` + tour.images[0]}
                                                                        alt={tour.title}
                                                                        className="h-full w-full object-cover object-center"
                                                                    />
                                                                </div>

                                                                <div className="ml-4 flex flex-1 flex-col">
                                                                    <div>
                                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                                            <h3>
                                                                                <a
                                                                                    href={'#'}
                                                                                    className='text-sm md:text-base'
                                                                                >
                                                                                    {tour.title.substr(0, 40)}...
                                                                                </a>
                                                                            </h3>
                                                                            <div>
                                                                                <p className="ml-4 text-sm md:text-base">
                                                                                    <strike>
                                                                                        {tour.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                                                                                    </strike>
                                                                                </p>
                                                                                {tour.price !== tour.sale && (
                                                                                    <p className="ml-4 text-sm md:text-base">
                                                                                        {tour.sale.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                                                                                    </p>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                        <p className="mt-1 text-xs md:text-sm text-gray-500 flex items-center">{tour.address_start} <Hi.HiArrowRight className='mx-1 text-red-500' /> {tour.address_end}</p>
                                                                    </div>
                                                                    <div className="flex flex-1 items-end justify-between text-sm">
                                                                        <p className="text-gray-500"></p>
                                                                        <div className="flex">
                                                                            <button
                                                                                type="button"
                                                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                            >
                                                                                Remove
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <p>Subtotal</p>

                                                <p>{total.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</p>
                                            </div>
                                            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                            <div className="mt-6">
                                                <div className='flex items-center justify-center'>
                                                    <button
                                                        type='button'
                                                        onClick={handleCreateOrder}
                                                        className="rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                                    >
                                                        Create Order
                                                    </button>
                                                </div>

                                            </div>
                                            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                                <p>
                                                    or
                                                    <button
                                                        type="button"
                                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        Continue Shopping
                                                        <span aria-hidden="true"> &rarr;</span>
                                                    </button>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}