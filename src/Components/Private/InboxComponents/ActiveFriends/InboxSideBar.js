import { useDispatch, useSelector } from 'react-redux';
import ParticipantProfile from './ParticipantProfile/ParticipantProfile';
import SingleFriend from './SingleFriend';
import { MdArrowBack } from 'react-icons/md'
import { handleConversationInfo } from '../../../../features/toggle/toggleSlice';
import { useGetMyFriendsQuery } from '../../../../features/friends/friendsApi';

const InboxSideBar = () => {
    const collapse = useSelector(state => state.toggle.sidebarToggle);
    const conversationInfo = useSelector(state => state.toggle.conversationInfo);
    const dispatch = useDispatch();
    const { email } = useSelector(state => state.auth.user);
    const allactiveUsers = useSelector(state => state?.activeUsers?.activeUsers);
    const activeUsers = allactiveUsers.filter(userEmail => userEmail !== email);
    // console.log(allactiveUsers);
    const { data: friends, isLoading, isError, isSuccess } = useGetMyFriendsQuery(email);
    let content = null;

    if (isLoading) {
        content = "Loading..."
    }
    else if (!isLoading && !isError && isSuccess) {
        const activeFriends = friends.filter(friend => {
            return (activeUsers.includes(friend.friendship[0]) || activeUsers.includes(friend.friendship[1])) && friend;
        });
        if (!activeFriends.length) {
            content = <p className='px-4 py-3 text-gray-600 text-xl font-semibold'>You have no active friend</p>
        }
        else {
            content = activeFriends.map(activeFriend => <SingleFriend key={activeFriend._id} activeFriend={activeFriend} />)
        }
    }


    return (
        <div className={`${collapse ? 'w-0' : 'w-[320px]'} md:w-0 sm:w-0 xs:w-0 overflow-hidden h-full bg-secondary flex flex-col justify-start transition-all ease-in-out duration-300`}>
            <div className='px-4 h-[70px] w-full flex items-center gap-4 border-b border-primary'>
                <button onClick={() => dispatch(handleConversationInfo(false))} className={`flex items-center gap-1 text-base text-white hover:text-yellow ${!conversationInfo && "hidden"} transition-all ease-in-out`}><MdArrowBack />Back</button>
                <h3 className={`flex items-center gap-1 text-lg font-semibold text-white ${conversationInfo && "hidden"} transition-all ease-in-out`}>Active friends</h3>
            </div>
            <div>
                {!conversationInfo ?
                    <div>
                        {content}
                    </div>
                    : <ParticipantProfile />
                }
            </div>
        </div>
    );
};

export default InboxSideBar;