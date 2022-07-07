import { Post, sortBy } from '../../interfaces/posts';

export interface PostsState {
    posts: Post[];
    sortBy: sortBy;
}

type PostsAction =
    | { type: 'getPosts', payload: { posts: Post[] } }
    | { type: 'addPost', payload: { post: Post } }
    | { type: 'deletePostById', payload: { id: number } }
    | { type: 'changeSortBy', payload: { sortBy: sortBy } }

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

        case 'changeSortBy':
            return {
                ...state,
                sortBy: action.payload.sortBy
            }

        default:
            return state;
    }
}