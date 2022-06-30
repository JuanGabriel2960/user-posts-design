import { Route, Routes, Navigate } from 'react-router-dom';
import * as Pages from './pages';
import { PostsProvider } from '../context/posts/PostsContext';
import { Container } from './components/Container';

const UserModule = () => {
    return (
        <Container>
            <PostsProvider>
                <Routes>
                    <Route path="/posts" element={<Pages.Posts />} />

                    <Route path="*" element={<Navigate to="posts" replace />} />
                </Routes>
            </PostsProvider>
        </Container>
    )
}

export default UserModule