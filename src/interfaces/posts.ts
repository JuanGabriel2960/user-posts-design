export interface Post {
    id: number;
    user_id: number;
    title: string;
    body: string;
}

export interface CreatePost {
    title: string;
    body: string;
}

export interface searchParameters {
    title?: string;
}