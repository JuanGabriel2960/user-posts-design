import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconButton } from './IconButton'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { ChangeEvent, useCallback, useContext } from 'react';
import { PostsContext } from '../../context/posts/PostsContext';

export const Filters = () => {

    const { openModal, getPosts } = useContext(PostsContext);

    const debounce = (func: Function) => {
        let timer: any;

        return function (this: unknown, ...args: any) {
            const context = this;
            if (timer) clearTimeout(timer)
            timer = setTimeout(() => {
                timer = null
                func.apply(context, args)
            }, 500);
        }
    }

    const handleSearchPosts = (e: ChangeEvent<HTMLInputElement>) => {
        getPosts({ title: e.target.value })
    }

    const memoize = useCallback(debounce(handleSearchPosts), [])

    return (
        <div className='flex gap-5 justify-between items-center mb-10 lg:mb-16 mt-2'>
            <div className='flex items-center w-full'>
                <input type="text" autoComplete='off' className="bg-white border flex w-full h-14 md:h-16 lg:h-20 justify-between items-center rounded-xl px-5 text-xl lg:text-2xl" placeholder="Search" id="search" name="search" onChange={memoize} />
            </div>
            <IconButton onClick={openModal}>
                <FontAwesomeIcon icon={faPen} className='h-5 lg:h-6' />
            </IconButton>
        </div>
    )
}
