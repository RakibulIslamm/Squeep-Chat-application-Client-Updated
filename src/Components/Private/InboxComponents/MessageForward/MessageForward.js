import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { IoSearchOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { useGetSearchedConversationQuery } from '../../../../features/conversations/conversationsAPI';
import Conversation from './Conversation';

const MessageForward = ({ handleForwardOpen, forwardMessageData }) => {
    const [searchText, setSearchText] = useState(null);
    const { email } = useSelector(state => state.auth.user);


    // Search Handled by De bounce function 
    const debounceHandler = (fn, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                fn(...args)
            }, delay);
        }
    }
    const doSearch = (value) => {
        if (value.length) {
            setSearchText(value);
        }
    }
    const handleSearch = debounceHandler(doSearch, 1000);
    // End De bounce

    const { data: conversations, isLoading, isError, isFetching } = useGetSearchedConversationQuery({ text: searchText, email }) || {};
    let content = null;
    if (isLoading || isFetching) {
        content = <p className='p-3 text-center'>Loading...</p>
    }
    else if (!isLoading && isError) {
        content = <p className='text-red-500 font-light px-5'>Something went wrong</p>
    }
    else if (!isLoading && !isError && !conversations.length && !searchText) {
        content = <p className='text-gray-500 font-semibold text-xl px-5'>Search Conversation</p>
    }
    else if (!isLoading && !isError && !conversations.length) {
        content = <p className='text-gray-500 font-semibold text-xl px-5'>No Conversation Found</p>
    }
    else if (!isLoading && !isError && conversations.length) {
        content = conversations.map(conversation => <Conversation key={conversation._id} conversation={conversation} forwardMessageData={forwardMessageData} handleForwardOpen={handleForwardOpen} />)
    }

    return (
        <>
            <div id='message-forward' className='min-w-[23%] w-fit xs:w-[70%] xxs:w-[70%] relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-2xl bg-secondary flex items-center flex-col border border-gray-700'>
                <div className='px-6 py-3 flex justify-between items-center bg-[#1d2535] w-full'>
                    <p className='text-xl text-white font-semibold'>Forward Message</p>
                    <button onClick={handleForwardOpen}>
                        <IoMdClose className='text-2xl text-white' />
                    </button>
                </div>
                <div className='w-full relative'>
                    <input onChange={(e) => handleSearch(e.target.value)} className={`border border-primary bg-[#2d3d57] pl-4 pr-10 py-2 text-white outline-primary w-full font-light`} type="text" placeholder='Search...' />
                    <button className='text-2xl text-white absolute top-1/2 right-2 transform -translate-y-1/2'>
                        <IoSearchOutline />
                    </button>
                </div>
                <div className='p-4 flex justify-start items-center flex-col gap-4 h-[250px] max-h-[45%] overflow-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-lightBlack scrollbar-track-[#1d2535]'>
                    {content}
                </div>
            </div>
        </>
    );
};

export default MessageForward;