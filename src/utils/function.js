import axios from "axios";
import { sendRatingRoute } from "../init";
import TimeAgo from 'javascript-time-ago'
import vi from 'javascript-time-ago/locale/vi'
import { callApiFailed, callApiStart, callApiSuccess } from "../redux/apiSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

TimeAgo.addDefaultLocale(vi)
const timeAgo = new TimeAgo('vi-VN')

const formatVND = (money) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money);
}

const sendRatingAction = async (
    accessToken,
    userID,
    numberStar,
    ratingCotent,
    tourID,
) => {
    try {
        const res = await axios.post(
            sendRatingRoute,
            {
                content: ratingCotent,
                rate: numberStar,
                parent_id: tourID,
            },
            {
                headers: {
                    _id: userID,
                    token: `Travel ${accessToken}`,
                },
            },
        );
        return res;
    } catch (error) {
        return error.response.data;
    }
};

const formatTime = (time) => {
    const milisecond = ((new Date()).getTime()) - (new Date(time).getTime());
    return timeAgo.format(Date.now() - milisecond, 'round')
}

const handleAddToCart = async (_id, accessToken, userID, dispatch) => {
    dispatch(callApiStart)
    axios.post('https://api.travels.games/api/v1/cart/store/' + _id, {
        a: 1
    },
        {
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                "token": `Travel ${accessToken}`,
                "_id": userID
            }
        }
    )
        .then(res => {
            const { data, ...rest } = res.data
            dispatch(callApiSuccess(rest))
            notifySuccess();
        })
        .catch(err => {
            const { data } = err.response
            dispatch(callApiFailed(data))
            notifyError()
        })
}

const notifySuccess = () => toast.success('🦄 You are added tour success!', {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
});

const notifyError = () => toast.warn('😲 Tour is exist, please check in your cart!', {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
});

export { formatVND, sendRatingAction, formatTime, handleAddToCart, notifySuccess, notifyError }