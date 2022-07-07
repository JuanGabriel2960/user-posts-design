import { createContext, useContext, useEffect, useReducer } from 'react';
import { CreatePost, Post, searchParameters } from '../../interfaces/posts';
import http from '../../api/http';
import { AuthContext } from '../auth/AuthContext';
import { User } from '../../interfaces/users';
import Swal from 'sweetalert2';
import { useModal } from '../../hooks/useModal';
import { useLoading } from '../../hooks/useLoading';
import { postsReducer, PostsState } from './PostsReducer';
import { useNavigate } from 'react-router-dom';

type PostsContextProps = {
    posts: Post[];
    getPosts: (searchParameters?: searchParameters) => Promise<void>;
    getPostById: (id: string) => Promise<Post>;
    addPost: (formData: CreatePost) => Promise<void>;
    deletePostById: (id: number) => Promise<void>;
    isFormOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
    isButtonLoading: boolean;
}

const postsInitialState: PostsState = {
    posts: [],
}

export const PostsContext = createContext({} as PostsContextProps);

export const PostsProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(postsReducer, postsInitialState)

    const { user } = useContext(AuthContext);
    const { isOpen: isFormOpen, openModal, closeModal } = useModal()
    const { isLoading: isButtonLoading, startLoading, stopLoading } = useLoading()
    const navigate = useNavigate();

    useEffect(() => {
        getPosts();
    }, [])

    const getPosts = async (searchParameters: searchParameters = { title: '' }) => {
        const { id } = user as User;

        const resp = await http.get<Post[]>(`/users/${id}/posts?title=${searchParameters.title}`, {
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
            }
        })

        dispatch({
            type: 'getPosts',
            payload: {
                posts: resp.data
            }
        })
    }

    const getPostById = async (id: string) => {
        const resp = await http.get<Post>(`/posts/${id}`, {
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
            }
        });

        return resp.data;
    };

    const addPost = async ({ title, body }: CreatePost) => {
        const { id } = user as User;

        try {
            startLoading()

            const resp = await http.post<Post>(`/users/${id}/posts`, { title, body }, {
                headers: {
                    Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
                }
            });

            dispatch({
                type: 'addPost',
                payload: {
                    post: resp.data
                }
            })
        } catch (error: any) {
            const { field, message } = error.response.data[0]
            Swal.fire({ title: 'Error', text: `${field} ${message}.`, icon: 'error', confirmButtonColor: '#ee4865' })
        }

        stopLoading()
    };

    const deletePostById = async (id: number) => {
        try {
            await http.delete(`/posts/${id}`, {
                headers: {
                    Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
                }
            });

            dispatch({
                type: 'deletePostById',
                payload: {
                    id
                }
            })

            Swal.fire({ title: 'Deleted', text: 'Post deleted successfully.', icon: 'success', confirmButtonColor: '#ee4865' })
                .then(() => {
                    return navigate('/user/post');
                });
        } catch (error: any) {
            Swal.fire({ title: 'Error', text: 'Error deleting post.', icon: 'error', confirmButtonColor: '#ee4865' })
        }
    };

    return (
        <PostsContext.Provider value={{
            ...state,
            getPosts,
            getPostById,
            addPost,
            deletePostById,
            isFormOpen,
            openModal,
            closeModal,
            isButtonLoading,
        }}>
            {children}
        </PostsContext.Provider>
    )
}