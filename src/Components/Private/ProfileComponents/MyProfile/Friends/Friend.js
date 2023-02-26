import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BsThreeDots } from 'react-icons/bs';

const Friend = ({ friend }) => {
    const { email } = useSelector(state => state.auth.user);
    const user = friend?.users?.find(u => u.email !== email);

    return (
        <div className='p-3 w-full rounded-xl border border-secondary flex items-center justify-between'>
            <div className='flex items-center gap-3'>
                <div className='w-[65px] h-[65px] flex items-center'>
                    <img className='rounded-xl w-full h-full object-cover' src={user?.img || "https://png.pngtree.com/png-vector/20190114/ourlarge/pngtree-vector-avatar-icon-png-image_313572.jpg"} alt="" />
                </div>
                <div>
                    <Link to={`/profile/${user?.username}`} className='font-normal text-white block'>{user?.name}</Link>
                    <Link to={`/inbox/messages/${friend?.conversationId}`} className='px-3 py-[3px] bg-yellow text-lightBlack rounded-full text-sm disabled:bg-gray-400'>Message</Link>
                </div>
            </div>
            <button><BsThreeDots className='text-xl text-white' /></button>
        </div>
    );
};

export default Friend;