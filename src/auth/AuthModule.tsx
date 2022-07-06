import { Route, Routes, Navigate } from 'react-router-dom';
import * as Pages from './pages';

const AuthModule = () => {
    return (
        <div className="w-screen h-screen flex flex-col xl:flex-row">
            <div className="bg-accent w-full h-2/5 flex flex-col justify-center items-center xl:w-1/2 xl:h-full">
            </div>
            <div className="w-full h-3/5 flex flex-col justify-center xl:w-1/2 xl:h-full">
                <Routes>
                    <Route path="/login" element={<Pages.Login />} />
                    <Route path="/register" element={<Pages.Register />} />

                    <Route path="*" element={<Navigate to="login" replace />} />
                </Routes>
            </div>
        </div>
    )
}

export default AuthModule;