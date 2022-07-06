import { useState, FormEvent, useContext } from 'react';
import { useForm } from '../../hooks/useForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { PostsContext } from '../../context/posts/PostsContext';

const formValidations = {
    title: [(value: string) => value.length >= 1, 'The name is required'],
    body: [(value: string) => value.length >= 1, 'The body is required'],
}

export const PostForm = () => {

    const [formSubmitted, setFormSubmitted] = useState(false);
    const { addPost, isFormOpen, closeModal } = useContext(PostsContext);

    const { title, body, onChange, isFormValid, resetForm, titleValid, bodyValid } = useForm({
        title: '',
        body: '',
    }, formValidations)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormSubmitted(true)

        if (!isFormValid) return;

        addPost({ title, body })
            .finally(() => {
                handleCloseModal()
            })
    }

    const handleCloseModal = () => {
        resetForm()
        closeModal()
        setFormSubmitted(false)
    }

    return (
        <div className={`overlay ${isFormOpen && 'active'}`} onClick={() => handleCloseModal()}>
            <form autoComplete="off" onSubmit={(e) => handleSubmit(e)} className={`modal w-full h-full overflow-y-hidden flex flex-col justify-between bg-white p-8 ${isFormOpen && 'active'}`} onClick={(e) => e.stopPropagation()}>
                <div>
                    <div className='flex justify-between items-center'>
                        <h1 className='text-font-strong font-bold text-3xl'>Add Post</h1>
                        <FontAwesomeIcon icon={faClose} onClick={handleCloseModal} className='text-font-strong h-7 lg:h-9 cursor-pointer' />
                    </div>
                    <p className='text-font-light font-light text-2xl'>Complete these fields to create your own posts</p>
                </div>

                <div className='flex flex-col gap-10 h-2/3'>
                    <div>
                        <label className='text-font-strong font-bold'>Title</label>
                        <input maxLength={200} type="text" className={`bg-transparent text-xl md:text-2xl w-full border rounded-lg py-4 px-6 md:py-5 ${(!!titleValid && formSubmitted) && 'border-red-400'}`} id="title" name="title" onChange={(e) => onChange(e.target.value, 'title')} value={title} />
                        <span className="text-red-400 text-xl">{formSubmitted && titleValid}</span>
                    </div>
                    <div className='h-full'>
                        <label className='text-font-strong font-bold'>Body</label>
                        <textarea maxLength={500} className={`bg-transparent text-xl md:text-2xl w-full h-full border rounded-lg py-4 px-6 md:py-5 ${(!!bodyValid && formSubmitted) && 'border-red-400'}`} id="body" name="body" onChange={(e) => onChange(e.target.value, 'body')} value={body} />
                        <span className="text-red-400 text-xl">{formSubmitted && bodyValid}</span>
                    </div>
                </div>

                <button
                    className="bg-accent text-white disabled:bg-pink-400 relative mt-10 py-5 font-bold rounded-lg w-full md:py-6 md:mt-14">
                    <span className='w-full'>Create</span>
                    {/* <svg role="status" className={`absolute right-0 top-5 md:top-6 mr-5 w-7 h-7 text-white animate-spin`} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                    </svg> */}
                </button>
            </form>
        </div>
    )
}
