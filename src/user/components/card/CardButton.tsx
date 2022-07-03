import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { CardContext } from './Card';

export interface Props {
    className?: string;
    style?: React.CSSProperties;
}

export const CardButton = ({ className, style }: Props) => {

    const { post } = useContext(CardContext)

    return (
        <NavLink to={`${post.id}`}>
            <button className={`bg-accent text-white py-4 font-bold rounded-lg w-full text-center ${className}`} style={style}>
                Read More
            </button>
        </NavLink>
    );
}