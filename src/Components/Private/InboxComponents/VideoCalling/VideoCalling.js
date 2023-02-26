import { BsFillMicFill, BsFillMicMuteFill } from 'react-icons/bs';
import { MdCallEnd } from 'react-icons/md';
import { IoCloseOutline, IoVideocamOffSharp, IoVideocamSharp } from 'react-icons/io5';

const VideoCalling = ({ remoteVideoRef, currentVideoRef, callEnd, toggleCamera, toggleMic, callAnswered, callTime, isVideoCall, participant, mic, camera, videoActive, caller }) => {

    return (
        <>
            {<div className='w-2/3 xs:w-[100%] xxs:w-[100%] xs:h-[100%] xxs:h-[100%] h-[90%] relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-2xl'>
                <div className='w-full h-full p-5 relative z-50'>
                    <div className='absolute w-full h-10 bg-purple-600 left-0 top-0 flex items-center justify-between pl-5'>
                        {callAnswered ? callTime?.hour && <p className='text-lg font-medium text-white'>{`${callTime?.hour}:${callTime?.minute}:${callTime?.seconds}`}</p> : <p className='text-lg font-medium text-white'>Calling...</p>}
                        <button onClick={callEnd} className='px-5 h-10 bg-purple-700 hover:bg-red-600 xxs:hidden xs:hidden'>
                            <IoCloseOutline className='text-2xl text-white' />
                        </button>
                    </div>

                    <div className='absolute right-5 bottom-5 xs:top-10 xxs:top-10 xs:right-0 xxs:right-0'>
                        <video ref={currentVideoRef} className={`${isVideoCall && 'w-[200px] h-[150px] xs:w-[130px] xxs:w-[130px] bg-gray-400 object-cover'}`} autoPlay playsInline muted></video>
                    </div>

                    <div className=' absolute bottom-6 left-1/2 transform -translate-x-1/2'>
                        <div className='text-white text-3xl flex items-center gap-5'>
                            {mic && <button onClick={toggleMic} className='p-3 rounded-full bg-gray-700 hover:bg-opacity-80'>
                                <BsFillMicFill />
                            </button>}
                            {!mic && <button onClick={toggleMic} className='p-3 rounded-full bg-gray-700 hover:bg-opacity-80'>
                                <BsFillMicMuteFill />
                            </button>}
                            <button onClick={callEnd} className='p-3 rounded-full bg-red-500 hover:bg-opacity-80'>
                                <MdCallEnd />
                            </button>
                            {isVideoCall && (camera ? <button onClick={toggleCamera} className='p-3 rounded-full bg-gray-700 hover:bg-opacity-80'>
                                <IoVideocamSharp />
                            </button> :
                                <button onClick={toggleCamera} className='p-3 rounded-full bg-gray-700 hover:bg-opacity-80'>
                                    <IoVideocamOffSharp />
                                </button>)
                            }
                        </div>
                    </div>
                </div>
                <div className='w-full h-full bg-slate-200 absolute top-0 z-20'>
                    <video ref={remoteVideoRef} className='w-full h-full bg-purple-400 object-cover' autoPlay playsInline></video>
                </div>
                {(!isVideoCall || !videoActive) && <div className='w-full h-full bg-black absolute top-0 flex justify-center items-center'>
                    {!caller?.name && <div className='relative z-50 flex flex-col items-center gap-4'>
                        <img className='w-[110px] h-[110px] rounded-full object-cover' src={participant?.img || 'https://www.seekpng.com/png/full/114-1149972_avatar-free-png-image-avatar-png.png'} alt="" />
                        <p className='text-2xl font-semibold text-white'>{participant?.name}</p>
                    </div>}
                    {caller?.name && <div className='relative z-50 flex flex-col items-center gap-4'>
                        <img className='w-[110px] h-[110px] rounded-full object-cover' src={caller?.img} alt="" />
                        <p className='text-2xl font-semibold text-white'>{caller?.name}</p>
                    </div>}
                </div>}
            </div>
            }
        </>
    );
};

export default VideoCalling;