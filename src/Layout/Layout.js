import { Route, Routes } from "react-router-dom";
import FindFriend from "../Components/Private/ProfileComponents/FindFriend/FindFriend";
import Messages from "../Components/Private/InboxComponents/Messages/Messages";
import Inbox from "../Pages/Inbox";
import Login from "../Pages/Login";
import Profile from "../Pages/Profile";
import Register from "../Pages/Register";
import PrivateRoute from "../utils/Routes/PrivateRoute";
import PublicRoute from "../utils/Routes/PublicRoute";
import PrivateLayout from "./Private/PrivateLayout";
import PublicLayout from "./Public/PublicLayout";
import EmptyBody from "../Components/Private/InboxComponents/EmptyBody/EmptyBody";
import FriendRequest from "../Components/Private/ProfileComponents/FriendRequest/FriendRequest";
import Settings from "../Pages/Settings";
import AccountSettings from "../Components/Private/settingsComponents/AccountSettings";
import ChangePassword from "../Components/Private/settingsComponents/ChangePassword/ChangePassword";
import NotificationSettings from "../Components/Private/settingsComponents/NotificationSettings";
import NotFoundPage from "../Pages/NotFoundPage";
import FindPeoplePage from "../Pages/FindPeoplePage";
import UserProfile from "../Components/Private/UserProfile/UserProfile";
import UploadProfilePhoto from "../Components/Private/UploadProfilePhoto/UploadProfilePhoto";

function Layout() {

    return (
        <Routes>
            <Route path="/" element={<PublicRoute><PublicLayout /></PublicRoute>}>
                <Route index element={<Login />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Route>

            {/* Private Layout */}
            {/* inbox routes */}
            <Route path="/inbox" element={<PrivateRoute><PrivateLayout /></PrivateRoute>}>
                <Route path="/inbox" element={<Inbox />}>
                    <Route index element={<EmptyBody />} />
                    <Route path='messages/:id' element={<Messages />} />
                </Route>
            </Route>

            {/* My Profile routes */}
            <Route path="/my-profile" element={<PrivateRoute><PrivateLayout /></PrivateRoute>}>
                <Route path="/my-profile" element={<Profile />}>
                    <Route index element={<FindFriend />} />
                    <Route path="find-friends" element={<FindFriend />} />
                    <Route path="friend-requests" element={<FriendRequest />} />

                </Route>
            </Route>

            {/* User Profile routes */}
            <Route path="/profile/:username" element={<PrivateRoute><PrivateLayout /></PrivateRoute>}>
                <Route index element={<UserProfile />} />
            </Route>

            {/* settings route */}
            <Route path="/settings" element={<PrivateRoute><PrivateLayout /></PrivateRoute>}>
                <Route path="/settings" element={<Settings />}>
                    <Route index element={<AccountSettings />} />
                    <Route path="change-password" element={<ChangePassword />} />
                    <Route path="notification-settings" element={<NotificationSettings />} />
                </Route>
            </Route>

            <Route path="/find-people" element={<PrivateRoute><PrivateLayout /></PrivateRoute>}>
                <Route path="/find-people" element={<FindPeoplePage />} />
            </Route>


            <Route path='/upload-image' element={<PrivateRoute>
                <UploadProfilePhoto />
            </PrivateRoute>} />
            <Route path='*' element={<NotFoundPage />} />
        </Routes>
    );
}

export default Layout;