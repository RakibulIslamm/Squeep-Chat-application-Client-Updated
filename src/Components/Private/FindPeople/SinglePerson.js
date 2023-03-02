import React, { useState } from 'react';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { RiUserShared2Line } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAddConversationMutation } from '../../../features/conversations/conversationsAPI';
import { useGetRequestedFriendsQuery, useSendFriendRequestMutation } from '../../../features/friends/friendsApi';
import { useGetUserQuery } from '../../../features/user/userApi';

const SinglePerson = ({ user }) => {
    const { name, img, username } = user || {};
    // console.log(username);
    const [disabled, setDisabled] = useState(false);
    const [addedUsers, setAddedUsers] = useState([]);

    const { email: currentUserEmail } = useSelector(state => state.auth.user)
    const { data: currentUserData } = useGetUserQuery(currentUserEmail) || {}

    const { data: requestedFriends } = useGetRequestedFriendsQuery(currentUserEmail);
    const isExist = requestedFriends?.map(f => f?.friendship?.filter(email => email !== currentUserEmail)[0]);

    const [addConversation] = useAddConversationMutation();
    const [sendFriendRequest] = useSendFriendRequestMutation();

    const handleAddFriend = async () => {
        setDisabled(true);
        setAddedUsers([...addedUsers, user?.email]);
        try {
            const { email, _id } = currentUserData;
            const currentUser = { email, id: _id };
            const requestedPerson = { email: user.email, id: user._id };
            const data = {
                participants: [email, user?.email],
                users: [user._id, _id],
                sender: '',
                lastMessage: '',
                unseenMessages: 0,
                timestamp: '',
                isFriend: false,
            }
            const result = await addConversation({ data, email }).unwrap();
            console.log(result);
            if (result._id) {
                await sendFriendRequest({ currentUser, requestedPerson, conversationId: result._id });
            }
        }
        catch (err) {
            console.log(err);
            setAddedUsers(addedUsers.filter(e => e !== user?.email));
        }
        finally {
            setDisabled(false);
        }
    }
    return (
        <div className='py-3 px-4 bg-gray-500 flex flex-col items-center gap-1'>
            <img className='w-[90px] h-[90px] object-cover rounded-full' src={img || "https://png.pngtree.com/png-vector/20190114/ourlarge/pngtree-vector-avatar-icon-png-image_313572.jpg"} alt="" />
            <Link to={`/profile/${username}`}>
                <p className='text-lg text-white font-medium line-clamp-1'>{name}</p>
            </Link>
            <button disabled={addedUsers?.includes(user?.email) || disabled || isExist?.includes(user?.email)} onClick={handleAddFriend} className='bg-yellow w-full rounded-full disabled:bg-gray-400'>{addedUsers?.includes(user?.email) || isExist?.includes(user?.email) ? <span className='flex items-center justify-center gap-1'><RiUserShared2Line /> Requested</span> : <span className='flex items-center justify-center gap-1'><AiOutlineUserAdd />Add Friend</span>}</button>
        </div>
    );
};

export default SinglePerson;