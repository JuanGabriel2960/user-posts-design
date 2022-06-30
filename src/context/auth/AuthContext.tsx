import { createContext, useReducer } from "react";
import { User } from "../../interfaces/users";
import { authReducer, AuthState } from './AuthReducer';

type AuthContextProps = {
    user: User | null;
    status: 'authenticated' | 'unauthenticated';
    setUser: (user: User) => void;
    removeUser: () => void;
}

const authInitialState: AuthState = {
    user: null,
    status: 'unauthenticated',
}

export const AuthContext = createContext({} as AuthContextProps)

export const AuthProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(authReducer, authInitialState)

    const setUser = (user: User) => {
        dispatch({
            type: 'setUser',
            payload: {
                user
            }
        })
    };

    const removeUser = () => {
        dispatch({ type: 'removeUser' });
    };

    return (
        <AuthContext.Provider value={{
            ...state,
            setUser,
            removeUser,
        }}>
            {children}
        </AuthContext.Provider>
    )
}