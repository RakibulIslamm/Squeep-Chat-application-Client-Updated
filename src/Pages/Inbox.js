import { Outlet } from "react-router-dom";
import InboxSideBar from "../Components/Private/InboxComponents/ActiveFriends/InboxSideBar";
import Conversations from "../Components/Private/InboxComponents/Conversations/Conversations";


const Inbox = () => {
    return (
        <div className='w-full h-full flex justify-between'>
            <Conversations />
            <Outlet />
            <InboxSideBar />
        </div>
    );
};

export default Inbox;