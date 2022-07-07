import { ReactElement } from 'react'

interface Props {
    title?: string;
    children: ReactElement | ReactElement[];
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const IconButton = ({ title, children, onClick }: Props) => {
    return (
        <button onClick={onClick} title={title} className='bg-white border font-bold text-font-light rounded-xl w-16 md:w-20 h-14 md:h-16 lg:h-20 flex justify-center items-center hover:bg-gray-100 active:bg-gray-200'>
            {children}
        </button>
    )
}
