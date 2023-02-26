import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNewPeopleQuery } from '../../../../features/user/userApi';
import SingleFriend from './SingleFriend';

const FindFriend = () => {
    const { email } = useSelector(state => state.auth.user)
    const { data: users, isLoading, isError, isSuccess } = useNewPeopleQuery(email);

    let content = null
    if (isLoading) {
        content = <p className='text-white'>Loading...</p>
    }
    else if (!isLoading && isError) {
        content = <p className='text-red-500'>Internal Server Error</p>
    }
    else if (!isLoading && !isError && !users.length) {
        content = <p className='text-white'>No People Found</p>
    }
    else if (!isLoading && !isError && isSuccess && users.length) {
        content = users.map(user => <SingleFriend key={user._id} user={user} />)
    }
    return (
        <div className='w-[330px] h-full bg-secondary'>
            <div className='w-full h-[50px] flex items-center justify-between px-4'>
                <h2 className='text-xl font-semibold text-white'>New People</h2>
                <Link className='text-gray-300 mr-5' to='/find-people'>More People</Link>
            </div>
            <div className='space-y-4 px-8 mt-2 h-[calc(100%_-_50px)] w-full overflow-auto scrollbar-thin scrollbar-thumb-lightBlack scrollbar-track-sidebarBg scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
                {content}
            </div>
        </div>
    );
};

export default FindFriend;