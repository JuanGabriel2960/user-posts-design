import { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthModule, UserModule } from './routes';

export const Navigation = () => {
    return (
        <Suspense fallback={<span>Loading...</span>}>
            <BrowserRouter>
                <Routes>

                    <Route path='/auth/*' element={<AuthModule />} />
                    <Route path='/user/*' element={<UserModule />} />

                    <Route path='/*' element={<Navigate to='/auth/*' />} />
                </Routes>
            </BrowserRouter>
        </Suspense>
    )
};
