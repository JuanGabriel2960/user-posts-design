import { createContext } from 'react';
import { Post } from '../../../interfaces/posts';
import { CardContextProps } from '../../../interfaces/HOC';

export const CardContext = createContext({} as CardContextProps);
const { Provider } = CardContext;

export interface Props {
    children?: React.ReactElement | React.ReactElement[];
    post: Post;
    summary?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

export const Card = ({ children, post, summary = true, className, style }: Props) => {
    if (summary == false) {
        return (
            <Provider value={{ post }}>
                <div className={`${className}`} style={style}>
                    {children}
                </div>
            </Provider>
        )
    }

    return (
        <Provider value={{ post, summary }}>
            <div className={`bg-white w-full p-4 md:p-6 md:w-2/5 lg:w-1/4 rounded-xl ${className}`} style={style}>
                {children}
            </div>
        </Provider>
    )
}