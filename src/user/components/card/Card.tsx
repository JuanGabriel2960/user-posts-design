import { createContext } from 'react';
import { Post } from '../../../interfaces/posts';
import { CardContextProps } from '../../../interfaces/HOC';

export const CardContext = createContext({} as CardContextProps);
const { Provider } = CardContext;

export interface Props {
    children?: React.ReactElement | React.ReactElement[];
    post: Post;
    className?: string;
    style?: React.CSSProperties;
}

export const Card = ({ children, post, className, style }: Props) => {
    return (
        <Provider value={{ post }}>
            <div className={`bg-white w-full p-4 md:p-6 md:w-2/5 lg:w-1/4  rounded-xl ${className}`} style={style}>
                {children}
            </div>
        </Provider>
    )
}