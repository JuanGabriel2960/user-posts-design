import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { PostsContext } from '../../context/posts/PostsContext';
import { Post as PostInterface } from '../../interfaces/posts';
import { Card, CardTitle, CardBody } from '../components/card';

export const Post = () => {

    const { id = '' } = useParams();
    const { getPostById } = useContext(PostsContext);

    const [post, setPost] = useState<PostInterface | null>()

    useEffect(() => {
        getPostById(id)
            .then(setPost)
    }, [])

    return (
        <div>
            {
                (post)
                    ? (
                        <Card key={post.id} post={post} summary={false}>
                            <CardTitle className='text-4xl md:text-5xl lg:text-6xl mb-8 lg:mb-10' />
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
