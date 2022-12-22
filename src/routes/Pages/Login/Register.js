import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
	const navigate = useNavigate()
	const [data, setData] = useState({})
	const handleChangeData = (e) => {
		const { name, value } = e.target
		setData((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const handleSubmit = () => {
		axios
			.post('https://api.travels.games/api/v1/auth/register', data)
			.then((res) => {
				navigate('/login')
			})
			.catch((err) => {})
	}

	return (
		<div className='h-screen w-full bg-[url("./images/background/background.jpg")] bg-cover bg-center '>
			<div className="container mx-auto">
				<div className="pt-10 sm:pt-24 px-[20%]">
					<div className="md:grid md:grid-cols-3 md:gap-6">
						<div className="md:col-span-1">
							<div className="px-4 sm:px-0">
								<h3 className="text-lg font-medium leading-6 text-gray-900">Travel Register</h3>
								<p className="mt-1 text-sm text-gray-600">
									Use a permanent address where you can receive mail.
								</p>
							</div>
						</div>
						<div className="mt-5 md:col-span-2 md:mt-0">
							<form>
								<div className="overflow-hidden shadow sm:rounded-md">
									<form>
										<div className="px-4 py-5 sm:p-6">
											<div className="grid grid-cols-6 gap-6">
												{/* username */}
												<div className="col-span-6 sm:col-span-6">
													<label
														htmlFor="username"
														className="block text-sm font-medium text-black"
													>
														Username
													</label>
													<input
														type="text"
														name="username"
														id="username"
														autoComplete="username"
														value={data?.username}
														onChange={(e) => handleChangeData(e)}
														required
														className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 bg-white shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
													/>
												</div>
												{/* password */}
												<div className="col-span-6 sm:col-span-6">
													<label
														htmlFor="password"
														className="block text-sm font-medium text-black"
													>
														Password
													</label>
													<input
														type="password"
														name="password"
														id="password"
														autoComplete="password"
														value={data?.password}
														onChange={(e) => handleChangeData(e)}
														required
														className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 bg-white shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
													/>
												</div>
												{/* email */}
												<div className="col-span-6 sm:col-span-6">
													<label htmlFor="email" className="block text-sm font-medium text-black">
														Email
													</label>
													<input
														type="email"
														name="email"
														id="email"
														autoComplete="email"
														value={data?.email}
														onChange={(e) => handleChangeData(e)}
														required
														className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 bg-white shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
													/>
												</div>
											</div>
										</div>
										<div className="px-4 py-3 text-right sm:px-6">
											<button
												type={data?.username && data?.password && data?.email ? 'button' : 'submit'}
												onClick={handleSubmit}
												className="w-full inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
											>
												Login
											</button>
										</div>
									</form>
									<div className="px-4 py-3 text-right sm:px-6">
										<Link to={'/login'} className="text-white font-bold hover:underline">
											Login
										</Link>
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

export default Register
