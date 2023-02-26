import React from 'react';
import { Comment } from 'react-loader-spinner'


const PageLoader = ({ authChecked }) => {
    return (
        <div className='w-full h-screen flex justify-center items-center bg-transparent'>
            <Comment
                visible={true}
                height="100"
                width="100"
                ariaLabel="comment-loading"
                wrapperStyle={{}}
                wrapperClass="comment-wrapper"
                color="#fff"
                backgroundColor="#F4442E"
            />
        </div>
    );
};

export default PageLoader;