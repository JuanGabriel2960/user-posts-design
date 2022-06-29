import { Route, Routes, Navigate } from 'react-router-dom';
import * as Pages from './pages';

const UserModule = () => {
    return (
        <>
            <Routes>
                <Route path="/posts" element={<Pages.Posts />} />

                <Route path="*" element={<Navigate to="posts" replace />} />
            </Routes>
        </>
    )
}

export default UserModule