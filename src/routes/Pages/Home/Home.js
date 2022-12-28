import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Slider from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import moment from 'moment'
import { Zoom } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
import { Carousel } from 'antd'
function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}
const slides = [
	{
		url: 'https://api.travels.games/api/v1/views/show/photos/photos-16677601765351',
	},
	{
		url: 'https://api.travels.games/api/v1/views/show/photos/photos-16677601765422',
	},
	{
		url: 'http://api.travels.games/api/v1/views/show/photos/photos-16677601765422',
	},
	{
		url: 'https://api.travels.games/api/v1/views/show/photos/photos-16677601765290',
	},
]

function Home() {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [cartList, setCartList] = useState([])
	const [areas, setAreas] = useState()

	useEffect(() => {
		getCartList()
	}, [])

	useEffect(() => {
		getAllArea()
	}, [0])

	const getAllArea = async () => {
		axios
			.get('https://api.travels.games/api/v1/area/show/all')
			.then((res) => {
				// console.log(res.data.data[0]);
				setAreas(res.data.data)
			})
			.catch((err) => {
				console.log(err.response)
			})
	}

	const getCartList = () => {
		axios
			.get(`https://api.travels.games/api/v1/tour/show/all/area/tinh-ha-giang`)
			.then((res) => {
				// console.log(res.data.data[0])
				setCartList(res.data.data)
			})
			.catch((err) => {
				console.log(err.response)
			})
	}

	const hardleOnchaneArea = (SlugArea) => {
		axios
			.get(`https://api.travels.games/api/v1/tour/show/all/area/${SlugArea}`)
			.then((res) => {
				// console.log(res.data.data[0]);
				setCartList(res.data.data)
			})
			.catch((err) => {
				console.log(err.response)
			})
	}

	const [homeList, setHomeList] = useState()
	useEffect(() => {
		axios
			.get('https://api.travels.games/api/v1/tour/show/last-tour/22')
			.then((res) => {
				// console.log(res.data.data[0]);
				setHomeList(res.data.data)
			})
			.catch((err) => {
				console.log(err.response)
			})
	}, [])

	const [imageSlides, setImageSlides] = useState()
	useEffect(() => {
		axios
			.get('https://api.travels.games/api/v1/tour/show/last-tour/22')
			.then((res) => {
				// console.log(res.data.data[0]);
				setImageSlides(res.data.data)
			})
			.catch((err) => {
				console.log(err.response)
			})
	}, [])

	const contentStyle = {
		height: '600px',
		color: '#fff',
		lineHeight: '300px',
		textAlign: 'center',
		background: '#364d79',
	}
	// const [search, setSearch] = useState('')

	const hardleResearchArea = (search) => {
		if (search != '') {
			axios
				.get(`https://api.travels.games/api/v1/tour/show/all/search/${search}`)
				.then((res) => {
					console.log('search: ', res.data.data)
					setHomeList(res.data.data)
				})
				.catch((err) => {
					console.log(err.response)
				})
		} else {
			axios
				.get('https://api.travels.games/api/v1/tour/show/last-tour/22')
				.then((res) => {
					console.log('ajsh:', res.data.data)
					setHomeList(res.data.data)
				})
				.catch((err) => {
					console.log(err.response)
				})
		}
	}
	return (
		<div className="bg-white">
			{/* slider */}
			<Carousel autoplay>
				{slides.map((slide) => (
					<div>
						<h3 style={contentStyle}>
							<img class=" rounded-t-lg w-full h-full" src={slide.url} />
						</h3>
					</div>
				))}
			</Carousel>

			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
					<form class="text-2xl">
						<a> </a>
						<label class="relative block">
							<span class="sr-only">Search</span>
							<span class="absolute inset-y-0 left-0 flex items-center pl-2">
								<svg class="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
							</span>
							<input
								class="placeholder:italic placeholder:text-slate-400 block bg-white w-58 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
								placeholder="search:"
								onChange={(e) => hardleResearchArea(e.target.value)}
								type="text"
								name="search"
							/>
						</label>
					</form>
					<h2 className="text-2xl font-bold text-gray-900">Collections</h2>
					<div className="grid gap-4 grid-cols-3 mt-6">
						{homeList &&
							homeList.map((tour) => (
								<div class=" max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
									<a href="#">
										<img
											class=" rounded-t-lg w-full h-72"
											src={tour.images[0]}
											alt="product image"
										/>
									</a>
									<div class="px-5 pb-5">
										<a href="#">
											<p class="text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-400">
												{moment(tour.time_start).format('DD/MM/yyyy')} -{' '}
												{moment(tour.time_end).format('DD/MM/yyyy')}
											</p>
											<h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white line-clamp-1">
												{tour.title}
											</h5>
										</a>
										<div class="flex items-center mt-2.5 mb-5">
											<svg
												aria-hidden="true"
												class="w-5 h-5 text-yellow-300"
												fill="currentColor"
												viewBox="0 0 20 20"
												xmlns="http://www.w3.org/2000/svg"
											>
												<title>First star</title>
												<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
											</svg>
											<svg
												aria-hidden="true"
												class="w-5 h-5 text-yellow-300"
												fill="currentColor"
												viewBox="0 0 20 20"
												xmlns="http://www.w3.org/2000/svg"
											>
												<title>Second star</title>
												<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
											</svg>
											<svg
												aria-hidden="true"
												class="w-5 h-5 text-yellow-300"
												fill="currentColor"
												viewBox="0 0 20 20"
												xmlns="http://www.w3.org/2000/svg"
											>
												<title>Third star</title>
												<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
											</svg>
											<svg
												aria-hidden="true"
												class="w-5 h-5 text-yellow-300"
												fill="currentColor"
												viewBox="0 0 20 20"
												xmlns="http://www.w3.org/2000/svg"
											>
												<title>Fourth star</title>
												<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
											</svg>
											<svg
												aria-hidden="true"
												class="w-5 h-5 text-yellow-300"
												fill="currentColor"
												viewBox="0 0 20 20"
												xmlns="http://www.w3.org/2000/svg"
											>
												<title>Fifth star</title>
												<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
											</svg>
											<span class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
												5.0
											</span>
										</div>
										<p class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white line-clamp-2">
											({tour.address_start}) đến ({tour.address_end})
										</p>
										<div class="flex items-center justify-between">
											<span class="text-3xl font-bold text-gray-900 dark:text-white">
												{tour.price}
												VNĐ
											</span>
											<a
												href="#"
												class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
											>
												Add to cart
											</a>
										</div>
									</div>
								</div>
							))}
					</div>
				</div>
				<div>
					<form>
						<select onChange={(e) => hardleOnchaneArea(e.target.value)}>
							{/* <option value={area.slug}>{area.title}</option> */}
							{areas && areas.map((area) => <option value={area.slug}>{area.title}</option>)}
						</select>
					</form>
				</div>
				<div class="grid gap-x-8 gap-y-4 grid-rows-1 py-4">
					{cartList &&
						cartList.map((card) => (
							<div class="flex rounded-lg bg-white shadow-lg">
								<div class="flex-none">
									<img
										class="min-h-full w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
										src={card.images[0]}
										alt=""
									/>
								</div>
								<div class="p-4 flex-1 flex-col justify-start">
									<h5 class="text-gray-900 text-xl font-medium mb-2">{card.title}</h5>
									<p class="text-gray-700 text-base mb-4">
										{card.address_start} - {card.address_end}
									</p>
									<p class="text-gray-600 text-xs">Last updated 3 mins ago</p>
									<div class="flex items-center mt-2.5 mb-5">
										<svg
											aria-hidden="true"
											class="w-5 h-5 text-yellow-300"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
										>
											<title>First star</title>
											<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
										</svg>
										<svg
											aria-hidden="true"
											class="w-5 h-5 text-yellow-300"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
										>
											<title>Second star</title>
											<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
										</svg>
										<svg
											aria-hidden="true"
											class="w-5 h-5 text-yellow-300"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
										>
											<title>Third star</title>
											<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
										</svg>
										<svg
											aria-hidden="true"
											class="w-5 h-5 text-yellow-300"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
										>
											<title>Fourth star</title>
											<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
										</svg>
										<svg
											aria-hidden="true"
											class="w-5 h-5 text-yellow-300"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
										>
											<title>Fifth star</title>
											<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
										</svg>
										<span class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
											5.0
										</span>
									</div>
								</div>
								<div class="content-end pr-1 justify-self-end p-4">
									<p>giá chỉ từ</p>
									<div class="flex items-center justify-between">
										<span class="text-2xl font-bold text-gray-900 dark:text-red-600">
											{card.price} VNĐ
										</span>
									</div>
									<p class="text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-400">
										{moment(card.createdAt).format('DD-MM-yyyy')}
									</p>
									<div class="pt-2">
										<a
											href="#"
											class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
										>
											Add to cart
										</a>
									</div>
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	)
}
export default Home
