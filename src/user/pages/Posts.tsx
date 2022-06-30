import { useContext } from 'react';
import { PostsContext } from '../../context/posts/PostsContext';
import { Card, CardTitle, CardBody, CardButton } from '../components/card';

export const Posts = () => {

  const { posts } = useContext(PostsContext);

  return (
    <div>
      Posts
      <div className='flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-10'>
        {
          posts.map(post => (
            <Card key={post.id} post={post}>
              <CardTitle />
              <CardBody style={{ display: '-webkit-box', WebkitLineClamp: 8, WebkitBoxOrient: 'vertical', overflow: 'hidden' }} />
              <CardButton />
            </Card>
          ))
        }
      </div>
    </div>
  )
}
