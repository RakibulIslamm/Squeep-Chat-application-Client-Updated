import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';


const SettingsCustomLink = ({ children, to, ...props }) => {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });
    return (
        <Link
            className={`px-4 py-1 hover:text-yellow font-medium ${match ? 'border border-yellow rounded-lg text-yellow' : 'text-gray-400'}`}
            to={to}
            {...props}
        >
            {children}
        </Link>
    );
};

export default SettingsCustomLink;