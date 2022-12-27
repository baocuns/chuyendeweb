import axios from "axios";
import { sendRatingRoute } from "../init";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

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

export { formatVND, sendRatingAction, formatTime }