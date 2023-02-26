import React from 'react';
import { BiArrowBack } from 'react-icons/bi';
const NotFoundPage = () => {
    return (
        <div className="grid h-screen px-4 bg-primary place-content-center space-y-4">
            <h1 className="tracking-widest text-gray-300 uppercase">404 | Page Not Found</h1>
            <button onClick={() => window.history.back()} className="tracking-widest text-primary bg-yellow flex items-center justify-center gap-2 py-1"><BiArrowBack /> Go Back</button>
        </div>
    );
};

export default NotFoundPage;