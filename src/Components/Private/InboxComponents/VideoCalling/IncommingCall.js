import React from 'react';
import { MdCall, MdCallEnd } from 'react-icons/md';

const IncommingCall = ({ answerCall, callEnd, caller }) => {
    return (
        <>
            <div className='w-[20%] h-fit xs:w-[70%] xxs:w-[70%] relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-2xl bg-purple-500 flex items-center flex-col'>
                <div className='p-3 flex justify-center items-center bg-purple-700 w-full'>
                    <p className='text-xl text-white font-semibold'>Calling...</p>
                </div>
                <div className='p-2 flex justify-center items-center h-full'>
                    <div>
                        <div className='p-3 flex justify-center items-center flex-col gap-1'>
                            <img className='rounded-full w-[90px] h-[90px] object-cover' src={caller?.img || "https://png.pngtree.com/png-vector/20190114/ourlarge/pngtree-vector-avatar-icon-png-image_313572.jpg"} alt="" />
                            <p className='text-lg font-semibold text-white'>{caller?.name || "Name"}</p>
                        </div>
                        <div className='w-full flex justify-center gap-5'>
                            <button className='px-3 py-1 bg-purple-900 hover:bg-purple-800 text-white rounded-full' onClick={answerCall}><MdCall className='text-3xl' /></button>
                            <button onClick={callEnd} className='px-3 py-1 bg-red-900 hover:bg-red-600 text-white rounded-full'><MdCallEnd className='text-3xl' /></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default IncommingCall;