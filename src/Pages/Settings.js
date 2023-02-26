import React from 'react';
import { Outlet } from 'react-router-dom';
import SettingsNav from '../Components/Private/settingsComponents/SettingsNav';

const Settings = () => {
    return (
        <div className='w-full h-full p-8'>
            <div className='p-4 bg-secondary h-full rounded-lg'>
                <SettingsNav />
                <div className='w-full h-[2px] bg-primary mt-2 rounded-full'></div>
                <Outlet />
            </div>
        </div>
    );
};

export default Settings;