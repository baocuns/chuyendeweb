import axios from 'axios'
import { API_HOST } from '../../../init'
import * as React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import socket from '../../../socket.io'

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

const TourList = ({ type }) => {
	const user = useSelector((state) => state.auth.login.currentUser)
	const api = useSelector((state) => state.api.api.currentApi)

	const [products, setProducts] = useState([])

	useEffect(() => {
		axios
			.get(`${API_HOST}/api/v1/service/${user?.username}`)
			.then((res) => {
				setProducts(res.data.data)
			})
			.catch((err) => {
				console.log(err)
			})
	}, [api])

	useEffect(() => {
		socket.on('on-change', (data) => {
			// console.log(data);
			setProducts((prev) => {
				return prev.map((el) =>
					el._id === data.documentKey._id ? { ...el, ...data.updateDescription.updatedFields } : el
				)
			})
		})
	}, [])

	return (
		<div className="bg-white">
			<div className="mx-auto max-w-2xl py-4 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
				<div
					className={classNames(
						'mt-6 grid grid-cols-1',
						type ? '' : 'gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'
					)}
				>
					{products &&
						products.map((product) => (
							<div key={product._id} className="group relative">
								{!type && (
									<div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
										<img
											src={product.images[0]}
											alt={product.title}
											className="h-full w-full object-cover object-center lg:h-full lg:w-full"
										/>
									</div>
								)}
								<div className="mt-4 p-2 rounded shadow-md ease-in-out duration-300 hover:scale-105">
									<div className="flex justify-between">
										<p className="mt-1 text-sm text-gray-500">
											{new Date(product.time_start).toLocaleDateString()}
										</p>
										<p className="text-sm font-medium text-gray-900">{product.price}đ</p>
									</div>
									<div>
										<h3 className="text-sm text-gray-700">
											<Link to={product.slug} className="font-medium line-clamp-1">
												<span aria-hidden="true" className="absolute inset-0" />
												{product.title}
											</Link>
										</h3>
									</div>
									<div className='text-sm font-thin line-clamp-2'>{product.description}</div>
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	)
}

export default TourList
