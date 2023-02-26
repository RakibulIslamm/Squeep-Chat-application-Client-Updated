import React from 'react';
import Friend from './Friend';
import { useGetMyFriendsQuery } from '../../../../features/friends/friendsApi';

const Friends = ({ email }) => {
    const { data: friends, isLoading, isError, isSuccess } = useGetMyFriendsQuery(email);
    // console.log(email);
    // console.log(friends);

    let content = null
    if (isLoading) {
        content = <p className='text-white'>Loading...</p>
    }
    else if (!isLoading && isError) {
        content = <p className='text-red-500'>Internal Server Error</p>
    }
    else if (!isLoading && !isError && !friends.length) {
        content = <p className='text-white'>You have no friend</p>
    }
    else if (!isLoading && !isError && isSuccess && friends.length) {
        content = friends.map(friend => <Friend key={friend._id} friend={friend} email={email} />)
    }


    return (
        <div className='w-[750px] mx-auto'>
            <div className='w-full h-[50px] flex items-center justify-between border-b border-secondary'>
                <h2 className='text-xl font-semibold text-white'>Friends</h2>
            </div>
            <div className='py-4 w-full grid grid-cols-2 gap-3'>
                {content}
            </div>
        </div>
    );
};

export default Friends;