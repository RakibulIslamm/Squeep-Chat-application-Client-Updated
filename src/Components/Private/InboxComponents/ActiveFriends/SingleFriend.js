import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const SingleFriend = ({ activeFriend }) => {
    const { email } = useSelector(state => state.auth.user);
    const user = activeFriend?.users?.find(u => u.email !== email);

    return (
        <Link to={`/inbox/messages/${activeFriend?.conversationId}`}>
            <div className='w-full flex items-center gap-3 px-4 py-2 hover:bg-primary cursor-pointer'>
                <div className='relative w-[40px] h-[35px]'>
                    <img className='rounded-full w-full h-full object-cover' src={user?.img || "https://png.pngtree.com/png-vector/20190114/ourlarge/pngtree-vector-avatar-icon-png-image_313572.jpg"} alt="" />
                    <div className='w-3 h-3 rounded-full bg-green border-[2px] border-secondary absolute bottom-0 right-0'></div>
                </div>
                <div className='w-full'>
                    <div>
                        <p className='text-[#9BA2B0] line-clamp-1 text-sm'>{user?.name}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default SingleFriend;