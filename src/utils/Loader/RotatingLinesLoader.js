import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

const RotatingLinesLoader = ({ color, size }) => {
    return (
        <RotatingLines
            strokeColor={color}
            strokeWidth="3"
            animationDuration="0.75"
            width={size}
            visible={true}
        />
    );
};

export default RotatingLinesLoader;