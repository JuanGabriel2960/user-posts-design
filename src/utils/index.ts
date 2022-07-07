import { Post, sortBy } from "../interfaces/posts";

export const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const sortPosts = (posts: Post[], type: sortBy) => {
    if (type === sortBy.ASC) {
        return posts.sort((a, b) => (a.id > b.id) ? 1 : -1)
    }

    return posts.sort((a, b) => (a.id < b.id) ? 1 : -1)
}