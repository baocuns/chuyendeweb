import { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import axios from 'axios'
import { ADD_TO_CART_ROUTE, DETAIL_TOUR_ROUTE } from '../../../init'
import { formatVND } from '../../../utils/function'
import { useDispatch, useSelector } from 'react-redux'
import { callApiFailed, callApiStart, callApiSuccess } from '../../../redux/apiSlice'

const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


// props: nhận slug tour
export default function DetailTour({ props }) {
    const _id = "6368d67dea1b4f6441cdce3a";
    const user = useSelector((state) => state.auth.login.currentUser)
    // redux
    const api = useSelector((state) => state.api.api.currentApi)
    const dispatch = useDispatch()
    const [tour, setTour] = useState()
    const fetchData = async () => {
        try {
            const res = await axios.get(`${DETAIL_TOUR_ROUTE}/khu-di-tich-lich-su-vam-nhut-tao-bao-dep-trai-1671176173013`)
            setTour(res.data.data[0])
        } catch (error) {
            console.log(error);
        }
    }
    const handleAddToCart = async (_id) => {
        dispatch(callApiStart)
        axios.post('https://api.travels.games/api/v1/cart/store/' + _id, {
            a: 1
        },
            {
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "token": `Travel ${user.accessToken}`,
                    "_id": user._id
                }
            }
        )
            .then(res => {
                const { data, ...rest } = res.data
                dispatch(callApiSuccess(rest))
                console.log(res.data);
                api && alert(api.msg)
            })
            .catch(err => {
                const { data } = err.response
                dispatch(callApiFailed(data))
                api && alert(api.msg)
            })
    }

    useEffect(() => {
        fetchData();
    }, [])


    return (
        <div className="bg-white">
            <div className="pt-6">
                <div className="mx-auto max-w-2xl px-4 pt-10">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{tour?.title}</h1>
                </div>
                <div className="mx-auto max-w-2xl px-4 pt-10">

                    <h2 className="sr-only">{tour?.description}</h2>
                    <p className="text-3xl tracking-tight text-gray-900">{formatVND(tour?.price)}</p>

                    {/* Reviews */}
                    <div className="mt-6">
                        <h3 className="sr-only">Reviews</h3>
                        <div className="flex items-center">
                            <div className="flex items-center">
                                {[0, 1, 2, 3, 4].map((rating) => (
                                    <StarIcon
                                        key={rating}
                                        className={classNames(
                                            reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                                            'h-5 w-5 flex-shrink-0'
                                        )}
                                        aria-hidden="true"
                                    />
                                ))}
                            </div>
                            <p className="sr-only">{reviews.average} out of 5 stars</p>
                            <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                {reviews.totalCount} reviews
                            </a>
                        </div>
                    </div>
                    <button onClick={() => handleAddToCart(_id)} class="bg-blue-500 m-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Add to Cart
                    </button>

                </div>
                {/* Image gallery */}
                <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                    {tour && tour.images.map((item, index) => {
                        return (
                            <div className="aspect-w-3 aspect-h-2 hidden overflow-hidden rounded-lg lg:block m-3">
                                <img
                                    src={item}
                                    alt={item}
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>
                        )
                    })}
                </div>

                {/* Product info */}
                <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
                    {/* Options */}


                    <div className="lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
                        {/* Description and details */}
                        <div>
                            <b>Mô tả</b>
                            <div className="space-y-6">
                                <p className="text-base text-gray-900">{tour?.description}</p>
                            </div>
                        </div>
                    </div>
                    {/* Schedule */}
                    <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
                        {tour && tour.schedule.map((item, index) => {
                            return (
                                <div>
                                    <div className="space-y-6">
                                        <b className="text-base text-gray-900">{item.title}</b>
                                        <p>{item.details}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}