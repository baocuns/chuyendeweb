import React from 'react'

function Rating() {
    return (
        <div className="rating">
            <input type="radio" name="rating-1" className="mask mask-star bg-yellow-300" value={1} />
            <input type="radio" name="rating-1" className="mask mask-star bg-yellow-300" value={2} />
            <input type="radio" name="rating-1" className="mask mask-star bg-yellow-300" value={3} />
            <input type="radio" name="rating-1" className="mask mask-star bg-yellow-300" value={4} />
            <input type="radio" name="rating-1" className="mask mask-star bg-yellow-300" value={5} />
        </div>
    )
}

export default Rating