import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { API_HOST } from '../../../init';
import numeral from 'numeral';
import axios from 'axios';
import AxiosJWT from '../../../axios';
import { useDispatch, useSelector } from 'react-redux';

import * as Ci from "react-icons/ci";
import * as Io5 from "react-icons/io5";
import { loginSuccess } from '../../../redux/authSlice';
import { callApiFailed, callApiStart, callApiSuccess } from '../../../redux/apiSlice';


export default function ModalAdd({ plus, handlePlus }) {
    // redux
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.login.currentUser)

    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)
    const handleOpen = () => {
        setOpen(!open)
        handlePlus()
    }
    useEffect(() => {
        setOpen(plus)
    }, [plus])

    // data form
    const [data, setData] = useState({});
    const handleDataChange = (target) => {
        const { name, value } = target
        if (name == 'price' || name == 'sale') {
            const vl = value.replaceAll(',', '')
            if (isNaN(vl)) {
                return alert('value cannot be string!')
            }
            setData(prev => ({
                ...prev,
                [name]: vl
            }))
        } else {
            setData(prev => ({
                ...prev,
                [name]: value
            }))
        }
    }
    console.log(data);
    // schedule
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
        sch.push({})
        setSchedule([...sch])
    }
    const handleScheduleDelete = (index) => {
        setSchedule(schedule.filter((el, idx) => idx !== index))
    }

    // photos
    const [photos, setPhotos] = useState()
    const handleOnchangePhotos = (e) => {
        photos && photos.map(file => {
            URL.revokeObjectURL(file.preview)
        })
        // create photos
        const files = e.target.files
        const photosArray = Object.keys(files).map(index => {
            let newFile = files[index]
            newFile.preview = URL.createObjectURL(newFile)
            return newFile
        })
        setPhotos(photosArray)
    }
    const handleDeletePhoto = (index) => {
        URL.revokeObjectURL(photos[index].preview);
        const newArr = photos.filter((el, idx) => index !== idx);
        setPhotos(newArr)
    }

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

    // submit
    const handleSubmit = () => {
        let formData = new FormData();
        photos?.map(file => {
            formData.append("photos", file);
        })
        const result = Object.entries(data).map(([k, v]) => ({ [k]: v }));
        result.map(obj => {
            formData.append(Object.keys(obj)[0], Object.values(obj)[0])
        })
        formData.append('schedule', JSON.stringify(schedule))

        const Axios = AxiosJWT(user, dispatch, loginSuccess)
        dispatch(callApiStart())
        Axios.put(`${API_HOST}/api/v1/service/store`,
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
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
                const { data } = err.response
                dispatch(callApiFailed(data))
            })
        setOpen(!open)
        handlePlus()
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={handleOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <ExclamationTriangleIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                        </div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                                Add tours to the system
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Are you sure you want to add tours to the system? All your tour data will be updated to the system htmlFor everyone to see. Best regards!
                                                </p>

                                                {/* form input */}
                                                <div>
                                                    {/* Tour title */}
                                                    <div>
                                                        <label htmlFor="title" className="flex block text-sm font-medium text-gray-700 justify-start mt-4">
                                                            Tour title
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="title"
                                                            id="title"
                                                            autoComplete="title"
                                                            value={data?.title}
                                                            onChange={(e) => handleDataChange(e.target)}
                                                            className="mt-1 bg-gray-50 hover:bg-green-50 block w-full rounded-md border border-gray-300 py-2 px-3 hadow-sm focus:border-green-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                        />
                                                    </div>
                                                    {/* description */}
                                                    <div>
                                                        <label htmlFor="description" className="flex block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400 justify-start mt-4">Tour description</label>
                                                        <textarea
                                                            name='description'
                                                            id="description"
                                                            rows="4"
                                                            className="mt-1 bg-gray-50 hover:bg-green-50 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-green-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                            placeholder="Your description..."
                                                            value={data?.description}
                                                            onChange={(e) => handleDataChange(e.target)}
                                                        ></textarea>
                                                    </div>
                                                    {/* price */}
                                                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6'>
                                                        <div>
                                                            {/* price */}
                                                            <label htmlFor="price" className="flex block text-sm font-medium text-gray-700 justify-start mt-4">
                                                                Tour price
                                                            </label>
                                                            <input
                                                                name='price'
                                                                type="text"
                                                                id="price"
                                                                autoComplete="price"
                                                                value={data?.price}
                                                                onChange={(e) => handleDataChange(e.target)}
                                                                className="mt-1 bg-gray-50 hover:bg-green-50 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-green-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                            />
                                                        </div>
                                                        <div>
                                                            {/* sale */}
                                                            <label htmlFor="sale" className="flex block text-sm font-medium text-gray-700 justify-start mt-4">
                                                                Tour price sale
                                                            </label>
                                                            <input
                                                                name='sale'
                                                                type="text"
                                                                id="sale"
                                                                autoComplete="sale"
                                                                value={data?.sale}
                                                                onChange={(e) => handleDataChange(e.target)}
                                                                className="mt-1 bg-gray-50 hover:bg-green-50 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-green-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                            />
                                                        </div>
                                                    </div>
                                                    {/* area_slug */}
                                                    <div>
                                                        <label htmlFor="area_slug" className="flex block text-sm font-medium text-gray-700 justify-start mt-4">
                                                            Tour City
                                                        </label>
                                                        <div className='flex'>
                                                            <select
                                                                defaultValue={1}
                                                                className="mt-1 bg-gray-50 hover:bg-green-50 block w-28 rounded-l-md border border-gray-300 py-2 px-3 shadow-sm focus:border-green-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                            >
                                                                <option value="US">Viet Nam</option>
                                                                <option value="US">United States</option>
                                                                <option value="CA">Canada</option>
                                                                <option value="FR">France</option>
                                                                <option value="DE">Germany</option>
                                                            </select>
                                                            <select
                                                                name='area_slug'
                                                                id="area_slug"
                                                                defaultValue={1}
                                                                value={data?.area_slug}
                                                                onChange={(e) => handleDataChange(e.target)}
                                                                className="mt-1 bg-gray-50 hover:bg-green-50 block w-full rounded-r-md border border-gray-300 py-2 px-3 shadow-sm focus:border-green-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                            >
                                                                <option value={''}>Choose the city</option>
                                                                {areas && areas.map((area, index) => (
                                                                    <option key={index} value={area.slug}>{area.title}</option>
                                                                ))}
                                                            </select>
                                                        </div>

                                                    </div>
                                                    {/* time_start */}
                                                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6'>
                                                        {/* time_start */}
                                                        <div>
                                                            <label htmlFor="time_start" className="flex block text-sm font-medium text-gray-700 justify-start mt-4">
                                                                Tour time start
                                                            </label>
                                                            <input
                                                                name='time_start'
                                                                type="date"
                                                                id="time_start"
                                                                autoComplete="time_start"
                                                                value={data?.time_start}
                                                                onChange={(e) => handleDataChange(e.target)}
                                                                className="mt-1 bg-gray-50 hover:bg-green-50 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-green-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                            />
                                                        </div>
                                                        {/* time_end */}
                                                        <div>
                                                            <label htmlFor="time_end" className="flex block text-sm font-medium text-gray-700 justify-start mt-4">
                                                                Tour time end
                                                            </label>
                                                            <input
                                                                name='time_end'
                                                                type="date"
                                                                id="time_end"
                                                                autoComplete="time_end"
                                                                value={data?.time_end}
                                                                onChange={(e) => handleDataChange(e.target)}
                                                                className="mt-1 bg-gray-50 hover:bg-green-50 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-green-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                            />
                                                        </div>
                                                    </div>
                                                    {/* address_start */}
                                                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6'>
                                                        {/* address_start */}
                                                        <div>
                                                            <label htmlFor="address_start" className="flex block text-sm font-medium text-gray-700 justify-start mt-4">
                                                                Tour address start
                                                            </label>
                                                            <div className='flex'>
                                                                <select
                                                                    defaultValue={1}
                                                                    className="mt-1 bg-gray-50 hover:bg-green-50 block w-28 rounded-l-md border border-gray-300 py-2 px-3 shadow-sm focus:border-green-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                                >
                                                                    <option value="US">Viet Nam</option>
                                                                    <option value="US">United States</option>
                                                                    <option value="CA">Canada</option>
                                                                    <option value="FR">France</option>
                                                                    <option value="DE">Germany</option>
                                                                </select>
                                                                <select
                                                                    name='address_start'
                                                                    id="address_start"
                                                                    defaultValue={1}
                                                                    value={data?.address_start}
                                                                    onChange={(e) => handleDataChange(e.target)}
                                                                    className="mt-1 bg-gray-50 hover:bg-green-50 block w-full rounded-r-md border border-gray-300 py-2 px-3 shadow-sm focus:border-green-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                                >
                                                                    <option value={''}>Choose the city</option>
                                                                    {areas && areas.map((area, index) => (
                                                                        <option key={index} value={area.title}>{area.title}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        {/* address_end */}
                                                        <div>
                                                            <label htmlFor="address_end" className="flex block text-sm font-medium text-gray-700 justify-start mt-4">
                                                                Tour address end
                                                            </label>
                                                            <div className='flex'>
                                                                <select
                                                                    defaultValue={1}
                                                                    className="mt-1 bg-gray-50 hover:bg-green-50 block w-28 rounded-l-md border border-gray-300 py-2 px-3 shadow-sm focus:border-green-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                                >
                                                                    <option value="US">Viet Nam</option>
                                                                    <option value="US">United States</option>
                                                                    <option value="CA">Canada</option>
                                                                    <option value="FR">France</option>
                                                                    <option value="DE">Germany</option>
                                                                </select>
                                                                <select
                                                                    name='address_end'
                                                                    id="address_end"
                                                                    defaultValue={1}
                                                                    value={data?.address_end}
                                                                    onChange={(e) => handleDataChange(e.target)}
                                                                    className="mt-1 bg-gray-50 hover:bg-green-50 block w-full rounded-r-md border border-gray-300 py-2 px-3 shadow-sm focus:border-green-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                                >
                                                                    <option value={''}>Choose the city</option>
                                                                    {areas && areas.map((area, index) => (
                                                                        <option key={index} value={area.title}>{area.title}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* schedule */}
                                                    <div className='mt-8'>
                                                        <div className='items-end'>
                                                            <label className="flex block text-sm font-medium text-gray-700 justify-start">
                                                                Schedule
                                                            </label>
                                                            <p className="text-sm text-gray-500">
                                                                Detailed schedule of attractions and services of the tour
                                                            </p>
                                                            <div className='flex items-center'>
                                                                <div className='bg-green-100 h-0.5 w-full'></div>
                                                                <button className='ml-2 py-2 px-4 bg-green-400 hover:bg-green-500 flex justify-center items-center rounded'
                                                                    onClick={handleSchedulePlus}
                                                                >
                                                                    <Ci.CiSquarePlus size={24} color={'white'} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                        {/* details day */}
                                                        {schedule?.map((e, index) => (
                                                            <div>
                                                                <div className='mt-4 flex items-center'>
                                                                    <label className="flex block text-sm font-medium text-gray-700 justify-start w-12">
                                                                        Day {index + 1}
                                                                    </label>
                                                                    <div className='bg-green-100 h-0.5 w-full'></div>
                                                                    <button className='ml-2 py-2 px-2 bg-red-400 hover:bg-red-500 flex justify-center items-center rounded'
                                                                        onClick={() => handleScheduleDelete(index)}
                                                                    >
                                                                        <Ci.CiSquareRemove size={24} color={'white'} />
                                                                    </button>
                                                                </div>
                                                                <div className='w-full'>
                                                                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6'>
                                                                        <div>
                                                                            <label htmlFor="schedule_title" className="flex block text-sm font-medium text-gray-700 justify-start mt-4">
                                                                                Title
                                                                            </label>
                                                                            <input
                                                                                name='title'
                                                                                type="text"
                                                                                id="schedule_title"
                                                                                autoComplete="schedule_title"
                                                                                value={e?.title}
                                                                                onChange={(el) => handleScheduleChange(el.target, index)}
                                                                                className="mt-1 bg-gray-50 hover:bg-green-50 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-green-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                                            />
                                                                        </div>
                                                                        <div>
                                                                            <label htmlFor="schedule_date" className="flex block text-sm font-medium text-gray-700 justify-start mt-4">
                                                                                Date
                                                                            </label>
                                                                            <input
                                                                                name='date'
                                                                                type="date"
                                                                                id="schedule_date"
                                                                                autoComplete="schedule_date"
                                                                                value={e?.date}
                                                                                onChange={(el) => handleScheduleChange(el.target, index)}
                                                                                className="mt-1 bg-gray-50 hover:bg-green-50 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-green-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    {/* Details */}
                                                                    <div>
                                                                        <label htmlFor="schedule_details" className="flex block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400 justify-start mt-4">Details</label>
                                                                        <textarea
                                                                            name='details'
                                                                            id="schedule_details"
                                                                            rows="4"
                                                                            className="mt-1 bg-gray-50 hover:bg-green-50 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-green-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                                            placeholder="Your details..."
                                                                            value={e?.details}
                                                                            onChange={(el) => handleScheduleChange(el.target, index)}
                                                                        ></textarea>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    {/* photos */}
                                                    <div>
                                                        <label htmlFor="photos" className="flex block text-sm font-medium text-gray-700 justify-start mt-4 mb-2">
                                                            Tour photos
                                                        </label>

                                                        <div className="flex justify-center items-center w-full">
                                                            <label htmlFor="dropzone-file" className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 hover:bg-green-50 border-2 border-gray-300 border-dashed cursor-pointer hover:border-green-300 hover:bg-green-50">
                                                                <div className="flex flex-col justify-center items-center pt-5 pb-6">
                                                                    <Ci.CiCamera size={72} color={'gray'} />
                                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                                                </div>
                                                                <input name='photos' id="dropzone-file" type="file" class="hidden" multiple
                                                                    onChange={handleOnchangePhotos}
                                                                />
                                                            </label>
                                                        </div>

                                                        {photos && (
                                                            <div>
                                                                <div className='flex mt-4 items-center'>
                                                                    <p>Attachments</p>
                                                                    <div className='mx-2 bg-green-100 px-1 rounded'>{photos.length}</div>
                                                                    <div className='bg-green-100 h-0.5 w-full'></div>
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* list photos */}
                                                        <div className="bg-white">
                                                            <div className="mx-auto max-w-2xl py-4 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
                                                                <div className="mt-4 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                                                                    {photos && photos.map((file, index) => (
                                                                        <div key={index} className="group relative">
                                                                            <button className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                                                                                <img
                                                                                    src={file.preview}
                                                                                    alt={file.name}
                                                                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                                                                />
                                                                            </button>
                                                                            <div className="mt-4 flex justify-between">
                                                                                <div>
                                                                                    <h3 className="flex justify-start text-sm text-gray-700">
                                                                                        Title: {file.name}
                                                                                    </h3>
                                                                                    <p className="mt-1 text-sm text-gray-500">By size: {`${numeral(file.size).format('0.00a')}b`}</p>
                                                                                </div>

                                                                                <button type="button" class="text-red-500 bg-white border border-gray-300 focus:outline-none hover:bg-red-500 hover:text-white font-medium rounded-lg text-sm px-4 py-2 mr-2 mb-2 "
                                                                                    onClick={() => handleDeletePhoto(index)}
                                                                                >
                                                                                    <Io5.IoCloseOutline size={24} />
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* end */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* button */}
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={handleSubmit}
                                    >
                                        Submit
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={handleOpen}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}