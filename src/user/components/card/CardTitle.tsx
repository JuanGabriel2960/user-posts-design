import { useContext } from 'react';
import { CardContext } from './Card';

export interface Props {
    title?: string;
    className?: string;
    style?: React.CSSProperties;
}

export const CardTitle = ({ title, className, style }: Props) => {

    const { post } = useContext(CardContext)

    return (
        <h5 className={`text-font-strong font-bold lg:text-3xl mb-4 whitespace-nowrap overflow-hidden text-ellipsis ${className}`} style={style}>
            {title ? title : post.title}
        </h5>
    );
}