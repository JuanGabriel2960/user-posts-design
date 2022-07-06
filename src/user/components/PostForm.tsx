import { useState, FormEvent, useContext } from 'react';
import { useForm } from '../../hooks/useForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { PostsContext } from '../../context/posts/PostsContext';
import { LoadingButton } from '../../components/LoadingButton';

const formValidations = {
    title: [(value: string) => value.length >= 1, 'The name is required'],
    body: [(value: string) => value.length >= 1, 'The body is required'],
}

export const PostForm = () => {

    const [formSubmitted, setFormSubmitted] = useState(false);
    const { addPost, isFormOpen, closeModal, isButtonLoading } = useContext(PostsContext);

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
            <form autoComplete="off" onSubmit={(e) => handleSubmit(e)} className={`modal no-scroll w-full h-full overflow-y-hidden flex flex-col justify-between bg-white p-8 ${isFormOpen && 'active'}`} onClick={(e) => e.stopPropagation()}>
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

                <LoadingButton text='Create' isLoading={isButtonLoading} />
            </form>
        </div>
    )
}
