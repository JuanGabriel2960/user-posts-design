import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconButton } from './IconButton'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { useCallback, useContext, useRef } from 'react';
import { PostsContext } from '../../context/posts/PostsContext';

export const Filters = () => {

    const { openModal, getPosts } = useContext(PostsContext);
    const titleInputRef = useRef<any>(null);
    const bodyInputRef = useRef<any>(null);

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

    const handleSearchPosts = () => {
        const title = titleInputRef.current.value;
        const body = bodyInputRef.current.value;

        getPosts({ title, body })
    }

    const memoize = useCallback(debounce(handleSearchPosts), [])

    return (
        <div className='flex gap-5 justify-between items-center mb-10 lg:mb-16 mt-2'>
            <form autoComplete='off' className='flex items-center w-full gap-3' onChange={memoize} onSubmit={(e) => e.preventDefault()}>
                <input type="text" ref={titleInputRef} className="bg-white border flex w-full h-14 md:h-16 lg:h-20 justify-between items-center rounded-xl px-5 text-xl lg:text-2xl" placeholder="Title" id="title" name="title" />
                <input type="text" ref={bodyInputRef} className="bg-white border flex w-full h-14 md:h-16 lg:h-20 justify-between items-center rounded-xl px-5 text-xl lg:text-2xl" placeholder="Description" id="body" name="body" />
            </form>
            <IconButton onClick={openModal} title='Add Post'>
                <FontAwesomeIcon icon={faPen} className='h-5 lg:h-6' />
            </IconButton>
        </div>
    )
}
