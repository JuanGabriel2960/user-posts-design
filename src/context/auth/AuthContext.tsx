import { createContext, useReducer } from "react";
import http from "../../api/http";
import { User, Login, Register } from "../../interfaces/users";
import { authReducer, AuthState } from './AuthReducer';
import Swal from 'sweetalert2';

type AuthContextProps = {
    user: User | null;
    status: 'authenticated' | 'unauthenticated' | 'checking';
    signIn: (formData: Login) => void;
    signUp: (formData: Register) => void;
    removeUser: () => void;
}

const authInitialState: AuthState = {
    user: null,
    status: 'unauthenticated',
}

export const AuthContext = createContext({} as AuthContextProps)

export const AuthProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(authReducer, authInitialState)

    const signIn = async ({ email }: Login) => {
        try {
            dispatch({
                type: 'checkUser',
            })

            const { data: users } = await http.get<User[]>(`/users?email=${email}`, {
                headers: {
                    Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
                }
            })

            if (!users.length) {
                Swal.fire({ title: 'Error', text: 'The credentials are not correct.', icon: 'error', confirmButtonColor: '#ee4865' })
                return dispatch({ type: 'removeUser' });
            }

            dispatch({
                type: 'setUser',
                payload: {
                    user: users[0]
                }
            })
        } catch (error: any) {
            Swal.fire({ title: 'Error', text: 'An error ocurred. Please try again later.', icon: 'error', confirmButtonColor: '#ee4865' })
            dispatch({ type: 'removeUser' });
        }
    };

    const signUp = async ({ name, gender, email, status }: Register) => {
        dispatch({
            type: 'checkUser',
        })

        try {
            const { data: user } = await http.post<User>('/users', { name, gender, email, status }, {
                headers: {
                    Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
                }
            })

            dispatch({
                type: 'setUser',
                payload: {
                    user
                }
            })
        } catch (error: any) {
            const { field, message } = error.response.data[0]
            Swal.fire({ title: 'Error', text: `${field} ${message}.`, icon: 'error', confirmButtonColor: '#ee4865' })
            dispatch({ type: 'removeUser' });
        }
    };

    const removeUser = () => {
        dispatch({ type: 'removeUser' });
    };

    return (
        <AuthContext.Provider value={{
            ...state,
            signIn,
            signUp,
            removeUser,
        }}>
            {children}
        </AuthContext.Provider>
    )
}