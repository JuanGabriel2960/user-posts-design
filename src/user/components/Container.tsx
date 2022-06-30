import { ReactElement } from 'react'

interface Props {
    children: ReactElement | ReactElement[];
}

export const Container = ({ children }: Props) => {
    return (
        <div className='bg-secondary min-h-screen py-6 px-6 lg:py-12 lg:px-12'>
            <div className='container mx-auto'>
                {children}
            </div>
        </div>
    )
}
