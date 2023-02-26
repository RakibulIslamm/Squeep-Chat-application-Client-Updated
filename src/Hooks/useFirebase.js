import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, getAuth, signOut, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authLogError, authRegError, logOutUser, passUpdated } from "../features/auth/authSlice";
import { useAddUserMutation } from "../features/user/userApi";
import { authApp } from '../Firebase/firebaseInit'
import { socket } from "../utils/Socket.io/socket";


const useFirebase = () => {
    const [loginLoading, setLoginLoading] = useState(false);
    const [regLoading, setRegLoading] = useState(false);
    const [updatePassError, setUpdatePassError] = useState('');
    const [addUser] = useAddUserMutation()
    const auth = getAuth(authApp);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Create account
    const createAccount = async (name, email, password) => {
        setRegLoading(true)
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            const user = result.user;
            // const currentUser = { name: name, email: user.email, img: user.photoURL }
            if (user?.email) {
                try {
                    await updateProfile(auth.currentUser, { displayName: name });
                    const { displayName, photoURL, email } = user;
                    const username = email.split('@')[0];
                    const userData = {
                        name: displayName,
                        username,
                        email,
                        img: photoURL
                    }
                    await addUser({
                        data: userData
                    })
                    navigate('/upload-image');
                }
                catch (err) {

                }
            }
        }
        catch (err) {
            dispatch(authRegError(err.message));
        }
        finally {
            setRegLoading(false);
        }
    }

    // Login
    const login = async (email, password, navigate) => {
        setLoginLoading(true);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password)
            const user = result.user;
            const currentUser = { name: user.displayName, email: user.email, img: user.photoURL }
            // console.log(currentUser);
        }
        catch (err) {
            dispatch(authLogError(err.message));
        }
        finally {
            setLoginLoading(false);
        }

    }

    // Change password
    const changePassword = (currentPassword, newPassword, reset) => {
        const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        reauthenticateWithCredential(user, credential)
            .then(async () => {
                // User re-authenticated.
                try {
                    await updatePassword(user, newPassword);
                    dispatch(passUpdated(true));
                    setTimeout(() => {
                        dispatch(passUpdated(false));
                    }, 20000);
                    reset();
                } catch (error) {
                    setUpdatePassError(error.message);
                }
            })
            .catch((error) => {
                // An error ocurred
                setUpdatePassError(error.message);
            });
        /*  */
    }

    // Log Out
    const logOut = (navigate) => {
        signOut(auth)
            .then(() => {
                dispatch(logOutUser());
                socket.disconnect();
                navigate('/login');
            })
            .catch((error) => {
                // An error happened.
            });
    }


    return {
        createAccount,
        login,
        logOut,
        loginLoading,
        regLoading,
        changePassword,
        updatePassError,
        setUpdatePassError
    }

}

export default useFirebase