import React from 'react';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
    return (
        <div className=' bg-secondary'>
            <div className='max-w-[1440px] h-screen mx-auto'>
                <Outlet />
            </div>
        </div>
    );
};

export default PublicLayout;