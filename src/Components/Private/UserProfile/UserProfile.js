import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetUserByUsernameQuery } from '../../../features/user/userApi';
import { BiArrowBack } from 'react-icons/bi'
import CoverImageLoader from '../../../utils/Loader/profileLoader/CoverImageLoader';
import ProfilePhotoLoader from '../../../utils/Loader/profileLoader/ProfilePhotoLoader';
import UserProfileInfo from './UserProfileInfo';
import Friends from './Friends/Friends';

const UserProfile = () => {

    const { username } = useParams();
    // console.log(username)
    const { data: user, isLoading, isError, isSuccess } = useGetUserByUsernameQuery(username);

    let content = null;
    if (isLoading) {
        content = <>
            <CoverImageLoader height={350} />
            <div className='relative bottom-8'>
                <ProfilePhotoLoader radius={70} left={210} cx={130} />
            </div>
        </>
    }
    else if (!isLoading && !isError && isSuccess && user?.email) {
        content = <UserProfileInfo user={user} />
    }

    return (
        <div className='w-4/6 h-full mx-auto relative overflow-y-auto scrollbar-none'>
            <div className='py-2 px-5 absolute top-0 left-0 w-full bg-white bg-opacity-25'>
                <button onClick={() => window.history.back()} className='flex items-center gap-2 text-white'><BiArrowBack />Back</button>
            </div>
            {content}
            <Friends email={user?.email} />
        </div>
    );
};

export default UserProfile;