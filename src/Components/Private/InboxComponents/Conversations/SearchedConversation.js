import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const SearchedConversation = ({ conversation }) => {
    const { email } = useSelector(state => state.auth.user)
    const { _id, users } = conversation || {};
    const participant = users.find(user => user.email !== email);

    return (
        <Link to={`/inbox/messages/${_id}`}>
            <div className='flex items-center gap-2 p-3 hover:bg-primary'>
                <img className='w-[30px] h-[30px] object-cover rounded-full' src={participant?.img || "https://png.pngtree.com/png-vector/20190114/ourlarge/pngtree-vector-avatar-icon-png-image_313572.jpg"} alt="" />
                <p>{participant?.name}</p>
            </div>
        </Link>
    );
};

export default SearchedConversation;