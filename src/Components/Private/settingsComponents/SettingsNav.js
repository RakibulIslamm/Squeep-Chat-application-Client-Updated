import React from 'react';
import { RxAvatar } from "react-icons/rx";
import { useSelector } from 'react-redux';
import { useGetUserQuery } from '../../../features/user/userApi';
import SettingsCustomLink from '../../../utils/SettingsCustomLink';

const SettingsNav = () => {
    const { email } = useSelector(state => state.auth.user);
    const { data } = useGetUserQuery(email);

    return (
        <div className='flex items-center justify-between'>
            <div className='py-2 flex items-center justify-between gap-5 text-white'>
                <SettingsCustomLink to='/settings'>Account Settings</SettingsCustomLink>
                <SettingsCustomLink to='/settings/change-password'>Change Password</SettingsCustomLink>
                <SettingsCustomLink to='/settings/notification-settings'>Notification Settings</SettingsCustomLink>
                <SettingsCustomLink to='/settings/additional-settings'>Additional Settings</SettingsCustomLink>
            </div>
            <div className='flex items-center gap-2'>
                <h3 className='text-lg font-medium text-gray-300'>{data?.name}</h3>
                <img className='w-10 h-10 rounded-full object-cover' src={data?.img || 'https://png.pngtree.com/png-vector/20190114/ourlarge/pngtree-vector-avatar-icon-png-image_313572.jpg'} alt="" />
            </div>
        </div>
    );
};

export default SettingsNav;