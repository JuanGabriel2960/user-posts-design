import { NavLink, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { PostsContext } from '../../context/posts/PostsContext';
import { Post as PostInterface } from '../../interfaces/posts';
import { Card, CardTitle, CardBody } from '../components/card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { IconButton } from '../components/IconButton';
import Swal from 'sweetalert2';

export const Post = () => {

    const { id = '' } = useParams();
    const { getPostById, deletePostById } = useContext(PostsContext);

    const [selectedPost, setSelectedPost] = useState<PostInterface | null>();

    useEffect(() => {
        getPostById(id)
            .then(setSelectedPost)
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
                deletePostById(parseInt(id))
            }
        });
    }

    return (
        <div>
            <div className='flex justify-between items-center mb-10 lg:mb-16'>
                <NavLink to='/user/post'>
                    <FontAwesomeIcon icon={faAngleLeft} className='text-font-strong h-9 lg:h-11' />
                </NavLink>
                <IconButton onClick={handleDelete}>
                    <FontAwesomeIcon icon={faTrash} className='h-5 lg:h-6' />
                </IconButton>
            </div>

            {
                (selectedPost)
                    ? (
                        <Card key={selectedPost.id} post={selectedPost} summary={false}>
                            <CardTitle className='text-4xl md:text-5xl lg:text-6xl mb-10 lg:mb-11' />
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
