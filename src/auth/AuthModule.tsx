import { Route, Routes, Navigate } from 'react-router-dom';
import * as Pages from './pages';

const AuthModule = () => {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Pages.Login />} />
                <Route path="/register" element={<Pages.Register />} />

                <Route path="*" element={<Navigate to="login" replace />} />
            </Routes>
        </>
    )
}

export default AuthModule;