import React from 'react';
import { useState } from 'react';

const Tab = ({ children, icon1, icon2, buttonName }) => {
    const [tabActive, setTabActive] = useState([]);
    const handleTab = (e) => {
        if (tabActive.includes(e.target.innerText)) {
            const rest = tabActive.filter(t => t !== e.target.innerText);
            setTabActive(rest);
        }
        else {
            setTabActive([...tabActive, e.target.innerText]);
        }
    }

    return (
        <div className=' transition-all ease-in-out'>
            <button onClick={handleTab} className={`flex w-full items-center justify-between text-md font-semibold text-white border border-primary ${tabActive.includes(children) ? 'rounded-t-md' : 'rounded-md'} px-3 py-1`}>{children}{tabActive.includes(children) ? icon2 : icon1}</button>
            <div className={`w-full overflow-hidden bg-primary scrollbar-thin scrollbar-thumb-lightBlack scrollbar-track-sidebarBg scrollbar-thumb-rounded-full scrollbar-track-rounded-full ${tabActive.includes(children) ? 'max-h-[170px] overflow-y-auto p-3' : 'h-0'}`}>
                {buttonName === 'media' && <div>
                    <p>Media Section</p>
                </div>}
                {buttonName === 'privacy' && <div>
                    <p>Privacy Section</p>
                </div>}

            </div>
        </div>
    );
};

export default Tab;