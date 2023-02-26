import React from 'react';
import { useSelector } from 'react-redux';
import Friend from './Friend';
import { IoSearchOutline } from 'react-icons/io5'
import { useGetMyFriendsQuery } from '../../../../../features/friends/friendsApi';

const Friends = () => {

    const { email } = useSelector(state => state.auth.user)
    const { data: friends, isLoading, isError, isSuccess } = useGetMyFriendsQuery(email);

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
        content = friends.map(friend => <Friend key={friend._id} friend={friend} />)
    }


    return (
        <div className='w-[700px] xs:w-full xxs:w-full mx-auto xxs:px-5 xs:px-5'>
            <div className='w-full h-[50px] xxs:h-full xs:h-full flex items-center justify-between border-b border-secondary xxs:flex-wrap xs:flex-wrap gap-2 sm:pb-2 xs:pb-2 xxs:pb-2'>
                <h2 className='text-xl font-semibold text-white'>My Friends</h2>
                <div className='relative'>
                    <input className='px-3 py-1 rounded-md w-[300px] outline-none text-white bg-secondary' type="text" placeholder='Search friend...' />
                    <button className='text-xl text-white absolute top-1/2 right-2 transform -translate-y-1/2'>
                        <IoSearchOutline />
                    </button>
                </div>
            </div>
            <div className='py-4 w-full grid grid-cols-2 xxs:grid-cols-1 xs:grid-cols-1 gap-3'>
                {content}
            </div>
        </div>
    );
};

export default Friends;