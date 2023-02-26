import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetFriendRequestQuery } from '../../../../features/friends/friendsApi';
import SingleRequest from './SingleRequest';

const FriendRequest = () => {
    const { email } = useSelector(state => state.auth.user);
    const { data: friends, isLoading, isError, isSuccess, refetch } = useGetFriendRequestQuery(email);

    useEffect(() => {
        refetch()
    }, [refetch]);


    let content = null
    if (isLoading) {
        content = <p className='text-white'>Loading...</p>
    }
    else if (!isLoading && isError) {
        content = <p className='text-red-500'>Internal Server Error</p>
    }
    else if (!isLoading && !isError && !friends?.length) {
        content = <div className='flex justify-center items-center h-full'>
            <p className='text-gray-500 text-2xl font-semibold text-center'>No one send you <br /> friend request</p>
        </div>
    }
    else if (!isLoading && !isError && isSuccess && friends?.length) {
        content = friends?.map(friend => <SingleRequest key={friend._id} friend={friend} />)
        // users.map(user => user.users.filter(u => u.email !== email)[0]).map()
    }

    return (
        <div className='w-1/3 h-full bg-secondary border border-gray-600 p-4 overflow-hidden overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-lightBlack scrollbar-track-sidebarBg'>
            {content}
        </div>
    );
};

export default FriendRequest;