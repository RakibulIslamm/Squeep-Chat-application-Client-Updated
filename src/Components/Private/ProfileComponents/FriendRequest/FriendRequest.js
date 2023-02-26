import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetFriendRequestQuery } from '../../../../features/friends/friendsApi';
import SingleRequest from './SingleRequest';

const FriendRequest = () => {
    const { email } = useSelector(state => state.auth.user);
    const { data: friends, isLoading, isError, isSuccess, refetch } = useGetFriendRequestQuery(email);
    // const friendIds = data.map(friend => friend._id);

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
        content = <p className='text-white'>No People Found</p>
    }
    else if (!isLoading && !isError && isSuccess && friends?.length) {
        content = friends?.map(friend => <SingleRequest key={friend._id} friend={friend} />)
        // users.map(user => user.users.filter(u => u.email !== email)[0]).map()
    }

    return (
        <div className='w-[330px] h-full bg-secondary xs:hidden xxs:hidden'>
            <div className='w-full h-[50px] flex items-center px-4'>
                <h2 className='text-xl font-semibold text-white'>Recent Request</h2>
            </div>
            <div className='px-4 h-[calc(100%_-_50px)] w-full overflow-auto scrollbar-thin scrollbar-thumb-lightBlack scrollbar-track-sidebarBg scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
                {content}
            </div>
        </div>
    );
};

export default FriendRequest;