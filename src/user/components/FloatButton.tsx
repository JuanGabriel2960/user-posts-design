import { ReactElement } from 'react';

interface Props {
    title?: string;
    children: ReactElement | ReactElement[];
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const FloatButton = ({ title, children, onClick }: Props) => {
    return (
        <button onClick={onClick} title={title} className='fixed w-20 h-20 left-8 bottom-8 lg:w-24 lg:h-24 lg:bottom-16 lg:left-16 bg-accent rounded-full text-center' style={{ boxShadow: '2px 2px 4px #999' }}>
            {children}
        </button>
    )
}
