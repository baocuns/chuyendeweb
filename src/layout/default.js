import { Navbar, Footer } from "./components"


const AppLayout = (props) => {

    const { children } = props

    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}

export default AppLayout