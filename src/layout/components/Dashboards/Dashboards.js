import * as React from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Link, useNavigate } from 'react-router-dom'
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
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout(user, dispatch, navigate)
    }

    const dashboards = [
        { name: 'Dashboard', href: '/dashboard', current: true, icon: <CiHome size={18} /> },
        { name: 'Tour', href: '/dashboard/tour', current: true, icon: <CiRollingSuitcase size={18} /> },
        { name: 'Event', href: '/dashboard/event', current: false, icon: <CiCalendarDate size={18} /> },
        { name: 'Festival', href: '/dashboard/festival', current: false, icon: <CiRouter size={18} /> },
        { name: 'Tourist Attraction', href: '/dashboard/tourist_attraction', current: false, icon: <CiLocationOn size={18} /> },
    ]
    const [isDashboard, setIsDashhboard] = React.useState(true)

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
                                    src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
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
                    <Transition
                        as={React.Fragment}
                        enter='transition ease-out duration-100'
                        enterFrom='transform opacity-0 scale-95'
                        enterTo='transform opacity-100 scale-100'
                        leave='transition ease-in duration-75'
                        leaveFrom='transform opacity-100 scale-100'
                        leaveTo='transform opacity-0 scale-95'
                    >
                        <Menu.Items className='absolute left-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                            {/* Hi, user */}
                            <div className='py-1'>
                                {user ? (
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href='#'
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                                Hi, {user.username}
                                            </a>
                                        )}
                                    </Menu.Item>
                                ) : (
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href='#'
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                                Hi, User
                                            </a>
                                        )}
                                    </Menu.Item>
                                )}
                            </div>
                            {/* dashboard */}
                            <div className='py-1'>
                                {user && (
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href='#'
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                                My Profile
                                            </a>
                                        )}
                                    </Menu.Item>
                                )}
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href='#'
                                            className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block px-4 py-2 text-sm'
                                            )}
                                        >
                                            Settings
                                        </a>
                                    )}
                                </Menu.Item>
                                {user && (
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href='#'
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                                Cart
                                            </a>
                                        )}
                                    </Menu.Item>
                                )}
                                {user && (
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href='#'
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                                Order
                                            </a>
                                        )}
                                    </Menu.Item>
                                )}
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href='#'
                                            className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block px-4 py-2 text-sm'
                                            )}
                                        >
                                            History
                                        </a>
                                    )}
                                </Menu.Item>
                            </div>
                            {/* login - logout */}
                            <div className='py-1'>
                                {user ? (
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href='#'
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                                onClick={handleLogout}
                                            >
                                                Logout
                                            </a>
                                        )}
                                    </Menu.Item>
                                ) : (
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href='/login'
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                                Login
                                            </a>
                                        )}
                                    </Menu.Item>
                                )}

                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
            <hr className="my-4 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-6" />
            {/* Dashboard */}

            <div class="w-full text-gray-900 bg-white dark:text-white">
                <Link to={'#'}>
                    <button type="button" class="inline-flex relative items-center py-2 px-4 w-full text-sm font-medium border-b border-gray-200 hover:bg-gray-100 hover:text-green-500 focus:z-10  focus:bg-green-300 focus:text-black dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                        <CiUser size={18} />
                        <div className='pl-2 invisible sm:visible'>
                            Profile
                        </div>
                    </button>
                </Link>
                <div>
                    <button
                        type="button"
                        class="inline-flex relative items-center py-2 px-4 w-full text-sm font-medium border-b border-gray-200 hover:bg-gray-100 hover:text-green-500 focus:z-10  focus:bg-green-300 focus:text-black dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
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
                                <button type="button" class="pl-8 inline-flex relative items-center py-2 px-4 w-full text-sm font-medium hover:bg-gray-100 hover:text-green-500 focus:z-10  focus:bg-green-300 focus:text-black dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                                    {item.icon}
                                    <div className='pl-2 invisible sm:visible'>
                                        {item.name}
                                    </div>
                                </button>
                            </Link>
                        ))}
                    </div>
                </div>
                <button type="button" class="inline-flex relative items-center py-2 px-4 w-full text-sm font-medium border-b border-gray-200 hover:bg-gray-100 hover:text-green-500 focus:z-10  focus:bg-green-300 focus:text-black dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                    <CiBoxList size={18} />
                    <div className='pl-2 invisible sm:visible'>
                        Service
                    </div>
                </button>


                <button type="button" class="inline-flex relative items-center py-2 px-4 w-full text-sm font-medium hover:bg-gray-100 hover:text-green-500 focus:z-10  focus:bg-green-300 focus:text-black dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                    <svg aria-hidden="true" class="mr-2 w-4 h-4 fill-current" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M2 9.5A3.5 3.5 0 005.5 13H9v2.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 15.586V13h2.5a4.5 4.5 0 10-.616-8.958 4.002 4.002 0 10-7.753 1.977A3.5 3.5 0 002 9.5zm9 3.5H9V8a1 1 0 012 0v5z" clip-rule="evenodd"></path></svg>
                    Download
                </button>
            </div>

        </div>
    )
}

export default Dashhboards