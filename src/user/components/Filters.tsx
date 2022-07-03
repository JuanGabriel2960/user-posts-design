import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconButton } from './IconButton'
import { faPen } from '@fortawesome/free-solid-svg-icons'

export const Filters = () => {
    return (
        <div className='flex gap-5 justify-between items-center mb-10 lg:mb-16 mt-2'>
            <div className={`bg-white border flex w-full h-14 md:h-16 lg:h-20 justify-between items-center rounded-xl px-5`}>
                <input type="text" autoComplete='off' className="bg-transparent text-xl w-full mr-6 lg:text-2xl" placeholder="Search" id="search" name="search" />
            </div>
            <IconButton>
                <FontAwesomeIcon icon={faPen} className='h-5 lg:h-6' />
            </IconButton>
        </div>
    )
}
