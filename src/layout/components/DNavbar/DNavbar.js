import { Route, Link, Routes, useLocation, useNavigate } from 'react-router-dom';
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../redux/apiURL'

// icon
import {
    CiHome,
    CiUser,
    CiCalendarDate,
    CiRouter,
    CiLocationOn,
    CiRollingSuitcase,
    CiBoxList,
    CiGrid41,
    CiBellOn,
    CiChat2,
    CiLogout,
    CiShoppingBasket
} from "react-icons/ci";
import {
    BsChevronRight,
} from "react-icons/bs";

const types = [
    {
        type: 'tour',
        link: '/dashboard/tour',
        icon: <CiRollingSuitcase size={18} />,
    },
    {
        type: 'event',
        link: '/dashboard/event',
        icon: <CiCalendarDate size={18} />,
    },
    {
        type: 'festival',
        link: '/dashboard/festival',
        icon: <CiRouter size={18} />,
    },
    {
        type: 'orders',
        link: '/dashboard/orders',
        icon: <CiShoppingBasket size={18} />,
    },
    {
        type: 'tourist_attraction',
        link: '/dashboard/tourist_attraction',
        icon: <CiLocationOn size={18} />,
    },
]


const DNavbar = () => {
    const user = useSelector((state) => state.auth.login.currentUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout(user, dispatch, navigate)
    }

    const location = useLocation();
    const keyRoutes = location.pathname.split('/')

    return (
        <div className='flex fixed h-12 w-full sm:w-5/6 bg-white z-10 content-center'>
            <button type='button' className='ml-8 hover:text-green-500'>
                <CiGrid41 size={24} />
            </button>
            <Link to={'/dashboard'} className='flex content-center ml-4'>
                <button type='button' className='hover:text-green-500'>
                    <CiHome size={18} />
                </button>
            </Link>
            <button className='ml-2'>
                <BsChevronRight size={12} />
            </button>
            {keyRoutes.map(e => {
                return types.map(tp => {
                    if (tp.type === e) {
                        return (
                            <Link to={tp.link} className='flex content-center ml-2'>
                                <button type='button' className='hover:text-green-500'>
                                    {tp.icon}
                                </button>
                            </Link>
                        )
                    }
                })
            })}

            {/* notification */}
            <div className='flex w-full justify-end mr-8'>
                <button type='button' className='hover:text-green-500'>
                    <CiBellOn size={24} />
                </button>
                <button type='button' className='ml-4 hover:text-green-500'>
                    <CiChat2 size={24} />
                </button>
                <button type='button' className='ml-4 hover:text-green-500'
                    onClick={handleLogout}
                >
                    <CiLogout size={24} />
                </button>
            </div>
        </div >
    )
}

export default DNavbar