import React from 'react'

export const Filters = () => {
    return (
        <div className='flex gap-4 justify-between items-center mb-10 mt-2'>
            <div className={`bg-white border flex w-full h-14 justify-between items-center rounded-xl py-3 px-5 md:py-5`}>
                <input type="text" autoComplete='off' className="bg-transparent text-xl w-full mr-6" placeholder="Search" id="search" name="search" />
            </div>
            <button className='bg-white border font-bold text-font-light rounded-xl w-16 h-14'>+</button>
        </div>
    )
}
