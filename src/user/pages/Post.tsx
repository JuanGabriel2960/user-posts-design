import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { PostsContext } from '../../context/posts/PostsContext';
import { Post as PostInterface } from '../../interfaces/posts';
import { Card, CardTitle, CardBody } from '../components/card';
import Swal from 'sweetalert2';

export const Post = () => {

    const { id = '' } = useParams();
    const { getPostById, deletePostById } = useContext(PostsContext);
    const navigate = useNavigate();

    const [post, setPost] = useState<PostInterface | null>()

    useEffect(() => {
        getPostById(id)
            .then(setPost)
    }, [])

    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: `This post will be deleted. You can't undo this action.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ee4865',
            cancelButtonColor: '#677983',
            confirmButtonText: 'Accept',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
        }).then(result => {
            if (result.isConfirmed) {
                deletePostById(id)
                    .then(() => {
                        Swal.fire({ title: 'Deleted', text: 'Post deleted successfully.', icon: 'success', confirmButtonColor: '#ee4865' })
                            .then(() => {
                                return navigate('/user/post');
                            });
                    })
                    .catch(() => {
                        Swal.fire({ title: 'Error', text: 'Error deleting post.', icon: 'error', confirmButtonColor: '#ee4865' })
                    })
            }
        });
    }

    return (
        <div>
            <div className='flex justify-between items-center mb-9 lg:mb-11'>
                <NavLink to='/user/post'>back</NavLink>
                <button onClick={handleDelete} className='bg-white border font-bold text-font-light rounded-xl w-16 h-14'>x</button>
            </div>

            {
                (post)
                    ? (
                        <Card key={post.id} post={post} summary={false}>
                            <CardTitle className='text-4xl md:text-5xl lg:text-6xl mb-9 lg:mb-11' />
                            <CardBody className='text-2xl md:text-3xl leading-normal' />
                        </Card>
                    )
                    : (
                        <span>Loading...</span>
                    )
            }
        </div>
    )
}
