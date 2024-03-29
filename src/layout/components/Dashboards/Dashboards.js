import * as React from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../redux/apiURL'
import axios from 'axios';
// image
import bkktravel from '../../../images/logo/bkktravel.svg'
import bkktravel_logo from '../../../images/logo/bkklogo.svg'
import bkktravel_char from '../../../images/logo/bkktravel_char.svg'
// icon
import {
    CiHome,
    CiUser,
    CiCalendarDate,
    CiRouter,
    CiLocationOn,
    CiRollingSuitcase,
    CiBoxList,
    CiShoppingBasket
} from "react-icons/ci";
import {
    AiOutlineDown,
    AiOutlineRight,
} from "react-icons/ai";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Dashhboards = () => {
    const user = useSelector((state) => state.auth.login.currentUser)
    const profile = JSON.parse(localStorage.getItem('profile'))
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const location = useLocation();
    const keyRoutes = location.pathname.split('/')

    const handleLogout = () => {
        logout(user, dispatch, navigate)
    }

    const dashboards = [
        { name: 'Dashboard', href: '/dashboard', current: false, icon: <CiHome size={18} /> },
        { name: 'Tour', href: '/dashboard/tour', current: keyRoutes.some(key => key === 'tour'), icon: <CiRollingSuitcase size={18} /> },
        { name: 'Event', href: '/dashboard/event', current: keyRoutes.some(key => key === 'event'), icon: <CiCalendarDate size={18} /> },
        { name: 'Festival', href: '/dashboard/festival', current: keyRoutes.some(key => key === 'festival'), icon: <CiRouter size={18} /> },
        { name: 'Orders', href: '/dashboard/orders', current: keyRoutes.some(key => key === 'orders'), icon: <CiShoppingBasket size={18} /> },
        { name: 'Tourist Attraction', href: '/dashboard/tourist_attraction', current: keyRoutes.some(key => key === 'tourist_attraction'), icon: <CiLocationOn size={18} /> },
    ]
    const [isDashboard, setIsDashhboard] = React.useState(false)

    const handleClickDashboard = () => {
        setIsDashhboard(!isDashboard)
    }

    return (
        <div className='w-full'>
            {/* logo */}
            <div className='flex flex-shrink-0 items-center justify-center pt-6'>
                <img
                    className='block h-8 w-auto lg:hidden'
                    src={bkktravel_logo}
                    alt='BKK Travel'
                />
                <img
                    className='hidden h-8 w-auto lg:block'
                    src={bkktravel_char}
                    alt='BKK Travel'
                />
            </div>
            {/* profile */}
            <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 pt-4'>
                {/* Profile dropdown */}
                <Menu as='div' className='relative ml-3'>
                    {user ? (
                        <div className='static'>
                            <Menu.Button className='flex rounded-full bg-gray-800 text-sm focus:outline-none'>
                                <span className='sr-only'>Open user menu</span>
                                <img
                                    className='h-12 w-12 rounded-full'
                                    src={profile?.images[0]}
                                    alt=''
                                />
                                <div className='absolute h-3 w-3 bg-red-500 bottom-0 right-0 rounded-full border-solid border-2 border-white' />
                            </Menu.Button>
                        </div>
                    ) : (
                        <div className='static'>
                            <Menu.Button className='flex rounded-full bg-gray-800 text-sm focus:outline-none'>
                                <span className='sr-only'>Open user menu</span>
                                <img
                                    className='h-12 w-12 rounded-full'
                                    src='https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745'
                                    alt=''
                                />
                                <div className='absolute h-3 w-3 bg-red-500 bottom-0 right-0 rounded-full border-solid border-2 border-white' />
                            </Menu.Button>
                        </div>
                    )}
                </Menu>
            </div>
            <hr className="my-4 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-6" />
            {/* Dashboard */}

            <div class="w-full text-gray-900 bg-white dark:text-white">
                <Link to={'/dashboard/profile'}>
                    <button type="button" class="inline-flex relative items-center py-2 px-4 w-full text-sm font-medium border-b border-gray-200 hover:bg-gray-100 hover:text-green-500 focus:z-10  focus:bg-green-500 focus:text-black dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                        <CiUser size={18} />
                        <div className='pl-2 invisible sm:visible'>
                            Profile
                        </div>
                    </button>
                </Link>
                <div>
                    <button
                        type="button"
                        class="inline-flex relative items-center py-2 px-4 w-full text-sm font-medium border-b border-gray-200 hover:bg-gray-100 hover:text-green-500 focus:z-10  focus:bg-green-500 focus:text-white dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
                        onClick={handleClickDashboard}
                    >
                        <CiHome size={18} />
                        <div className='pl-2 invisible sm:visible'>
                            Dashboard
                        </div>
                        <div className='absolute right-0 pr-2'>
                            {isDashboard ? <AiOutlineRight size={18} /> : <AiOutlineDown size={18} />}
                        </div>
                    </button>
                    <div hidden={isDashboard}>
                        {dashboards.map(item => (
                            <Link to={item.href}>
                                <button type="button" class={classNames(
                                    "pl-8 inline-flex relative items-center py-2 px-4 w-full text-sm font-medium hover:bg-gray-100 hover:text-green-500 focus:z-10  focus:bg-green-500 focus:text-white dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white",
                                    item.current ? 'bg-green-500 text-white': ''
                                )}>
                                    {item.icon}
                                    <div className='pl-2 invisible sm:visible'>
                                        {item.name}
                                    </div>
                                </button>
                            </Link>
                        ))}
                    </div>
                </div>
                <button type="button" class="inline-flex relative items-center py-2 px-4 w-full text-sm font-medium border-b border-gray-200 hover:bg-gray-100 hover:text-green-500 focus:z-10  focus:bg-green-500 focus:text-white dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                    <CiBoxList size={18} />
                    <div className='pl-2 invisible sm:visible'>
                        Service
                    </div>
                </button>


                <button type="button" class="inline-flex relative items-center py-2 px-4 w-full text-sm font-medium hover:bg-gray-100 hover:text-green-500 focus:z-10  focus:bg-green-500 focus:text-white dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                    <svg aria-hidden="true" class="mr-2 w-4 h-4 fill-current" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M2 9.5A3.5 3.5 0 005.5 13H9v2.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 15.586V13h2.5a4.5 4.5 0 10-.616-8.958 4.002 4.002 0 10-7.753 1.977A3.5 3.5 0 002 9.5zm9 3.5H9V8a1 1 0 012 0v5z" clip-rule="evenodd"></path></svg>
                    Download
                </button>
            </div>

        </div>
    )
}

export default Dashhboards