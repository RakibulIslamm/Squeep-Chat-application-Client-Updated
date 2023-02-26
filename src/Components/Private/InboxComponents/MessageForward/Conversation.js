import { useDispatch, useSelector } from 'react-redux';
import apiSlice from '../../../../features/api/apiSlice';
import { useUpdateConversationMutation } from '../../../../features/conversations/conversationsAPI';
import { useSendMessageMutation } from '../../../../features/messages/messageAPI';

const Conversation = ({ conversation, forwardMessageData, handleForwardOpen }) => {
    const { email } = useSelector(state => state.auth.user)
    const { _id, users } = conversation || {};
    const participant = users.find(user => user.email !== email);
    const currentUser = users.find(user => user.email === email);

    const [updateConversation] = useUpdateConversationMutation();
    const [sendMessage, { isLoading, isSuccess }] = useSendMessageMutation()

    const { message, img } = forwardMessageData || {}

    const dispatch = useDispatch();
    const sendForwardMessage = async () => {
        if (!forwardMessageData._id) {
            return;
        }
        const data = {
            conversationId: _id,
            sender: {
                name: currentUser?.name,
                email: currentUser?.email
            },
            receiver: {
                name: participant.name,
                email: participant?.email
            },
            message: message,
            img: img,
            timestamp: new Date().getTime(),
        }
        try {
            const messageData = {
                messageText: message, email, timestamp: new Date().getTime(), unseenMessages: conversation.unseenMessages, img: img ? true : false, sent: {
                    messageSent: true,
                    timestamp: new Date().getTime()
                }
            };
            updateConversation({ messageData, id: _id, email });
            const msg = await sendMessage(data).unwrap();
            dispatch(
                apiSlice.util.updateQueryData('getMessages', { conversationId: _id, email }, draft => {

                    draft.unshift(msg);
                })
            )
        }
        catch (err) {

        }
        finally {
            handleForwardOpen();
        }
    };


    return (
        <div className='p-2 flex justify-between items-center gap-10'>
            <div className='flex items-center gap-2'>
                <img className='w-[40px] h-[40px] object-cover rounded-full' src={participant?.img || "https://www.seekpng.com/png/full/114-1149972_avatar-free-png-image-avatar-png.png"} alt="" />
                <p className='text-gray-400 text-lg font-medium'>{participant?.name}</p>
            </div>
            {(!isLoading && !isSuccess) && <button onClick={sendForwardMessage} className='px-5 bg-yellow rounded-full'>Send</button>}
            {(isLoading && !isSuccess) && <button className='px-5 bg-gray-500 rounded-full' disabled>Sending</button>}
            {(!isLoading && isSuccess) && <button className='px-5 bg-gray-500 rounded-full' disabled>Sent</button>}
        </div>
    );
};

export default Conversation;