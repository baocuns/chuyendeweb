import { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import AxiosJWT from "../../../axios"
import { API_HOST } from "../../../init"
import { callApiClear, callApiFailed, callApiStart, callApiSuccess } from "../../../redux/apiSlice"
import { loginSuccess } from "../../../redux/authSlice"



const Orders = () => {
    // redux
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.auth.login.currentUser)
    const api = useSelector((state) => state.api.api)
    const [isLoader, setIsLoader] = useState(api?.isFetching)
    // loader
    useEffect(() => {
        setIsLoader(api?.isFetching)
        !api?.isFetching && dispatch(callApiClear())
    }, [api])

    // in
    const [orders, setOrders] = useState()

    useEffect(() => {
        if (user) {
            dispatch(callApiStart())
            const Axios = AxiosJWT(user, dispatch, loginSuccess)
            Axios.post(`${API_HOST}/api/v1/order/show/all`)
                .then(res => {
                    dispatch(callApiSuccess())
                    setOrders(res.data.data)
                })
                .catch(err => {
                    console.log(err);
                    const { data } = err?.response
                    dispatch(callApiFailed(data))
                })
        }
    }, [])

    return (
        <div className="p-8 md:p-16">
            {orders && orders.map((order, index) => (
                <div key={index} className="border w-full p-4 md:p-8 rounded my-4">
                    <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-1/2">
                            <div className="flex justify-start w-full items-center mt-4">
                                <p className="text-xl font-bold leading-4 text-gray-800">Thông tin người dùng</p>
                            </div>
                            <div className="flex my-4 flex-col items-end w-full space-y-2">
                                <div className="flex justify-start w-full items-center">
                                    <p className="text-lg leading-4 mr-4 text-black">Họ & Tên:</p>
                                    <p className="text-lg font-thin leading-4 text-black">Nguyễn Văn Bảo</p>
                                </div>
                                <div className="flex justify-start w-full items-center">
                                    <p className="text-lg leading-4 mr-4 text-black">Email:</p>
                                    <p className="text-lg font-thin leading-4 text-black">baonguyen2001aa@gmail.com</p>
                                </div>
                                <div className="flex justify-start w-full items-center">
                                    <p className="text-lg leading-4 mr-4 text-black">Số điện thoại:</p>
                                    <p className="text-lg font-thin leading-4 text-black">0326447480</p>
                                </div>
                                <div className="flex justify-start w-full items-center">
                                    <p className="text-lg leading-4 mr-4 text-black">Địa chỉ:</p>
                                    <p className="text-lg font-thin leading-4 text-black">53 Võ Văn Ngân, TP. Thủ Đức, TP. Hồ Chí Minh</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2">
                            <div>
                                <h1 className="text-2xl font-bold leading-6 text-gray-800">Thông tin đơn hàng</h1>
                            </div>
                            <div className="flex my-4 flex-col items-end w-full space-y-2">
                                <div className="flex justify-start w-full items-center">
                                    <p className="text-lg leading-4 mr-4 text-black">Date :</p>
                                    <p className="text-lg font-thin leading-4 text-black">{new Date(order.createdAt).toLocaleString()}</p>
                                </div>
                                <div className="flex justify-start w-full items-center">
                                    <p className="text-lg leading-4 mr-4 text-black">Mô tả:</p>
                                    <p className="text-lg font-thin leading-4 text-black">{order.info}</p>
                                </div>
                                <div className="flex justify-start w-full items-center">
                                    <p className="text-lg leading-4 mr-4 text-black">Trạng thái:</p>
                                    <p
                                        className={`text-lg leading-4 font-bold ${order.statusCode === '00' ? 'text-green-500' : 'text-red-500'}`}
                                    >
                                        {order.status}
                                    </p>
                                </div>
                                <div className="flex justify-start w-full items-center">
                                    <p className="text-lg leading-4 mr-4 text-black">Tổng số sản phẩm:</p>
                                    <p className="text-lg font-thin leading-4 text-black">{order.items.length}</p>
                                </div>
                                <div className="flex justify-start w-full items-center">
                                    <p className="text-lg leading-4 mr-4 text-black">Tổng số tiền:</p>
                                    <p className="text-lg font-thin leading-4 text-black">{order.amount.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex justify-end">
                        <Link to={`/order/${order._id}`}>
                            <p className="text-blue-500 hover:text-blue-600"><u>Details</u></p>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Orders