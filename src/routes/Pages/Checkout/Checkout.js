import AxiosJWT from '../../../axios';
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../../../redux/authSlice';

const Checkout = () => {
    // redux
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.login.currentUser)

    const [checkPay, setCheckPay] = useState(true)

    const handlePayment = () => {
        const data = {
            amount: 50000,
            info: 'Thanh toán qua ví MoMo',
            items: [
                '636800309af22da228b03290',
                '6368092da2d5b24ce07a64dc'
            ]
        }
        const Axios = AxiosJWT(user, dispatch, loginSuccess)
        Axios.post('http://localhost/api/v1/order/checkout', data)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div
            className="
				flex
				justify-center
				items-center
				2xl:container 2xl:mx-auto
				lg:py-16
				md:py-12
				py-9
				px-4
				md:px-6
				lg:px-20
				xl:px-44
			"
        >
            <div
                className="
					flex
					w-full
					sm:w-9/12
					lg:w-full
					flex-col
					lg:flex-row
					justify-center
					items-center
					lg:space-x-10
					2xl:space-x-36
					space-y-12
					lg:space-y-0
				"
            >
                <div className="flex w-full flex-col justify-start items-start">
                    <div className="">
                        <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Check out</p>
                    </div>
                    <div className="mt-2">
                        <a
                            href="/"
                            className="
								text-base
								leading-4
								focus:outline-none focus:underline
								hover:underline hover:text-gray-800
								text-gray-600
							"
                        >
                            Back to my bag
                        </a>
                    </div>
                    <form>
                        <div className="mt-8">
                            <div className="">
                                <label htmlFor="check-momo" className="flex justify-center items-center hover:bg-gray-300 p-2 bg-gray-200 rounded cursor-pointer">
                                    <input required id="check-momo"
                                        type="checkbox"
                                        checked={checkPay}
                                        class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mx-2"
                                        onChange={() => setCheckPay(!checkPay)}
                                    />
                                    <img src="https://business.momo.vn/assets/landingpage/img/931b119cf710fb54746d5be0e258ac89-logo-momo.png"
                                        className="object-cover h-16"
                                    />
                                    <p className="p-2">Payment by MOMO</p>
                                </label>

                            </div>
                        </div>
                        <div className="mt-12">
                            <button
                                type={`${checkPay ? 'button' : 'submit'}`}
                                className="py-2 px-8 bg-red-500 hover:bg-red-600 rounded text-white"
                                onClick={checkPay ? handlePayment : ''}
                            >
                                Payment
                            </button>
                        </div>
                    </form>

                </div>

                <div className="flex flex-col justify-start items-start bg-gray-50 w-full p-6 md:p-14">
                    <div>
                        <h1 className="text-2xl font-semibold leading-6 text-gray-800">Order Summary</h1>
                    </div>
                    <div className="flex mt-7 flex-col items-end w-full space-y-6">
                        <div className="flex justify-between w-full items-center">
                            <p className="text-lg leading-4 text-gray-600">Total items</p>
                            <p className="text-lg font-semibold leading-4 text-gray-600">20</p>
                        </div>
                        <div className="flex justify-between w-full items-center">
                            <p className="text-lg leading-4 text-gray-600">Total Charges</p>
                            <p className="text-lg font-semibold leading-4 text-gray-600">$2790</p>
                        </div>
                        <div className="flex justify-between w-full items-center">
                            <p className="text-lg leading-4 text-gray-600">Shipping charges</p>
                            <p className="text-lg font-semibold leading-4 text-gray-600">$90</p>
                        </div>
                        <div className="flex justify-between w-full items-center">
                            <p className="text-lg leading-4 text-gray-600">Sub total</p>
                            <p className="text-lg font-semibold leading-4 text-gray-600">$3520</p>
                        </div>
                    </div>
                    <div className="flex justify-between w-full items-center mt-32">
                        <p className="text-xl font-semibold leading-4 text-gray-800">Estimated Total</p>
                        <p className="text-lg font-semibold leading-4 text-gray-800">$2900</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
