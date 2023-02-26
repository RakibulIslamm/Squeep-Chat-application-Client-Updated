import React from 'react';
import { SkeletonAvatar, SkeletonBlock } from 'skeleton-elements/react';

const MessageHeaderLoader = () => {
    return (
        <div className='flex items-center gap-2 opacity-50'>
            <SkeletonAvatar effect="wave" className='w-[40px] h-[40px]' />
            <div className='space-y-1'>
                <SkeletonBlock effect="wave" className='w-[100px] h-[8px]' />
                <SkeletonBlock effect="wave" className='w-[50px] h-[8px]' />
            </div>
        </div>
    );
};

export default MessageHeaderLoader;