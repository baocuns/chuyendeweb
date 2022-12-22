import './_.css'
import anime from '../../images/img/anime.gif'
import { useEffect, useState } from 'react'

const Loader = () => {
    
    return (
        <div className='fixed flex items-center justify-center z-50 inset-0 bg-gray-200/30'>
            <img src={`${anime}?${new Date().getTime()}`} className='h-32 w-32'/>
        </div>
    )
}

export default Loader