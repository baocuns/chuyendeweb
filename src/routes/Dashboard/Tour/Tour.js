import * as React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// component
import TourList from './TourList'
import ModalAdd from './ModalAdd'

// icon
import * as Ci from 'react-icons/ci'
import { useState } from 'react'
import { callApiClear } from '../../../redux/apiSlice'
import { useEffect } from 'react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Tour = () => {
	// redux
	const api = useSelector((state) => state.api.api.currentApi)
	const dispatch = useDispatch()

	const [plus, setPlus] = React.useState(false)
	const [isAlert, setIsAlert] = useState(api ? false : true)

	// handle
	const handlePlus = () => {
		setPlus(!plus)
	}
	const handleAlertClost = () => {
		setIsAlert(true)
		dispatch(callApiClear())
	}

	useEffect(() => {
		if (api) {
			setIsAlert(false)
		}
	}, [api])

	const [isListGrid, setIsListGird] = useState(localStorage.getItem('isListGrid'))

    const handleChangeTypeList = (value) => {
        setIsListGird(value)
        localStorage.setItem('isListGrid', isListGrid)
    }

	return (
		<div>
			<div className="flex justify-end mr-8 mt-4">
				<div className="w-full ml-8">
					<h2 className="sm:text-sm md:text-2xl font-bold tracking-tight text-gray-900">
						Manage travel tours
					</h2>
				</div>
				<div className="inline-flex rounded-md shadow-sm mr-2" role="group">
					<button
						type="button"
						className={classNames(
                            "py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-green-400 focus:z-10 focus:bg-green-400 focus:text-white",
                            isListGrid ? 'bg-green-400 text-white': ''
                        )}
						onClick={() => handleChangeTypeList(true)}
					>
						<Ci.CiBoxList size={24} />
					</button>
					<button
						type="button"
						className={classNames(
                            "py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-r-md border border-gray-200 hover:bg-gray-100 hover:text-green-400 focus:z-10 focus:bg-green-400 focus:text-white",
                            !isListGrid ? 'bg-green-400 text-white': ''
                        )}
						onClick={() => handleChangeTypeList(false)}
					>
						<Ci.CiGrid41 size={24} />
					</button>
				</div>

				<button
					className="py-2 px-4 bg-green-400 hover:bg-green-500 flex justify-center items-center rounded"
					onClick={handlePlus}
				>
					<Ci.CiSquarePlus size={24} color={'white'} />
				</button>
			</div>

			{/* alert */}
			<div hidden={isAlert}>
				<div
					class={
						api?.status
							? 'flex mx-4 my-4 bg-green-100 rounded-lg py-5 px-6 mb-4 text-base text-green-700 mb-3'
							: 'flex mx-4 my-4 bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mb-3'
					}
					role="alert"
				>
					<div className="w-16">
						<Ci.CiSquareCheck size={24} />
					</div>
					<div className="w-full font-medium">
						{api?.msg}
						<p className="text-sm font-light">A simple success alert - check it out!</p>
					</div>
					<div className="flex w-full justify-end items-center">
						<button className="hover:text-red-500" onClick={handleAlertClost}>
							<Ci.CiSquareRemove size={24} />
						</button>
					</div>
				</div>
			</div>
			<TourList type={isListGrid} />
			<ModalAdd plus={plus} handlePlus={handlePlus} />
		</div>
	)
}

export default Tour
