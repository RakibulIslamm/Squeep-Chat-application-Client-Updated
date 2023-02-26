import React from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import SinglePerson from './SinglePerson';
import { useFindPeopleQuery } from '../../../features/user/userApi';
import FriendRequest from './FriendRequest/FriendRequest';

const FindPeople = () => {
    const { email } = useSelector(state => state.auth.user)
    const { sidebarToggle } = useSelector(state => state.toggle)
    const { data: users, isLoading, isError, isSuccess } = useFindPeopleQuery(email);

    let content = null
    if (isLoading) {
        content = <p className='text-white'>Loading...</p>
    }
    else if (!isLoading && isError) {
        content = <p className='text-red-500'>Internal Server Error</p>
    }
    else if (!isLoading && !isError && !users.length) {
        content = <p className='text-white'>No People Found</p>
    }
    else if (!isLoading && !isError && isSuccess && users.length) {
        content = users.map(user => <SinglePerson key={user._id} user={user} />)
    }

    return (
        <div className='w-full h-full flex justify-center items-center flex-col'>
            <div className='w-5/6 flex justify-start text-2xl text-gray-300 pb-4'>
                <h2>Explore</h2>
            </div>
            <div className={`${sidebarToggle ? 'w-full h-5/6 px-10' : 'w-5/6 h-5/6'} flex items-start justify-start gap-4 transition-all ease-in-out`}>
                <div className='w-2/3 h-full bg-secondary border border-gray-600 p-4 space-y-3'>
                    <div className='w-full relative'>
                        <input className='w-full pl-5 py-2 pr-10 bg-primary text-gray-300 outline-gray-500 focus:outline-1' type="text" placeholder='Search people....' />
                        <button className='text-2xl text-gray-300 absolute top-1/2 right-2 transform -translate-y-1/2'>
                            <IoSearchOutline />
                        </button>
                    </div>
                    <div className='w-full max-h-[90%] overflow-y-auto grid grid-cols-4 gap-3 scrollbar-thin scrollbar-thumb-lightBlack scrollbar-track-sidebarBg'>
                        {content}
                    </div>
                </div>
                <FriendRequest />
            </div>
        </div>
    );
};

export default FindPeople;