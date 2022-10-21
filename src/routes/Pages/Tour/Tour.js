import * as React from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

const Tour = () => {
    const [title, setTitle] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [price, setPrice] = React.useState('')
    const [area_id, setArea_id] = React.useState('')


    const handleChangeTitle = (e) => {
        setTitle(e.target.value)
    }
    const handleChangeDescription = (e) => {
        setDescription(e.target.value)
    }
    const handleChangePrice = (e) => {
        setPrice(e.target.value)
    }
    const handleChangeArea_id = (e) => {
        setArea_id(e.target.value)
    }

    const handleSubmit = () => {
        axios({
            method: 'post',
            url: 'http://localhost/api/v1/tour/store',
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            data: {
                title: title,
                description: description,
                price: price,
                area_id: area_id,
            }
        })
            .then(resule => {
                console.log(resule);
            })
            .catch(err => {
                console.log(err);
            })
    } //

    return (
        <div className='pb-24 w-full bg-cover bg-center bg-[url("./images/background/background.jpg")]'>
            <div className='container mx-auto'>
                <div className="pt-10 sm:pt-24 px-[20%]">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-1">
                            <div className="px-4 sm:px-0">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">Travel Tour</h3>
                                <p className="mt-1 text-sm text-gray-600">Use a permanent address where you can receive mail.</p>
                            </div>
                        </div>
                        <div className="mt-5 md:col-span-2 md:mt-0">
                            <form action="http://localhost/api/v1/tour/store" method="POST" encType="multipart/form-data">
                                <div className="overflow-hidden shadow sm:rounded-md">
                                    <div className="px-4 py-5 sm:p-6">
                                        <div className="grid grid-cols-6 gap-6">
                                            {/* title */}
                                            <div className="col-span-6 sm:col-span-6">
                                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                                    Title
                                                </label>
                                                <input
                                                    type="text"
                                                    name="title"
                                                    id="title"
                                                    autoComplete="title"
                                                    value={title}
                                                    onChange={handleChangeTitle}
                                                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 bg-white shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                            {/* description */}
                                            <div className="col-span-6 sm:col-span-6">
                                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                                <div className="mt-1">
                                                    <textarea
                                                        onChange={handleChangeDescription}
                                                        value={description}
                                                        id="description"
                                                        name="description"
                                                        rows="3"
                                                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm" placeholder="Enter description"></textarea>
                                                </div>
                                            </div>
                                            {/* price */}
                                            <div className="col-span-6 sm:col-span-6">
                                                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                                    Price
                                                </label>
                                                <input
                                                    type="text"
                                                    name="price"
                                                    id="price"
                                                    autoComplete="price"
                                                    value={price}
                                                    onChange={handleChangePrice}
                                                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 bg-white shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                            {/* area_id */}
                                            <div className="col-span-6 sm:col-span-6">
                                                <label htmlFor="area_id" className="block text-sm font-medium text-white">
                                                    Area id
                                                </label>
                                                <input
                                                    type="text"
                                                    name="area_id"
                                                    id="area_id"
                                                    autoComplete="area_id"
                                                    value={area_id}
                                                    onChange={handleChangeArea_id}
                                                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 bg-white shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                            <div className="col-span-6 sm:col-span-6">
                                                <label className="block text-sm font-medium text-gray-700">Cover photo</label>
                                                <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                                                    <div className="space-y-1 text-center">
                                                        <svg
                                                            className="mx-auto h-12 w-12 text-gray-400"
                                                            stroke="currentColor"
                                                            fill="none"
                                                            viewBox="0 0 48 48"
                                                            aria-hidden="true"
                                                        >
                                                            <path
                                                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                                strokeWidth={2}
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </svg>
                                                        <div className="flex text-sm text-gray-600">
                                                            <label
                                                                htmlFor="file-upload"
                                                                className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                                                            >
                                                                <span>Upload a file</span>
                                                                <input id="file-upload" name="photos" type="file" className="sr-only" accept="image/*" multiple/>
                                                            </label>
                                                            <p className="pl-1">or drag and drop</p>
                                                        </div>
                                                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-4 py-3 text-right sm:px-6">
                                        <button
                                            type="button"
                                            onClick={handleSubmit}
                                            className="w-full inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            ADD TOUR
                                        </button>
                                    </div>
                                    <div className="px-4 py-3 text-right sm:px-6">
                                        <Link to={'#'} >Register</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tour