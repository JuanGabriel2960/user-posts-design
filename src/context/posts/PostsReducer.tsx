import { Post } from '../../interfaces/posts';

export interface PostsState {
    posts: Post[];
}

type PostsAction =
    | { type: 'getPosts', payload: { posts: Post[] } }
    | { type: 'addPost', payload: { post: Post } }
    | { type: 'deletePostById', payload: { id: number } }

export const postsReducer = (state: PostsState, action: PostsAction): PostsState => {
    switch (action.type) {
        case 'getPosts':
            return {
                ...state,
                posts: action.payload.posts
            }

        case 'addPost':
            return {
                ...state,
                posts: [action.payload.post, ...state.posts]
            }

        case 'deletePostById':
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.payload.id)
            }

        default:
            return state;
    }
}