import React from 'react';
import ContentLoader from 'react-content-loader';

const CoverImageLoader = ({ height }) => {
    return (
        <ContentLoader
            width={'100%'}
            height={height}
            // viewBox="0 0 800 200"
            backgroundColor="#4c5f86"
            foregroundColor="#657eb1"
        >
            <rect x="0" y="0" rx="0" ry='10' width="100%" height={height} />
        </ContentLoader>
    );
};

export default CoverImageLoader;