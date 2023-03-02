import moment from 'moment/moment';
import React, { useState } from 'react';
import { BsCheckCircleFill, BsThreeDots, BsCheckCircle } from 'react-icons/bs';
import { IoMdCall, IoMdVideocam } from 'react-icons/io';
import { RiShareForwardLine } from 'react-icons/ri';
import { useDeleteMessageMutation } from '../../../../features/messages/messageAPI';
import { useGetUserQuery } from '../../../../features/user/userApi';
import LightBox from '../../../../utils/LightBox/LightBox';

const Message = ({ email, message, conversation, handleMessageData, setReplyText, setReplyImage }) => {
    const [showDate, setShowDate] = useState(false);
    const [option, setOption] = useState(false)
    const { message: text, timestamp, sender, img, callTime, _id, replyText, replyImg } = message || {};
    const justify = email !== sender?.email ? 'justify-end' : 'justify-start';

    const { lastSeen, delivered, sent } = conversation || {};
    const participant = conversation?.users?.find(user => user?.email !== email);
    const { data } = useGetUserQuery(participant?.email);

    const [deleteMessage] = useDeleteMessageMutation()
    const handleDeleteMessage = (id) => {
        deleteMessage(id);
    }


    return (
        <div className={`flex ${justify} w-full`}>
            <div className='w-full'>
                {showDate && <p className={`text-xs text-[#8b99b3] mx-8 flex ${email === sender?.email ? 'justify-end' : 'justify-start'}`}>{moment(timestamp).format("dddd, Do MMMM, h:mm a")}</p>}
                <div className={`flex ${email === sender?.email ? ' justify-end' : 'justify-start'}`}>
                    <div className={`flex items-center ${email === sender?.email ? ' justify-end' : 'justify-end flex-row-reverse'} gap-4 group w-full`}>
                        {text !== 'message deleted' && <div id='manage-msg' className={`flex items-center gap-4 xxs:gap-3 ${email !== sender?.email && 'flex-row-reverse'}`}>
                            <div onClick={() => setOption(!option)} className={`relative xs:block group-hover:block text-2xl xxs:text-lg text-gray-500 transform rotate-90 ${option ? 'block' : 'hidden'}`} title='Manage'><BsThreeDots className='hover:text-white cursor-pointer' title='Manage' />
                                {option &&
                                    <div className={`absolute bg-white ${email !== sender?.email ? '-top-20' : 'top-0'} right-10 flex justify-center items-center flex-col text-sm transform -rotate-90`}>
                                        <button onClick={() => handleMessageData(message)} className='hover:bg-gray-200 px-3 py-2 block w-full' title='Forward this message to others'>Forward</button>
                                        <button onClick={() => handleDeleteMessage(_id)} className='hover:bg-gray-200 px-3 py-2 block w-full' title='Delete this message'>Delete</button>
                                    </div>
                                }
                            </div>
                            <button onClick={() => { setReplyText(text); setReplyImage(img) }} className={`${option ? 'block' : 'hidden'} xs:block group-hover:block text-2xl xxs:text-lg text-gray-500 hover:text-white ${email === sender?.email && 'transform -scale-x-100'}`} title='Reply'><RiShareForwardLine /></button>
                        </div>}
                        <div>
                            {img && <LightBox image={img} email={email} sender={sender} text={text} />}
                            {(replyImg || replyText) && <div className={`px-4 xxs:px-2 pb-4 pt-2 xxs:py-1 xxs:text-sm ${email === sender?.email ? 'bg-secondary text-lightBlack rounded-b-none border border-[#5E6778] mr-8 xxs:mr-6' : 'bg-[#333b49] text-white rounded-bl-none ml-8 xxs:ml-6'} rounded-lg break-words'} max-w-[300px] -mb-2`}>
                                <p className='text-xs text-white'><span>{sender?.email === email ? 'You' : participant?.name} Replied to {sender?.email !== email ? 'You' : participant?.name}:<br /></span>{replyImg ? 'photo' : replyText}</p>
                            </div>}
                            {text && <div className={`px-4 xxs:px-2 py-2 xxs:py-1 xxs:text-sm ${email === sender?.email ? text === 'message deleted' ? 'bg-gray-500 text-gray-200 rounded-br-none border border-[#5E6778] mr-8 xxs:mr-6' : 'bg-yellow text-lightBlack rounded-br-none border border-[#5E6778] mr-8 xxs:mr-6' : 'bg-secondary text-white rounded-bl-none ml-8 xxs:ml-6 border border-[#3e4550]'} rounded-lg break-words ${img && 'rounded-t-none w-[250px]'} max-w-[300px]`} onClick={() => setShowDate(!showDate)}>
                                {
                                    (text !== 'Audio call' && text !== 'Video call') ? text : text === 'Audio call' ?
                                        (<div className='flex items-center gap-2 opacity-80'>
                                            <IoMdCall className='text-3xl' />
                                            <div className=''>
                                                <p className='text-normal font-semibold'>Audio Call</p>
                                                <p className='text-xs'>{(callTime?.seconds || callTime?.minute || callTime?.hour) ? `${callTime?.minute} : ${callTime?.seconds} min` : 'missed call'}</p>
                                            </div>
                                        </div>) :
                                        (<div className='flex items-center gap-2 opacity-80'>
                                            <IoMdVideocam className='text-3xl' />
                                            <div className=''>
                                                <p className='text-normal font-semibold'>Video Call</p>
                                                <p className='text-xs'>{(callTime?.seconds || callTime?.minute || callTime?.hour) ? `${callTime?.minute} : ${callTime?.seconds} min` : 'missed call'}</p>
                                            </div>
                                        </div>)
                                }
                            </div>}
                        </div>
                    </div>
                </div>

                {(text || img) && <div className={`flex items-center gap-2 ${email === sender?.email ? 'flex-row-reverse' : ''}`}>
                    <div>
                        {sender?.email !== email ? <img className={`w-8 h-8 xxs:w-6 xxs:h-6 rounded-full object-cover`} src={data?.img || 'https://www.seekpng.com/png/full/114-1149972_avatar-free-png-image-avatar-png.png'} alt="" /> :
                            (lastSeen?.timestamp < timestamp && delivered.messageDelivered && delivered.timestamp >= timestamp && sent.messageSent) ? <BsCheckCircleFill className='mr-3 text-blue-700' /> : (lastSeen?.timestamp === timestamp && delivered.messageDelivered && sent.messageSent) ?
                                <img className={`w-4 h-4 rounded-full object-cover mr-3`} src={data?.img || 'https://www.seekpng.com/png/full/114-1149972_avatar-free-png-image-avatar-png.png'} alt="" /> :

                                (lastSeen?.timestamp < timestamp && sent.timestamp >= timestamp) && <BsCheckCircle className='mr-3 text-blue-700' />
                        }
                    </div>
                    <span className='text-xs xxs:text-[10px] text-gray-400'>{sender?.email !== email && sender?.name}</span>
                </div>}
            </div>
        </div>
    );
};

export default Message;