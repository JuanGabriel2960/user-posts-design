import { User } from "../../interfaces/users";

export interface AuthState {
    user: User | null;
    status: 'authenticated' | 'unauthenticated';
}

type AuthAction =
    | { type: 'setUser', payload: { user: User } }
    | { type: 'removeUser' }

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'setUser':
            return {
                ...state,
                user: action.payload.user,
                status: 'authenticated'
            }

        case 'removeUser':
            return {
                ...state,
                user: null,
                status: 'unauthenticated'
            }

        default:
            return state;
    }
}