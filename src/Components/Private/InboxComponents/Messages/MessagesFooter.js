import { BiImageAdd } from 'react-icons/bi'
import { MdSend } from 'react-icons/md'
import { BiArrowBack } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import apiSlice from '../../../../features/api/apiSlice';
import { useGetSingleConversationQuery, useUpdateConversationMutation } from '../../../../features/conversations/conversationsAPI';
import { useSendMessageMutation } from '../../../../features/messages/messageAPI';
import Compressor from 'compressorjs';
import { useEffect, useState } from 'react';
import { RxCrossCircled } from 'react-icons/rx';
import { useForm } from 'react-hook-form';

const MessagesFooter = ({ reply, setReply }) => {
    const { register, handleSubmit, setFocus, reset } = useForm();
    const [base64Img, setBase64Img] = useState('');
    // const [typing, setTyping] = useState('');
    const [imgLink, setImgLink] = useState('');
    const [uploading, setUploading] = useState(false);

    const { name, email } = useSelector(state => state.auth.user);
    const { id } = useParams();

    const { data: conversation } = useGetSingleConversationQuery(id);
    const [updateConversation] = useUpdateConversationMutation();
    const [sendMessage] = useSendMessageMutation()
    const receiver = conversation?.users?.find(user => user.email !== email);

    const { setReplyImage, setReplyText } = setReply;
    const { replyText, replyImage } = reply;

    const dispatch = useDispatch();
    const onSubmit = async msg => {
        const messageText = msg.message;
        if (!messageText && !imgLink) {
            return;
        }
        const data = {
            conversationId: id,
            sender: {
                name: name,
                email: email
            },
            receiver: {
                name: receiver.name,
                email: receiver?.email
            },
            message: messageText,
            img: imgLink,
            replyText: replyText,
            replyImg: replyImage,
            timestamp: new Date().getTime(),
        }
        try {
            const messageData = {
                messageText, email, timestamp: new Date().getTime(), unseenMessages: conversation.unseenMessages, img: imgLink ? true : false, sent: {
                    messageSent: true,
                    timestamp: new Date().getTime()
                }
            };
            updateConversation({ messageData, id, email });
            const msg = await sendMessage(data).unwrap();
            dispatch(
                apiSlice.util.updateQueryData('getMessages', { conversationId: id, email }, draft => {

                    draft.unshift(msg);
                })
            )
        }
        catch (err) {

        }
        finally {
            setImgLink('');
            setBase64Img('');
            setFocus("message");
            setReplyImage('');
            setReplyText('');
            reset();
        }
    };

    // Image compress function start>>
    const handleCompressedUpload = (image) => {
        // const image = e.target.files[0];
        if (!image) {
            console.log('Image not found')
            return;
        }
        new Compressor(image, {
            quality: .4, // 0.6 can also be used, but its not recommended to go below.
            success: async (compressedResult) => {
                // compressedResult has the compressed file.
                // Use the compressed file to upload the images to your server.
                const res = await getBase64(compressedResult);

                // imgbb image upload api start>>
                const baseUrl = res;
                setBase64Img(baseUrl);
                const formData = new FormData();
                const str = baseUrl.split(',')[1];
                formData.append('image', str);

                try {
                    const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_API}`, {
                        method: "POST",
                        body: formData
                    });
                    const data = await res.json();
                    setImgLink(data?.data?.display_url);
                }
                catch (err) {
                    console.log(err);
                }
                finally {
                    setUploading(false);
                }

                // imgbb image upload end<<
            },
        });
    };
    // Image compress function end<<

    const handleSendImage = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            console.log('Image not found');
            return;
        }
        setUploading(true);
        handleCompressedUpload(file);
    }

    // console.log(imgLink)

    // Get base64 function start>>
    const getBase64 = file => {
        return new Promise(resolve => {
            let baseURL = "";
            // Make new FileReader
            let reader = new FileReader();

            // Convert the file to base64 text
            reader.readAsDataURL(file);

            // on reader load somthing...
            reader.onload = () => {
                // Make a fileInfo Object
                baseURL = reader.result;
                resolve(baseURL);
            };
        });
    };
    // Get base64 function end<<

    // console.log(base64Img);
    useEffect(() => {
        if (base64Img && !uploading) {
            setFocus('message')
        }
    }, [base64Img, uploading, setFocus])


    return (
        <form onSubmit={handleSubmit(onSubmit)} className='w-full px-6 py-4 xxs:px-3 border-l border-r border-t border-secondary relative'>
            {base64Img && <div className='relative inline-block w-24 h-24 ml-5 mb-2'>
                <button type='button' onClick={() => { setBase64Img(''); setImgLink('') }} className='text-xl text-primary hover:text-red-500 absolute right-1 top-1'>
                    <RxCrossCircled className='' />
                </button>
                <img className='w-full h-full object-cover rounded' src={base64Img} alt="" />
                {uploading && <div className='w-full h-full bg-primary bg-opacity-70 absolute top-0'>
                    <p className={`text-xs absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white`}>Uploading...</p>
                </div>}
            </div>}
            <div className='flex items-center gap-3'>
                <button className='hidden xxs:block p-2 xxs:p-0 bg-yellow xxs:bg-transparent rounded-full'>
                    <BiArrowBack className='text-primary xxs:text-yellow text-2xl xxs:text-xl' />
                </button>

                <div className='w-full relative'>
                    <div className='w-full'>
                        <input className='w-full pl-4 xxs:pl-3 pr-20 xxs:pr-16 py-2 xxs:py-1 rounded-full bg-[#333f53] text-white outline-none border border-[#8b99b3] xxs:text-sm xxs:placeholder:text-xs' type="text" {...register("message")} placeholder='Type Your Message...' disabled={uploading} />
                    </div>
                    <div className='absolute top-1/2 right-3 transform -translate-y-1/2 flex items-center gap-2'>
                        <label className='relative'>
                            <BiImageAdd className='absolute right-0 top-1/2 transform -translate-y-1/2 text-white text-2xl xxs:text-xl cursor-pointer' />
                            <input onChange={handleSendImage} className='w-0' type="file" accept='image/*' />
                        </label>
                    </div>
                </div>
                <button type='submit' className='p-2 xxs:p-0 bg-yellow xxs:bg-transparent rounded-full disabled:bg-slate-300' disabled={uploading}>
                    <MdSend className='text-primary xxs:text-yellow text-2xl xxs:text-xl' />
                </button>
            </div>
        </form>
    );
};

export default MessagesFooter;