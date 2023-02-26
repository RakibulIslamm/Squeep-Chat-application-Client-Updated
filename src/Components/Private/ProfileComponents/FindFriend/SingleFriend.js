import { useState } from 'react';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { useAddConversationMutation } from '../../../../features/conversations/conversationsAPI';
import { useGetRequestedFriendsQuery, useSendFriendRequestMutation } from '../../../../features/friends/friendsApi';
import { useGetUserQuery } from '../../../../features/user/userApi';
import { RiUserShared2Line } from 'react-icons/ri';

const SingleFriend = ({ user }) => {
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
            const requestedPerson = { email: user.email, id: _id };
            const data = {
                participants: [email, user?.email],
                users: [user._id, _id],
                sender: '',
                lastMessage: '',
                unseenMessages: 0,
                timestamp: '',
                isFriend: false
            }
            const result = await addConversation({ data, email }).unwrap();
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
        <div className='flex items-center gap-4'>
            <div className='w-[60px] h-[60px] flex items-center'>
                <img className='rounded-full w-full h-full object-cover' src={user?.img || "https://png.pngtree.com/png-vector/20190114/ourlarge/pngtree-vector-avatar-icon-png-image_313572.jpg"} alt="" />
            </div>
            <div className='flex flex-col items-start gap-1'>
                <p className='font-normal text-lg text-white line-clamp-1'>{user?.name}</p>
                <button disabled={addedUsers?.includes(user?.email) || disabled || isExist?.includes(user?.email)} onClick={handleAddFriend} className='px-2 py-[1px] bg-yellow text-lightBlack rounded-full text-sm disabled:bg-gray-400'>{addedUsers?.includes(user?.email) || isExist?.includes(user?.email) ? <span className='flex items-center gap-1'><RiUserShared2Line /> Requested</span> : <span className='flex items-center gap-1'><AiOutlineUserAdd />Add Friend</span>}</button>
            </div>
        </div>
    );
};

export default SingleFriend;