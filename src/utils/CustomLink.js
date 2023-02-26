import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';


const CustomLink = ({ children, to, ...props }) => {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: false });

    return (
        <Link
            className={`w-full py-4 pl-4 hover:bg-secondary text-white flex items-center gap-3 transition-all ease-in-out relative font-light ${match ? 'border-r-4 border-yellow' : ''}`}
            to={to}
            {...props}
        >
            {children}
        </Link>
    );
};

export default CustomLink;