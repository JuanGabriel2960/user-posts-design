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
        <div className='h-60 mb-1'>
            <p className={`text-font-light font-light text-lg lg:text-xl ${className}`} style={style}>
                {body ? body : post.body}
            </p>
        </div>
    );
}