import { useContext } from 'react';
import { CardContext } from './Card';

export interface Props {
    body?: string;
    className?: string;
    style?: React.CSSProperties;
}

export const CardBody = ({ body, className, style }: Props) => {

    const { post } = useContext(CardContext)

    return (
        <p className={`text-font-light font-light h-60 text-lg lg:text-xl mb-4 ${className}`} style={style}>
            {body ? body : post.body}
        </p>
    );
}