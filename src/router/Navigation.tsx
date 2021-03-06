import { Suspense, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthModule, UserModule } from './routes';
import { AuthContext } from '../context/auth/AuthContext';
import { ModuleLoader } from '../components/ModuleLoader';

export const Navigation = () => {

    const { status } = useContext(AuthContext);

    return (
        <Suspense fallback={<ModuleLoader />}>
            <BrowserRouter>
                <Routes>
                    {
                        (status !== 'authenticated')
                            ? (
                                <>
                                    <Route path='/auth/*' element={<AuthModule />} />
                                    <Route path='/*' element={<Navigate to='/auth' />} />
                                </>
                            )
                            : (
                                <>
                                    <Route path='/user/*' element={<UserModule />} />
                                    <Route path='/*' element={<Navigate to='/user' />} />
                                </>
                            )
                    }
                </Routes>
            </BrowserRouter>
        </Suspense>
    )
};
