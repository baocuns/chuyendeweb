import './_.css'
import loading from '../../images/img/loading.gif'

const Loader = () => {
    return (
        <div className='fixed flex items-center justify-center z-50 inset-0 bg-gray-200/30'>
            <img src={loading} className='h-32 w-32'/>
        </div>
    )
}

export default Loader