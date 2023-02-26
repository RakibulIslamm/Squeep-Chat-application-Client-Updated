import React from 'react';

const NotificationSettings = () => {
    return (
        <div className='w-full h-full flex justify-center mt-20'>
            <div className='p-3 space-y-6 w-[300px]'>
                <div className='flex items-center justify-between gap-5'>
                    <p className='text-lg font-medium text-white'>Push Notification</p>
                    <div className="relative h-6 w-12">
                        <label className='cursor-pointer'>
                            <input type="checkbox" className="peer sr-only" checked />
                            <span
                                className="absolute inset-0 rounded-full bg-gray-400 peer-checked:bg-green transition-all ease-in-out"
                            ></span>
                            <span
                                className="absolute inset-0 m-1 h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-6"
                            ></span>
                        </label>
                    </div>
                </div>
                <div className='flex items-center justify-between gap-5'>
                    <p className='text-lg font-medium text-white'>Chat Notification</p>
                    <div className="relative h-6 w-12">
                        <label className='cursor-pointer'>
                            <input type="checkbox" className="peer sr-only" />
                            <span
                                className="absolute inset-0 rounded-full bg-gray-400 peer-checked:bg-green transition-all ease-in-out"
                            ></span>
                            <span
                                className="absolute inset-0 m-1 h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-6"
                            ></span>
                        </label>
                    </div>
                </div>
                <div className='flex items-center justify-between gap-5'>
                    <p className='text-lg font-medium text-white'>Email Notification</p>
                    <div className="relative h-6 w-12">
                        <label className='cursor-pointer'>
                            <input type="checkbox" className="peer sr-only" />
                            <span
                                className="absolute inset-0 rounded-full bg-gray-400 peer-checked:bg-green transition-all ease-in-out"
                            ></span>
                            <span
                                className="absolute inset-0 m-1 h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-6"
                            ></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationSettings;