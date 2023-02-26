import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BsThreeDots } from 'react-icons/bs';
import { useGetMyFriendsQuery, useGetRequestedFriendsQuery } from '../../../../features/friends/friendsApi';

const Friend = ({ friend, email }) => {
    const { email: myEmail } = useSelector(state => state.auth.user);
    const user = friend?.users?.find(u => u.email !== email);
    const { data: requestedUsers, isLoading: reqLoading } = useGetRequestedFriendsQuery(myEmail);
    const { data: friends, isLoading } = useGetMyFriendsQuery(myEmail);
    const isRequested = requestedUsers?.find(request => request?.friendship?.includes(user?.email));
    const isFriend = friends?.find(request => request?.friendship?.includes(user?.email));

    return (
        <div className='p-3 w-full rounded-xl border border-secondary flex items-center justify-between'>
            <div className='flex items-center gap-3'>
                <div className='w-[65px] h-[65px] flex items-center'>
                    <img className='rounded-xl w-full h-full object-cover' src={user?.img || "https://png.pngtree.com/png-vector/20190114/ourlarge/pngtree-vector-avatar-icon-png-image_313572.jpg"} alt="" />
                </div>
                <div>
                    {user?.email !== myEmail && <Link to={`/profile/${user?.username}`} className='font-normal text-white'>{user?.name}</Link>}
                    {user?.email === myEmail && <Link to={`/my-profile`} className='font-normal text-white'>{user?.name}</Link>}
                    {(!isLoading && !reqLoading) && <>
                        {(isFriend && user?.email !== myEmail) && <p className='text-xs text-gray-400'>Friend</p>}
                        {user?.email === myEmail && <p className='text-xs text-gray-400'>Me</p>}
                        {(isRequested && user?.email !== myEmail) && <p className='text-xs text-gray-400' disabled>Request sent</p>}

                        {(!isRequested && !isFriend && user?.email !== myEmail) && <button className='px-3 py-[1px] bg-yellow text-lightBlack rounded-full text-sm disabled:bg-gray-400 block'>Add Friend</button>}
                    </>}
                </div>
            </div>
            <button><BsThreeDots className='text-xl text-white' /></button>
        </div>
    );
};

export default Friend;