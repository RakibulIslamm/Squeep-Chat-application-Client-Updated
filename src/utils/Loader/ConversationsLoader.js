import React from 'react';
import ContentLoader from 'react-content-loader';

const ConversationsLoader = () => {
    return (
        <ContentLoader
            viewBox="0 0 500 475"
            height={475}
            width={500}
            backgroundColor="#4c5f86"
            foregroundColor="#657eb1"
        >
            <circle cx="50" cy="50" r="30" />
            <rect x="95" y="55" width="150" height="10" />
            <rect x="95" y="35" width="170" height="12" />

            <circle cx="50" cy="140" r="30" />
            <rect x="95" y="145" width="150" height="10" />
            <rect x="95" y="125" width="170" height="12" />

            <circle cx="50" cy="230" r="30" />
            <rect x="95" y="235" width="150" height="10" />
            <rect x="95" y="215" width="170" height="12" />

            <circle cx="50" cy="320" r="30" />
            <rect x="95" y="325" width="150" height="10" />
            <rect x="95" y="305" width="170" height="12" />

            <circle cx="50" cy="410" r="30" />
            <rect x="95" y="415" width="150" height="10" />
            <rect x="95" y="395" width="170" height="12" />

        </ContentLoader>
    );
};

export default ConversationsLoader;