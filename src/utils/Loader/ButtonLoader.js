import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

const ButtonLoader = () => {
    return (
        <ThreeDots
            height="10"
            width="50"
            radius="9"
            color="#30405F"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
        />
    );
};

export default ButtonLoader;