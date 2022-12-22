import { useLocation, useNavigate } from "react-router-dom"
import { Navbar, Footer, Dashhboards, DNavbar } from "./components"
import { useSelector } from 'react-redux'
import { useEffect, useRef } from "react"
import socket from "../socket.io/socket.io"


const AppLayout = (props) => {

    const { children } = props
    const navigate = useNavigate()
    const location = useLocation()
    const user = useSelector((state) => state.auth.login.currentUser)
    // const socket = SocketIo()

    const keyRoutes = location.pathname.split('/')
    const isDashboard = keyRoutes.includes('dashboard')

    // const socketRef = useRef();

    // useEffect(() => {
    //     socketRef.current = socketIOClient.connect('API_HOST/')
    //     console.log('OK');
    // }, [])

    useEffect(() => {
        if (isDashboard) {
            if (!user) return navigate('/login')
            if (user?.permissions === 'User') {
                // alert('You do not have access to the management page!')
                return navigate('/')
            }
        }
    }, [])

    useEffect(() => {
        socket.on('on-change', (data) => {
            console.log('on-change: ', data);
        })
    })


    if (!isDashboard) {
        return (
            <>
                <Navbar />
                {children}
                <Footer />
            </>
        )
    }
    else {
        return (
            <div className="flex flex-row">
                <div className="basis-1/6 hidden sm:block">
                    <div className="fixed h-screen w-1/6 border-r border-gray-300 border-solid">
                        <Dashhboards />
                    </div>
                </div>
                <div className="sm:basis-5/6 basis-full">
                    <DNavbar />
                    <div className="h-12"></div>
                    {children}
                </div>
            </div>
        )
    }
}

export default AppLayout