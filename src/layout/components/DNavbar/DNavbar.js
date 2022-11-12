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
} from "react-icons/ci";
import {
    BsChevronRight,
} from "react-icons/bs";



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
        <div className='flex fixed h-12 w-5/6 bg-white z-10 content-center'>
            <button type='button' className='ml-8 hover:text-green-500'>
                <CiGrid41 size={24} />
            </button>
            {keyRoutes.map(e => {
                if (e === 'dashboard') {
                    return (
                        <>
                            <Link to={'/dashboard'} className='flex content-center ml-4'>
                                <button type='button' className='hover:text-green-500'>
                                    <CiHome size={18} />
                                </button>
                            </Link>
                            <button className='ml-2'>
                                <BsChevronRight size={12} />
                            </button>
                        </>
                    )
                }
                if (e === 'tour') {
                    return (
                        <Link to={'/dashboard/tour'} className='flex content-center ml-2'>
                            <button type='button' className='hover:text-green-500'>
                                <CiRollingSuitcase size={18} />
                            </button>
                        </Link>
                    )
                }
                if (e === 'event') {
                    return (
                        <Link to={'/dashboard/event'} className='flex content-center ml-2'>
                            <button type='button' className='hover:text-green-500'>
                                <CiCalendarDate size={18} />
                            </button>
                        </Link>
                    )
                }
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