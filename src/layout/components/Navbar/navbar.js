import { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../redux/apiURL'

const navigation = [
    { name: 'Home', href: '/home', current: true },
    { name: 'Discovering', href: '#', current: false },
    { name: 'Blog', href: '#', current: false },
    { name: 'Calendar', href: '#', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
    const user = useSelector((state) => state.auth.login.currentUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout(user, dispatch, navigate)
    }

    return (
        <Disclosure as='nav' className='bg-green-100'>
            {({ open }) => (
                <>
                    <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
                        <div className='relative flex h-16 items-center justify-between'>
                            <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                                {/* Mobile menu button*/}
                                <Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-green-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                                    <span className='sr-only'>Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                                    ) : (
                                        <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
                                <div className='flex flex-shrink-0 items-center'>
                                    <img
                                        className='block h-8 w-auto lg:hidden'
                                        src='./images/logo/bkktravel_logo.svg'
                                        alt='BKK Travel'
                                    />
                                    <img
                                        className='hidden h-8 w-auto lg:block'
                                        src='./images/logo/bkktravel_char.svg'
                                        alt='BKK Travel'
                                    />
                                </div>
                                <div className='hidden sm:ml-6 sm:block'>
                                    <div className='flex space-x-4'>
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                to={item.href}
                                                className={classNames(
                                                    item.current ? 'bg-green-300' : 'text-black hover:bg-green-300 hover:text-white',
                                                    'px-3 py-2 rounded-md text-sm font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* notification - profiles */}
                            <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                                <button
                                    type='button'
                                    className='static rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
                                >
                                    <span className='sr-only'>View notifications</span>
                                    <BellIcon className='h-6 w-6' aria-hidden='true' />
                                </button>

                                {/* Profile dropdown */}
                                <Menu as='div' className='relative ml-3'>
                                    {user ? (
                                        <div className='static'>
                                            <Menu.Button className='flex rounded-full bg-gray-800 text-sm focus:outline-none'>
                                                <span className='sr-only'>Open user menu</span>
                                                <img
                                                    className='h-8 w-8 rounded-full'
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
                                                    className='h-8 w-8 rounded-full'
                                                    src='https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745'
                                                    alt=''
                                                />
                                                <div className='absolute h-3 w-3 bg-red-500 bottom-0 right-0 rounded-full border-solid border-2 border-white' />
                                            </Menu.Button>
                                        </div>
                                    )}
                                    <Transition
                                        as={Fragment}
                                        enter='transition ease-out duration-100'
                                        enterFrom='transform opacity-0 scale-95'
                                        enterTo='transform opacity-100 scale-100'
                                        leave='transition ease-in duration-75'
                                        leaveFrom='transform opacity-100 scale-100'
                                        leaveTo='transform opacity-0 scale-95'
                                    >
                                        <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
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
                                                            <Link
                                                                to={'/dashboard/tour'}
                                                                className={classNames(
                                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                    'block px-4 py-2 text-sm'
                                                                )}
                                                            >
                                                                Dashboard
                                                            </Link>
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
                                                            <Link
                                                                to={'/login'}
                                                                className={classNames(
                                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                    'block px-4 py-2 text-sm'
                                                                )}
                                                            >
                                                                Login
                                                            </Link>
                                                        )}
                                                    </Menu.Item>
                                                )}

                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                            {user && (
                                <div className='ml-2 text-bold font-medium text-green-500'>Hi, {user.username}</div>
                            )}
                        </div>
                    </div>

                    <Disclosure.Panel className='sm:hidden'>
                        <div className='space-y-1 px-2 pt-2 pb-3'>
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as='a'
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-green-300 hover:text-white',
                                        'block px-3 py-2 rounded-md text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}