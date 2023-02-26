import { useSelector } from 'react-redux';
import Message from './Message';
import { ThreeDots } from 'react-loader-spinner';
import MessagesHeader from './MessagesHeader';
import MessagesFooter from './MessagesFooter';
import { useParams } from 'react-router-dom';
import { useGetMessagesQuery, useSendMessageMutation } from '../../../../features/messages/messageAPI';
import MessagesLoader from '../../../../utils/Loader/MessagesLoader';
import { socket } from '../../../../utils/Socket.io/socket';
import { useGetSingleConversationQuery, useUpdateConversationMutation } from '../../../../features/conversations/conversationsAPI';
import VideoCalling from '../VideoCalling/VideoCalling';
import IncommingCall from '../VideoCalling/IncommingCall';
import { useEffect } from 'react';
import { useGetUserQuery } from '../../../../features/user/userApi';
import useCalling from '../../../../Hooks/useCalling';
import { useState } from 'react';
import { useRef } from 'react';
import MessageForward from '../MessageForward/MessageForward';
import { AiOutlineCloseSquare } from 'react-icons/ai'

const Messages = () => {
    const collapse = useSelector(state => state.toggle.sidebarToggle);
    const { email } = useSelector(state => state.auth.user);
    const { data } = useGetUserQuery(email);
    const [callOpen, setCallOpen] = useState(false);
    const [callAnswered, setCallAnswered] = useState(false);
    const [callTime, setCallTime] = useState({});
    const [forwardMessageData, setForwardMessageData] = useState({});
    let IntervalId = useRef(null);
    const [open, setOpen] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [replyImage, setReplyImage] = useState('');


    const { id } = useParams();
    const { data: messages, isLoading, isError } = useGetMessagesQuery({ conversationId: id, email });

    const handleForwardOpen = () => {
        setOpen(!open);
    }

    const handleMessageData = (messageData) => {
        setOpen(true);
        setForwardMessageData(messageData)
    }

    /* socket.on('delete-message', data => {
        if (data.conversationId === id) {
            refetch();
        }
    }) */

    const lastMessage = messages && messages[0];

    const { data: conversation, isLoading: pLoading, isError: pError } = useGetSingleConversationQuery(id);

    const participant = (!pLoading && !pError && conversation) && conversation?.users?.find(user => user.email !== email);

    const callerInfo = (!pLoading && !pError && conversation) && conversation?.users?.find(user => user.email === email);

    const { remoteVideoRef, currentVideoRef, call, callAnswer, callerId, setCallerId, setCallEnded, leaveCall, toggleCamera, toggleMic, localStreamRef, isVideoCall, mic, camera, videoActive, caller, users } = useCalling(data?._id);


    useEffect(() => {
        let intervalId;
        let totalSeconds = 0;
        if (callAnswered) {
            intervalId = setInterval(() => {
                ++totalSeconds;
                var hour = Math.floor(totalSeconds / 3600);
                var minute = Math.floor((totalSeconds - hour * 3600) / 60);
                var seconds = totalSeconds - (hour * 3600 + minute * 60);
                if (hour < 10)
                    hour = "0" + hour;
                if (minute < 10)
                    minute = "0" + minute;
                if (seconds < 10)
                    seconds = "0" + seconds;
                setCallTime({ hour, minute, seconds });
            }, 1000);
        }
        IntervalId.current = intervalId;
    }, [callAnswered])

    socket.on('callEnd', data => {
        // console.log(data);
        if (localStreamRef.current) {
            localStreamRef.current.getTracks().forEach(function (track) {
                track.stop();
            });
        }
        leaveCall();
        setCallOpen(false);
        setCallAnswered(false);
        clearInterval(IntervalId.current);
        setCallTime({});
    })


    socket.on('callAnswered', data => {
        setCallAnswered(true);
    })
    const [updateConversation] = useUpdateConversationMutation();
    const [sendMessage] = useSendMessageMutation();
    const callEndMessage = async () => {
        const callerr = users.users.find(user => user.email === users.caller);
        const receiver = users.users.find(user => user.email !== users.caller);
        const data = {
            conversationId: users.conversationId,
            sender: {
                name: callerr.name,
                email: callerr.email
            },
            receiver: {
                name: receiver.name,
                email: receiver?.email
            },
            message: users.callType === 'audio' ? 'Audio call' : 'Video call',
            callTime: callTime,
            img: '',
            timestamp: new Date().getTime(),
        }
        try {
            const messageText = users.callType === 'audio' ? 'Audio call' : 'Video Call';
            const messageData = { messageText, email: callerr.email, timestamp: new Date().getTime(), unseenMessages: conversation.unseenMessages, img: false };
            updateConversation({ messageData, id, email: callerr.email });
            // socket.emit("getMessage", data);
            sendMessage(data);
        }
        catch (err) {

        }
        finally {
            setCallEnded(false);
        }
    }

    const videoCall = () => {
        call(participant?._id, true, callerInfo);
        setCallOpen(true);
        socket.emit('users', ({ callType: 'video', caller: callerInfo.email, users: conversation.users, conversationId: conversation._id }));
    }
    const audioCall = () => {
        call(participant?._id, false, callerInfo);
        setCallOpen(true);
        socket.emit('users', ({ callType: 'audio', caller: callerInfo.email, users: conversation.users, conversationId: conversation._id }));
    }

    // console.log(callerId);
    const answerCall = () => {
        callAnswer(callerId, true);
        setCallOpen(true);
        setCallAnswered(true);
        socket.emit('callAnswered', true);
    }

    const callEnd = async () => {
        socket.emit('callEnd', true);
        leaveCall();
        setCallerId('');
        setCallOpen(false);
        setCallAnswered(false);
        clearInterval(IntervalId.current);
        callEndMessage();
    }



    const handleMessageBodyClick = () => {
        if (conversation.sender !== email && conversation.unseenMessages > 0) {
            // console.log(email, conversation.sender);
            const data = {
                message: lastMessage?.message || '',
                timestamp: lastMessage?.timestamp || '',
                whoSeen: lastMessage?.email || ''
            }
            socket.emit('message-notification', { id, data });
        }
    }

    let content = null;
    if (isLoading) {
        content = <MessagesLoader />
    }
    else if (!isLoading && isError) {

    }
    else if (!isLoading && !isError && !messages.length) {
        content = <div className='h-full flex justify-center items-center'>
            <p className='text-gray-400 text-xl font-semibold'>Start Conversation</p>
        </div>
    }
    else if (!isLoading && !isError && messages.length) {
        content = messages.map(message => <Message key={message._id} message={message} email={email} lastMessage={lastMessage} conversation={conversation} handleMessageData={handleMessageData} setReplyText={setReplyText} setReplyImage={setReplyImage} />)
    }

    return (
        <>
            {
                !isLoading && isError ? <div className='flex justify-center items-center'>
                    <h2 className='text-2xl text-gray-400 font-semibold'>Conversation Not found</h2>
                </div> :
                    <div onClick={handleMessageBodyClick} className={` md:w-[calc(100%_-_320px)] sm:w-[calc(100%_-_280px)] xs:w-full ${collapse ? 'w-[calc(100%_-_320px)]' : 'w-[calc(100%_-_640px)] relative'}  h-full transition-all ease-in-out duration-300`}>
                        <div className='h-full flex flex-col justify-between'>
                            {/* Inbox head */}
                            <MessagesHeader videoCall={videoCall} audioCall={audioCall} />
                            <div className='h-[calc(100%_-_140px)] w-full px-6 xxs:px-3 py-4 overflow-y-auto flex flex-col-reverse gap-4 scrollbar-thin scrollbar-thumb-lightBlack scrollbar-track-sidebarBg scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
                                {content}
                            </div>
                            {<div className='hidden'>
                                <div className='px-6 py-4 flex items-center gap-3'>
                                    <img className={`w-8 h-8 rounded-full`} src="https://png.pngtree.com/png-vector/20190114/ourlarge/pngtree-vector-avatar-icon-png-image_313572.jpg" alt="" />
                                    <span className='text-lg text-gray-800 flex items-end gap-1'>Typing<ThreeDots
                                        height="20"
                                        width="20"
                                        radius="9"
                                        color="#222021"
                                        ariaLabel="three-dots-loading"
                                        wrapperStyle={{}}
                                        wrapperClassName=""
                                        visible={true}
                                    /></span>

                                </div>
                            </div>}
                            {(replyText || replyImage) && <div className='px-10 py-3 bg-secondary text-white relative flex justify-between items-center gap-6'>
                                {!replyImage && <p>Reply: {replyText}</p>}
                                {replyImage && <div className='flex items-center gap-10'>
                                    <div>
                                        <p>Replying: {replyText}</p>
                                        <p>Photo</p>
                                    </div>
                                    <img className='w-[100px] max-h-[100px] object-cover' src={replyImage} alt="" />
                                </div>}
                                <button onClick={() => { setReplyText(''); setReplyImage('') }}><AiOutlineCloseSquare /></button>
                            </div>}
                            {/* Message Footer Goes Here */}
                            <MessagesFooter reply={{ replyText, replyImage }} setReply={{ setReplyImage, setReplyText }} />
                        </div>
                    </div>
            }
            {callOpen && <div className='absolute transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full z-50'>
                <VideoCalling caller={caller} videoActive={videoActive} mic={mic} camera={camera} participant={participant} isVideoCall={isVideoCall} callTime={callTime} callAnswered={callAnswered} toggleMic={toggleMic} toggleCamera={toggleCamera} currentVideoRef={currentVideoRef} remoteVideoRef={remoteVideoRef} callEnd={callEnd} callerId={callerId} callOpen={callOpen} />
            </div>}
            {(callerId && !callOpen) && <div className='absolute transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full'>
                <IncommingCall caller={caller} answerCall={answerCall} callEnd={callEnd} />
            </div>}
            {open && <div className='absolute transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full'>
                <MessageForward handleForwardOpen={handleForwardOpen} forwardMessageData={forwardMessageData} />
            </div>}
        </>
    );
};

export default Messages;