import { useContext } from 'react';
import { CardContext } from './Card';

export interface Props {
    body?: string;
    className?: string;
}

export const CardBody = ({ body, className }: Props) => {

    const { post, summary } = useContext(CardContext)

    return (
        <div className='h-56 lg:h-60 lg:mb-2'>
            <p className={`text-font-light font-light ${className}`} style={summary ? { display: '-webkit-box', WebkitLineClamp: 7, WebkitBoxOrient: 'vertical', overflow: 'hidden' } : {}}>
                {body ? body : post.body}
            </p>
        </div>
    );
}