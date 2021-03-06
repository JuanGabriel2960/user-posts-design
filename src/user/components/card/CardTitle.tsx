import { useContext } from 'react';
import { CardContext } from './Card';

export interface Props {
    title?: string;
    className?: string;
    style?: React.CSSProperties;
}

export const CardTitle = ({ title, className, style }: Props) => {

    const { post, summary } = useContext(CardContext)

    return (
        <h5 className={`text-font-strong font-bold ${summary && 'whitespace-nowrap overflow-hidden text-ellipsis'} ${className}`} style={style}>
            {title ? title : post.title}
        </h5>
    );
}