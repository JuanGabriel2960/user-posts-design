import React from 'react'

export const Filters = () => {
    return (
        <div className='flex gap-5 justify-between items-center mb-10 lg:mb-16 mt-2'>
            <div className={`bg-white border flex w-full h-14 md:h-16 lg:h-20 justify-between items-center rounded-xl px-5`}>
                <input type="text" autoComplete='off' className="bg-transparent text-xl w-full mr-6 lg:text-2xl" placeholder="Search" id="search" name="search" />
            </div>
            <button className='bg-white border font-bold text-font-light rounded-xl w-16 md:w-20 h-14 md:h-16 lg:h-20'>+</button>
        </div>
    )
}
