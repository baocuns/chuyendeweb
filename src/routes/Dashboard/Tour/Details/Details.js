import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import TextareaAutosize from 'react-textarea-autosize';
import * as Ci from "react-icons/ci";
import Components from "../../../../components";
import AxiosJWT from "../../../../axios";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../../../redux/authSlice";
import { callApiFailed, callApiStart, callApiSuccess } from "../../../../redux/apiSlice";
import { API_HOST } from "../../../../init";
import moment from 'moment'

const product = {
    name: 'Basic Tee 6-Pack',
    price: '$192',
    href: '#',
    breadcrumbs: [
        { id: 1, name: 'Men', href: '#' },
        { id: 2, name: 'Clothing', href: '#' },
    ],
    images: [
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
            alt: 'Two each of gray, white, and black shirts laying flat.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
            alt: 'Model wearing plain black basic tee.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
            alt: 'Model wearing plain gray basic tee.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
            alt: 'Model wearing plain white basic tee.',
        },
    ],
    colors: [
        { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
        { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
        { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
    ],
    sizes: [
        { name: 'XXS', inStock: false },
        { name: 'XS', inStock: true },
        { name: 'S', inStock: true },
        { name: 'M', inStock: true },
        { name: 'L', inStock: true },
        { name: 'XL', inStock: true },
        { name: '2XL', inStock: true },
        { name: '3XL', inStock: true },
    ],
    description:
        'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
    highlights: [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors',
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton',
    ],
    details:
        'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}
const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const Details = () => {
    // redux
    const dispatch = useDispatch()
    const api = useSelector((state) => state.api.api)
    const user = useSelector((state) => state.auth.login.currentUser)
    const navigate = useNavigate()

    const { slug } = useParams()
    const [selectedColor, setSelectedColor] = useState(product.colors[0])
    const [selectedSize, setSelectedSize] = useState(product.sizes[2])
    const [openAlert, setOpenAlert] = useState(false)
    const handleOpenAlert = () => {
        setOpenAlert(!openAlert)
    }

    const [tour, setTour] = useState()
    const handleChangeTour = (target) => {
        const { name, value } = target
        if (name === 'price' || name === 'sale') {
            const vl = value.replaceAll(',', '')
            if (isNaN(vl)) {
                return alert('value cannot be string!')
            }
            setTour(prev => ({
                ...prev,
                [name]: vl
            }))
        } else {
            setTour(prev => ({
                ...prev,
                [name]: value
            }))
        }
    }

    const [schedule, setSchedule] = useState([])
    const handleScheduleChange = (target, index) => {
        const { name, value } = target
        let prev = schedule
        prev[index] = {
            ...prev[index],
            [name]: value
        }
        setSchedule([...prev])
    }
    const handleSchedulePlus = () => {
        let sch = schedule
        sch.push({
            title: 'Edit Title',
            date: new Date(),
            details: 'Edit Details',
        })
        setSchedule([...sch])
    }
    const handleScheduleDelete = (index) => {
        setSchedule(schedule.filter((el, idx) => idx !== index))
    }

    // handle update
    const handleSubmit = () => {
        let formData = new FormData();
        formData.append('title', tour.title)
        formData.append('description', tour.description)
        formData.append('price', tour.price)
        formData.append('sale', tour.sale)
        formData.append('area_slug', tour.area_slug)
        formData.append('time_start', tour.time_start)
        formData.append('time_end', tour.time_end)
        formData.append('address_start', tour.address_start)
        formData.append('address_end', tour.address_end)
        formData.append('schedule', JSON.stringify(schedule))

        const Axios = AxiosJWT(user, dispatch, loginSuccess)
        dispatch(callApiStart())
        Axios.put(`${API_HOST}/api/v1/service/update/${tour?._id}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }
        )
            .then(res => {
                const { data, ...rest } = res.data
                dispatch(callApiSuccess(rest))
                navigate('/dashboard/tour')
            })
            .catch(err => {
                const { data } = err.response
                dispatch(callApiFailed(data))
                navigate('/dashboard/tour')
            })
    }

    // load tour
    useEffect(() => {
        axios.get(`${API_HOST}/api/v1/tour/show/details/${slug}`)
            .then(res => {
                setTour(res.data.data[0])
                setSchedule(res.data.data[0].schedule)
            })
            .catch(err => {
                const { data } = err.response
                dispatch(callApiFailed(data))
                navigate('/dashboard/tour')
            })
    }, [])

    // City
    const [areas, setAreas] = useState()
    useEffect(() => {
        axios.get(`${API_HOST}/api/v1/area/show/all`)
            .then(result => {
                setAreas(result.data.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    // delete tour
    const [isDelete, setIsDelete] = useState(false)
    const handleAlertDelete = () => {
        setIsDelete(!isDelete)
    }
    const handleSubmitDelete = () => {
        const Axios = AxiosJWT(user, dispatch, loginSuccess)
        dispatch(callApiStart())
        Axios.delete(`${API_HOST}/api/v1/service/delete/${tour._id}`)
            .then(res => {
                const { data, ...rest } = res.data
                dispatch(callApiSuccess(rest))
                navigate('/dashboard/tour')
            })
            .catch(err => {
                const { data } = err.response
                dispatch(callApiFailed(data))
                navigate('/dashboard/tour')
            })
    }

    return (
        <div className="bg-white">
            {/* loader */}
            {api.isFetching && (
                <Components.Loader />
            )}
            <div className="pt-6">
                {/* Image gallery */}
                <div className="relative w-full flex snap-x gap-6 overflow-x-auto pb-14">
                    {tour && tour.images.map((e, index) => (
                        <div key={index} className="snap-center shrink-0 hover:opacity-75 hover:cursor-pointer">
                            <img
                                src={e}
                                alt={tour.title}
                                className="object-cover object-center p-4 shrink-0 w-96 h-full"
                            />
                        </div>
                    ))}

                </div>

                {/* Product info */}
                <div className="mx-auto max-w-2xl px-4 pt-10 pb-4 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-16">
                    {/* title */}
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        <TextareaAutosize
                            name="title"
                            defaultValue={tour?.title}
                            onChange={(e) => handleChangeTour(e.target)}
                            className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl focus:outline-0 w-full resize-none"
                        />
                    </div>

                    {/* Options */}
                    <div className="mt-4 lg:row-span-3 lg:mt-0">
                        <h2 className="sr-only">Product information</h2>
                        <h2 className="">Price</h2>
                        <div className="w-full flex">
                            <TextareaAutosize
                                name="price"
                                defaultValue={tour?.price}
                                onChange={(e) => handleChangeTour(e.target)}
                                className="text-3xl tracking-tight text-gray-900 focus:outline-0 resize-none w-full"
                            />
                            <div className="text-3xl text-gray-900 tracking-tight mr-2">vnđ</div>
                        </div>
                        <h2 className="">Sale</h2>
                        <div className="w-full flex">
                            <TextareaAutosize
                                name="sale"
                                defaultValue={tour?.sale}
                                onChange={(e) => handleChangeTour(e.target)}
                                className="text-3xl tracking-tight text-gray-900 focus:outline-0 resize-none w-full"
                            />
                            <div className="text-3xl text-gray-900 tracking-tight mr-2">vnđ</div>
                        </div>
                    </div>

                    <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
                        {/* Description and details */}
                        <div>
                            <h3 className="sr-only">Description</h3>

                            <div className="space-y-6">
                                <TextareaAutosize
                                    name="description"
                                    defaultValue={tour?.description}
                                    onChange={(e) => handleChangeTour(e.target)}
                                    className="text-base text-gray-900 focus:outline-0 resize-none w-full"
                                />
                            </div>
                        </div>
                        <div className="mt-10">
                            <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
                            <div className="mt-4">
                                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                    {/* time start */}
                                    <li className="text-gray-400">
                                        <span className="text-gray-600">Time start:</span>
                                        <input
                                            name='time_start'
                                            type="date"
                                            id="time_start"
                                            autoComplete="time_start"
                                            value={moment(tour?.time_start).format('yyyy-MM-DD')}
                                            onChange={(e) => handleChangeTour(e.target)}
                                            className="px-3 focus:outline-0 sm:text-sm text-black font-bold"
                                        />
                                    </li>
                                    {/* time end */}
                                    <li className="text-gray-400">
                                        <span className="text-gray-600">Time end:</span>
                                        <input
                                            name='time_end'
                                            type="date"
                                            id="time_end"
                                            autoComplete="time_end"
                                            value={moment(tour?.time_end).format('yyyy-MM-DD')}
                                            onChange={(e) => handleChangeTour(e.target)}
                                            className="px-3 focus:outline-0 sm:text-sm text-black font-bold"
                                        />
                                    </li>
                                    {/* location */}
                                    <li className="text-gray-400">
                                        <span className="text-gray-600">Localtion:</span>
                                        <select
                                            name='area_slug'
                                            id="area_slug"
                                            value={tour?.area_slug}
                                            onChange={(e) => handleChangeTour(e.target)}
                                            className="mt-1 px-3 sm:text-sm text-black"
                                        >
                                            <option value={''}>Choose the city</option>
                                            {areas && areas.map((area, index) => (
                                                <option key={index} value={area.slug}>{area.title}</option>
                                            ))}
                                        </select>
                                    </li>
                                    {/* start */}
                                    <li className="text-gray-400">
                                        <span className="text-gray-600">Start:</span>
                                        <select
                                            name='address_start'
                                            id="address_start"
                                            value={tour?.address_start}
                                            onChange={(e) => handleChangeTour(e.target)}
                                            className="mt-1 px-3 sm:text-sm text-black"
                                        >
                                            <option value={''}>Choose the city</option>
                                            {areas && areas.map((area, index) => (
                                                <option key={index} value={area.title}>{area.title}</option>
                                            ))}
                                        </select>
                                    </li>
                                    {/* end */}
                                    <li className="text-gray-400">
                                        <span className="text-gray-600">End:</span>
                                        <select
                                            name='address_end'
                                            id="address_end"
                                            value={tour?.address_end}
                                            onChange={(e) => handleChangeTour(e.target)}
                                            className="mt-1 px-3 sm:text-sm text-black"
                                        >
                                            <option value={''}>Choose the city</option>
                                            {areas && areas.map((area, index) => (
                                                <option key={index} value={area.title}>{area.title}</option>
                                            ))}
                                        </select>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-10">
                            <h2 className="text-sm font-medium text-gray-900">Details</h2>

                            {schedule && schedule.map((e, index) => (
                                <div className="mt-4 space-y-2 border p-2">
                                    <div className="flex justify-between">
                                        <input
                                            name='date'
                                            type="date"
                                            value={`${new Date(e.date).getFullYear()}-${new Date(e.date).getMonth() + 1}-${new Date(e.date).getDate()}`}
                                            onChange={(el) => handleScheduleChange(el.target, index)}
                                            className="focus:outline-0 sm:text-sm text-black font-bold"
                                        />
                                        <div>
                                            <button
                                                onClick={() => handleScheduleDelete(index)}
                                            >
                                                <Ci.CiSquareRemove size={24} color={'red'} />
                                            </button>
                                        </div>
                                    </div>
                                    <TextareaAutosize
                                        name='title'
                                        defaultValue={e.title}
                                        onChange={(el) => handleScheduleChange(el.target, index)}
                                        className="text-sm text-gray-900 focus:outline-0 resize-none w-full"
                                    />
                                    <TextareaAutosize
                                        name="details"
                                        defaultValue={e.details}
                                        onChange={(el) => handleScheduleChange(el.target, index)}
                                        className="text-sm text-gray-900 focus:outline-0 resize-none w-full"
                                    />
                                </div>
                            ))}
                            <div className='flex items-center mt-4'>
                                <div className='bg-green-100 h-0.5 w-full'></div>
                                <button className='ml-2 py-2 px-4 bg-green-400 hover:bg-green-500 flex justify-center items-center rounded'
                                    onClick={handleSchedulePlus}
                                >
                                    <Ci.CiSquarePlus size={24} color={'white'} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* save change */}
                <div className="p-4 mb-16 flex justify-start">
                    <button className="bg-green-500 p-2 rounded text-white hover:cursor-point hover:bg-green-600"
                        onClick={handleOpenAlert}
                    >
                        Save Change
                    </button>
                    <button className="bg-red-500 p-2 rounded text-white hover:cursor-point hover:bg-red-600 ml-4"
                        onClick={handleAlertDelete}
                    >
                        Delete Tour
                    </button>
                </div>
            </div>
            {/* modal alert */}
            {openAlert && (
                <Components.ModalAlert
                    Open={openAlert}
                    handleOpen={handleOpenAlert}
                    Opstion={{
                        title: 'Would you like to receive service updates?',
                        handleCallBack: handleSubmit,
                    }}
                />
            )}
            {isDelete && (
                <Components.ModalAlert
                    Open={isDelete}
                    handleOpen={handleAlertDelete}
                    Opstion={{
                        title: 'Would you like to receive service deleted?',
                        handleCallBack: handleSubmitDelete,
                    }}
                />
            )}
        </div>
    )
}

export default Details