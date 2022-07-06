import { createContext, useState, useContext, useEffect } from 'react';
import { CreatePost, Post } from '../../interfaces/posts';
import http from '../../api/http';
import { AuthContext } from '../auth/AuthContext';
import { User } from '../../interfaces/users';
import Swal from 'sweetalert2';
import { useModal } from '../../hooks/useModal';
import { useLoading } from '../../hooks/useLoading';

type PostsContextProps = {
    posts: Post[];
    getPosts: () => Promise<void>;
    getPostById: (id: string) => Promise<Post>;
    deletePostById: (id: string) => Promise<void>;
    addPost: (formData: CreatePost) => Promise<void>;
    isFormOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
    isButtonLoading: boolean;
}

export const PostsContext = createContext({} as PostsContextProps);

export const PostsProvider = ({ children }: any) => {

    const [posts, setPosts] = useState<Post[]>([]);
    const { user } = useContext(AuthContext);
    const { isOpen: isFormOpen, openModal, closeModal } = useModal()
    const { isLoading: isButtonLoading, startLoading, stopLoading } = useLoading()

    useEffect(() => {
        getPosts();
    }, [])

    const getPosts = async () => {
        const { id } = user as User;

        const resp = await http.get<Post[]>(`/users/${id}/posts`, {
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
            }
        })

        setPosts([...resp.data]);
    }

    const getPostById = async (id: string) => {
        const resp = await http.get<Post>(`/posts/${id}`, {
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
            }
        });

        return resp.data;
    };

    const deletePostById = async (id: string) => {
        await http.delete(`/posts/${id}`, {
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
            }
        });

        getPosts()
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

            setPosts([...posts, resp.data]);
        } catch (error: any) {
            const { field, message } = error.response.data[0]
            Swal.fire({ title: 'Error', text: `${field} ${message}.`, icon: 'error', confirmButtonColor: '#ee4865' })
        }

        stopLoading()
    };

    return (
        <PostsContext.Provider value={{
            posts,
            getPosts,
            getPostById,
            deletePostById,
            addPost,
            isFormOpen,
            openModal,
            closeModal,
            isButtonLoading
        }}>
            {children}
        </PostsContext.Provider>
    )
}