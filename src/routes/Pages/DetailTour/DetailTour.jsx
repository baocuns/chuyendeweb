import { useEffect, useState } from 'react'
import axios from 'axios'
import { formatVND } from '../../../utils/function'
import { useDispatch, useSelector } from 'react-redux'
import { callApiFailed, callApiStart, callApiSuccess } from '../../../redux/apiSlice'
import { useLocation } from 'react-router-dom'
import { Carousel } from 'antd';
import { Rate } from 'antd';

const contentStyle = {
    height: '500px',
    width: '100%',
    color: '#fff',
    lineHeight: '300px',
    textAlign: 'center',
    background: '#364d79',
};

export default function DetailTour() {
    const dispatch = useDispatch()
    const { state } = useLocation();
    const { tourdata } = state || {};
    const [tour, setTour] = useState()
    const user = useSelector((state) => state.auth.login.currentUser)
    const api = useSelector((state) => state.api.api.currentApi)
    const ModalRating = () => {
        return (
            <>{/* The button to open modal */}
                {/* <label htmlFor="my-modal-5" className="btn">open modal</label> */}

                {/* Put this part before </body> tag */}
                <input type="checkbox" id="my-modal-5" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box w-11/12 max-w-5xl">
                        <h3 className="font-bold text-lg">Congratulations random Internet user!</h3>
                        <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
                        <div className="modal-action">
                            <label htmlFor="my-modal-5" className="btn">Yay!</label>
                        </div>
                    </div>
                </div></>
        )
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
                alert('Tour added!!!')
                console.log(res.data);
                api && alert(api.msg)
            })
            .catch(err => {
                const { data } = err.response
                dispatch(callApiFailed(data))
                alert('Tour exist!!!')
                api && alert(api.msg)
            })
    }

    useEffect(() => {
        console.log("_id: ", tourdata._id, '---', tourdata.title);
        setTour(tourdata)
    }, [])

    return (
        <div className="bg-white">
            <ModalRating />
            <div className="container md:container md:mx-auto">
                <Carousel autoplay>
                    {tour && tour.images.map((item, index) => {
                        return (
                            <div
                            >
                                <img
                                    style={contentStyle}
                                    src={item}
                                    alt={item}
                                />
                            </div>

                        )
                    })}
                </Carousel>
                <div className="max-w-2xl px-4 pt-10">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{tour?.title}</h1>
                </div>
                <div className="max-w-2xl px-4 pt-10">

                    <h2 className="sr-only">{tour?.description}</h2>
                    <p className="text-3xl tracking-tight text-gray-900">{formatVND(tour?.price)}</p>

                    {/* Reviews */}
                    <label htmlFor="my-modal-5" className="mt-6">
                        <p>255 Reviews</p>
                        <Rate disabled={true} defaultValue={5} tooltips={["1", "2", "3"]} />
                    </label>
                    <button onClick={() => handleAddToCart(tour._id)} class="bg-blue-500 m-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Add to Cart
                    </button>
                </div>

                {/* Product info */}
                <div className="mx-auto max-w-7xl px-4 pt-10 pb-16">
                    {/* Schedule */}
                    <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
                        <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
                            <div className="collapse-title text-xl font-medium">
                                Mô tả
                            </div>
                            <div className="collapse-content">
                                <p>{tour?.description}</p>
                            </div>
                        </div>
                        {tour && tour.schedule.map((item, index) => {
                            return (
                                <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
                                    <div className="collapse-title text-xl font-medium">
                                        {item.title}
                                    </div>
                                    <div className="collapse-content">
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