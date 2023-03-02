import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAddConversationMutation } from '../../../features/conversations/conversationsAPI';
import { useGetMyFriendsQuery, useGetRequestedFriendsQuery, useSendFriendRequestMutation } from '../../../features/friends/friendsApi';
import { useGetUserQuery } from '../../../features/user/userApi';

const UserProfileInfo = ({ user }) => {
    const { email: myEmail } = useSelector(state => state.auth.user);
    const { data: requestedUsers, isLoading: reqLoading } = useGetRequestedFriendsQuery(myEmail);
    const { data: friends, isLoading } = useGetMyFriendsQuery(myEmail);
    const isRequested = requestedUsers?.find(request => request?.friendship?.includes(user?.email));
    const isFriend = friends?.find(request => request?.friendship?.includes(user?.email));
    const navigate = useNavigate();


    // Add friend
    const [disabled, setDisabled] = useState(false);
    const [addedUsers, setAddedUsers] = useState([]);
    const { data: currentUserData } = useGetUserQuery(myEmail) || {};

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
                isFriend: false
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
        <>
            <div className='w-full h-[350px] bg-secondary rounded-b-xl'>
                <img className='w-full h-full object-cover rounded-b-xl' src={user.coverImg || "http://wallpapers.net/web/wallpapers/lamp-at-the-wall-hd-wallpaper/828x350.jpg"} alt="" />
            </div>
            <div className='w-[750px] mx-auto'>
                <div className='relative -top-7 flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                        <div className='relative group cursor-pointer'>
                            <img className='w-[150px] h-[150px] object-cover rounded-full border-[5px] border-primary' src={user?.img || "https://www.seekpng.com/png/full/114-1149972_avatar-free-png-image-avatar-png.png"} alt="" />
                        </div>
                        <div>
                            <h3 className='text-2xl font-semibold text-white'>{user?.name}</h3>
                            <p className='text-light text-gray-400 text-sm'>@{user?.username}</p>
                        </div>
                    </div>
                    {(!isLoading && !reqLoading) && <div className='flex items-center gap-2'>
                        {(!isRequested && !isFriend && !addedUsers.includes(user?.email)) && <button onClick={handleAddFriend} className='text-gray-300 px-5 py-1 border border-gray-500 rounded-md' disabled={disabled}>Add Friend</button>}

                        {(isFriend && user?.email !== myEmail) && <button onClick={() => navigate(`/inbox/messages/${isFriend?.conversationId}`)} className='text-primary px-5 py-1 bg-yellow rounded-md'>Message</button>}

                        {(isFriend && user?.email !== myEmail) && <button className='text-gray-300 px-5 py-1 border border-gray-500 rounded-md'>Friend</button>}

                        {(isRequested || addedUsers.includes(user?.email)) && <button className='text-gray-300 px-5 py-1 border border-gray-500 rounded-md'>Requested</button>}

                        {(user?.email === myEmail) && <button onClick={() => navigate('/my-profile')} className='text-gray-300 px-5 py-1 border border-gray-500 rounded-md'>Your Profile</button>}
                    </div>}
                </div>
            </div>
        </>

    );
};

export default UserProfileInfo;