import React from 'react';
import { IoMdCall, IoMdVideocam, IoMdInformationCircle } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetSingleConversationQuery } from '../../../../features/conversations/conversationsAPI';
import { handleConversationInfo } from '../../../../features/toggle/toggleSlice'
import MessageHeaderLoader from '../../../../utils/Loader/MessageHeaderLoader';



const MessagesHeader = ({ videoCall, audioCall }) => {
    const conversationInfo = useSelector(state => state.toggle.conversationInfo);
    const { email } = useSelector(state => state.auth.user);
    const allactiveUsers = useSelector(state => state?.activeUsers?.activeUsers);
    const dispatch = useDispatch();
    const { id } = useParams();
    const { data: conversation, isLoading, isFetching } = useGetSingleConversationQuery(id);
    const participant = conversation?.users?.find(p => p.email !== email);
    // console.log(participant);

    let content = null;

    if (isLoading || isFetching) {
        content = <MessageHeaderLoader />
    }
    else if (!isLoading && conversation) {
        content = <div className='w-full flex items-center gap-3 xxs:gap-1 py-4'>
            <img className='rounded-full w-[35px] h-[35px] xxs:w-[25px] xxs:h-[25px] object-cover' src={participant?.img || "https://png.pngtree.com/png-vector/20190114/ourlarge/pngtree-vector-avatar-icon-png-image_313572.jpg"} alt="" />
            <div className='w-full'>
                <div>
                    <p className='font-bold text-sm xxs:text-xs text-[#9BA2B0]'>{participant?.name}</p>
                    <div className='flex items-center gap-1 xxs:hidden'>
                        <div className={`w-2 h-2 rounded-full ${allactiveUsers?.includes(participant?.email) ? 'bg-green' : 'bg-gray-500'}`}></div>
                        <p className='text-xs text-[#9BA2B0]'>{allactiveUsers?.includes(participant?.email) ? 'Online' : 'Offline'}</p>
                    </div>
                </div>
            </div>
        </div>
    }


    return (
        <div className='w-full h-[70px] bg-secondary px-6 xxs:px-3 border-l border-primary flex items-center justify-between border-r'>
            {content}
            <div className='flex items-center gap-4'>
                <button onClick={audioCall}><IoMdCall className='text-[30px] text-white rounded-full p-1 hover:bg-primary' /></button>
                <button onClick={videoCall}><IoMdVideocam className='text-[30px] text-white rounded-full p-1 hover:bg-primary cursor-pointer' /></button>
                <button onClick={() => dispatch(handleConversationInfo(true))}><IoMdInformationCircle className={`text-[30px] text-white rounded-full p-1 hover:bg-primary ${conversationInfo && 'bg-primary'}`} /></button>
            </div>
        </div>
    );
};

export default MessagesHeader;

/* 

<ContentLoader
            speed={2}
            width={150}
            height={40}
            viewBox="0 0 150 40"
            backgroundColor="#4c5f86"
            foregroundColor="#657eb1"
        >
            <rect x="43" y="10" rx="0" ry="0" width="100" height="6" />
            <circle cx="18" cy="18" r="18" />
            <rect x="43" y="20" rx="0" ry="0" width="55" height="6" />
        </ContentLoader>


*/