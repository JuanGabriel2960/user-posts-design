import { useContext } from 'react';
import { PostsContext } from '../../context/posts/PostsContext';
import { Card, CardTitle, CardBody, CardButton } from '../components/card';
import { Filters } from '../components/Filters';
import { FloatButton } from '../components/FloatButton';
import { PostForm } from '../components/PostForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../../context/auth/AuthContext';

export const Posts = () => {

  const { removeUser } = useContext(AuthContext);
  const { posts } = useContext(PostsContext);

  return (
    <div>
      <h1 className='text-font-strong font-bold text-3xl lg:text-4xl'>Posts search</h1>
      <Filters />

      <div className='flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-10'>
        {
          posts.map(post => (
            <Card key={post.id} post={post}>
              <CardTitle className='lg:text-3xl mb-4' />
              <CardBody className='text-xl lg:text-2xl' />
              <CardButton />
            </Card>
          ))
        }
      </div>

      <PostForm />
      <FloatButton title='Logout' onClick={removeUser}>
        <FontAwesomeIcon icon={faPowerOff} className='text-white h-8 lg:h-8' />
      </FloatButton>
    </div>
  )
}
