import React from 'react';
import { SkeletonAvatar, SkeletonBlock } from 'skeleton-elements/react';

const MessagesLoader = () => {
    return (
        <div className='w-full opacity-50'>
            <div>
                <SkeletonBlock effect="wave" className='w-[190px] py-5 mx-8 rounded-bl-none rounded-lg' />
                <div className='flex items-center gap-2'>
                    <SkeletonAvatar effect="wave" className='w-8 h-8' />
                    <SkeletonBlock effect="wave" className='w-[70px] h-[6px]' />
                </div>
            </div>
            <div className='flex justify-end'>
                <span>
                    <SkeletonBlock effect="wave" className='w-[170px] py-5 mx-8 rounded-br-none rounded-lg' />
                    <div className='flex items-center justify-end gap-2'>
                        <SkeletonBlock effect="wave" className='w-[70px] h-[6px]' />
                        <SkeletonAvatar effect="wave" className='w-8 h-8' />
                    </div>
                </span>
            </div>
            <div>
                <SkeletonBlock effect="wave" className='w-[110px] py-5 mx-8 rounded-bl-none rounded-lg' />
                <div className='flex items-center gap-2'>
                    <SkeletonAvatar effect="wave" className='w-8 h-8' />
                    <SkeletonBlock effect="wave" className='w-[70px] h-[6px]' />
                </div>
            </div>
            <div className='flex justify-end'>
                <span>
                    <SkeletonBlock effect="wave" className='w-[100px] py-5 mx-8 rounded-br-none rounded-lg' />
                    <div className='flex items-center justify-end gap-2'>
                        <SkeletonBlock effect="wave" className='w-[70px] h-[6px]' />
                        <SkeletonAvatar effect="wave" className='w-8 h-8' />
                    </div>
                </span>
            </div>
            <div>
                <SkeletonBlock effect="wave" className='w-[120px] py-5 mx-8 rounded-bl-none rounded-lg' />
                <div className='flex items-center gap-2'>
                    <SkeletonAvatar effect="wave" className='w-8 h-8' />
                    <SkeletonBlock effect="wave" className='w-[70px] h-[6px]' />
                </div>
            </div>
        </div>
    );
};

export default MessagesLoader;