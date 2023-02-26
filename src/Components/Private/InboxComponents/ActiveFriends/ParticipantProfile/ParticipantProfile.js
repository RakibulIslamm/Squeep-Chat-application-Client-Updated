import React from 'react';
import { BsFillBellSlashFill } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import { BiSearch } from 'react-icons/bi'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom';
import { useGetSingleConversationQuery } from '../../../../../features/conversations/conversationsAPI';
import { useSelector } from 'react-redux';
import Tab from './Tab';

const ParticipantProfile = () => {
    const { email } = useSelector(state => state.auth.user);
    const { id } = useParams();
    const { data: conversation } = useGetSingleConversationQuery(id);
    const participant = conversation?.users?.find(p => p.email !== email);
    const navigate = useNavigate();

    return (
        <div className='w-full px-4 py-4 flex flex-col items-start'>
            <img className='w-[80px] h-[80px] rounded-full' src={participant?.img || "https://png.pngtree.com/png-vector/20190114/ourlarge/pngtree-vector-avatar-icon-png-image_313572.jpg"} alt="" />
            <h2 className='text-lg font-semibold text-white py-3'>{participant?.name}</h2>
            <div className='flex items-center gap-6 text-white'>
                <button onClick={() => navigate(`/profile/${participant?.username}`)} className='flex flex-col items-center text-sm gap-1'><FaUser className='text-2xl border rounded-full p-1' />Profile</button>
                <button className='flex flex-col items-center text-sm gap-1'><BsFillBellSlashFill className='text-2xl border rounded-full p-1' />Mute</button>
                <button className='flex flex-col items-center text-sm gap-1'><BiSearch className='text-2xl border rounded-full p-1' />Search</button>
            </div>
            <div className='mt-8 w-full space-y-3'>
                <Tab icon1={<MdKeyboardArrowDown />} icon2={<MdKeyboardArrowUp />} buttonName={'media'}>Media, files and links</Tab>
                <Tab icon1={<MdKeyboardArrowDown />} icon2={<MdKeyboardArrowUp />} buttonName={'privacy'}>Privacy and Support</Tab>
            </div>
        </div>
    );
};

export default ParticipantProfile;