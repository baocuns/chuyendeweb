import { useEffect, useState } from 'react'
import axios from 'axios'
import { formatTime, formatVND, handleAddToCart, sendRatingAction } from '../../../utils/function'
import { useDispatch, useSelector } from 'react-redux'
import { callApiFailed, callApiStart, callApiSuccess } from '../../../redux/apiSlice'
import { useLocation } from 'react-router-dom'
import { Avatar, Breadcrumb, Carousel, Image } from 'antd';
import { Rate } from 'antd';
import { showAllRatingRoute } from '../../../init'
import { Rating } from '@mui/material'
import { ToastContainer } from 'react-toastify'


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

    let rating = 5;
    let ratingContent = "";
    const [ratingData, setRatingData] = useState(null);
    const { state } = useLocation();
    const { tourdata } = state || {};
    const [tour, setTour] = useState()
    const user = useSelector((state) => state.auth.login.currentUser)
    const api = useSelector((state) => state.api.api.currentApi)
    const loadRating = async () => {
        try {
            const res = await axios.get(showAllRatingRoute + "/" + tourdata._id);
            setRatingData(res.data.data);
            console.log('rating data: ', res.data.data);
        } catch (error) {
            console.log('ERROR: ', error);
        }
    }
    const ModalRating = () => {
        return (
            <>{/* The button to open modal */}
                <input type="checkbox" id="my-modal-5" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box w-11/12 max-w-5xl">
                        <label htmlFor="my-modal-5" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                        <h3 className="font-bold text-lg">{tourdata.title}</h3>
                        <div className="rating" onChange={(e) => {
                            rating = e.target.value
                            console.log(rating);
                        }}>
                            <input type="radio" name="rating-1" className="mask mask-star bg-yellow-300" value={1} />
                            <input type="radio" name="rating-1" className="mask mask-star bg-yellow-300" value={2} />
                            <input type="radio" name="rating-1" className="mask mask-star bg-yellow-300" value={3} />
                            <input type="radio" name="rating-1" className="mask mask-star bg-yellow-300" value={4} />
                            <input type="radio" name="rating-1" className="mask mask-star bg-yellow-300" value={5} />
                        </div>
                        <div>
                            <textarea
                                onChange={(e) => {
                                    ratingContent = e.target.value
                                    console.log(e.target.value)
                                }}
                                class="
                                form-control
                                block
                                w-full
                                px-3
                                py-1.5
                                text-base
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding
                                border border-solid border-gray-300
                                rounded
                                transition
                                ease-in-out
                                m-0
                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            "
                                id="exampleFormControlTextarea1"
                                rows="3"
                                placeholder="Your message"
                            ></textarea>
                        </div>
                        <div className="modal-action">
                            <label onClick={() => sendRating(rating, ratingContent)} htmlFor="my-modal-5" className="btn">Rating</label>
                        </div>
                        {
                            ratingData && ratingData.ratings.map((rate) => {
                                console.log(rate.profile[0].images[0]);
                                return (
                                    <>
                                        {/* <div>
                                            <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>U</Avatar>
                                            <p>{rate.content}</p>
                                        </div> */}
                                        <div class="grid grid-flow-col auto-cols-max">
                                            <div className="avatar">
                                                <div className="w-12 rounded-full">
                                                    <img src={rate.profile[0].images[0]} />
                                                </div>
                                            </div>
                                            <div>
                                                <div>{rate.profile[0].fullname}</div>
                                                <Rating name="read-only" value={rate.rate} readOnly />
                                            </div>
                                            <i>{formatTime(rate.updatedAt)}</i>
                                        </div>
                                        <p>{rate.content}</p>
                                        <br />
                                    </>
                                )
                            })
                        }

                    </div>
                </div>

            </>
        )
    }

    const sendRating = async (rating, ratingContent) => {
        // navigation.goBack()
        console.log('Hello');
        console.log('rating number: ', rating);//number
        console.log('rating content: ', ratingContent);
        console.log('tour id: ', tourdata._id);//
        console.log('accessToken: ', user.accessToken);//
        console.log('userId: ', user._id);//
        if (!ratingContent || ratingContent == "") {
            alert('You must write rating content');
            return;
        }
        // call api
        const data = await sendRatingAction(user.accessToken, user._id, rating, ratingContent, tourdata._id);
        console.log("data: ", data);
        if (!data.status) {
            alert('Bạn đã đánh giá rồi');
        } else {
            alert('Cảm ơn bạn đã đánh giá');
        }
    }



    useEffect(() => {
        setTour(tourdata)
        loadRating();
    }, [])

    return (
        <div className="bg-white">
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <ModalRating />
            <div className="container md:container md:mx-auto">
                <Breadcrumb>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href="">Hà Giang</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href="">Detail</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>{tourdata.title}</Breadcrumb.Item>
                </Breadcrumb>
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
                    <button onClick={() => handleAddToCart(tour._id, user.accessToken, user._id, dispatch)} class="bg-blue-500 m-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
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