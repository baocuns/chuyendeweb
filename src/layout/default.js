import { Navbar, Footer, Dashhboards, DNavbar } from "./components"


const AppLayout = (props) => {

    const { children } = props
    const isAdmin = false

    if (!isAdmin) {
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
                <div className="basis-1/6">
                    <div className="fixed h-screen w-1/6">
                        <Dashhboards />
                    </div>
                </div>
                <div className="basis-5/6">
                    {/* <DNavbar /> */}
                    {children}
                </div>
            </div>
        )
    }
}

export default AppLayout