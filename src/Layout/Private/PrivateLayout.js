import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import SideBar from "../../Components/Private/Shared/SideBar";
import { useGetUserQuery } from "../../features/user/userApi";
import { socket } from "../../utils/Socket.io/socket";

const PrivateLayout = () => {
    const { name, email } = useSelector(state => state.auth.user);
    const { data: user } = useGetUserQuery(email) || {};
    socket.connect();
    useEffect(() => {
        socket.on('connect', function (data) {
            //socket.emit('join', name);
            // console.log(data)
        });
    }, [name]);
    useEffect(() => {
        if (user?._id) {
            socket.emit('room', user?._id);
        }
    }, [user]);

    return (
        <div className='max-w-[1920px] min-h-[500px] xs:min-h-fit xxs:min-h-fit h-screen bg-primary mx-auto overflow-hidden flex items-start'>
            <SideBar />
            <Outlet />
        </div>
    );
};

export default PrivateLayout;