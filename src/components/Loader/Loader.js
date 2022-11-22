import './_.css'

const Loader = () => {
    return (
        <div className='fixed flex items-center justify-center z-50 inset-0 bg-gray-200/50'>
            <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default Loader