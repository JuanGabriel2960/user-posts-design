export interface User {
    id: number;
    name: string;
    email: string;
    gender: string;
    status: string;
}

export interface Login {
    email: string;
}

export interface Register {
    name: string;
    gender: string;
    email: string;
    status: string;
}