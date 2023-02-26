import { useSelector } from "react-redux";


const useAuth = () => {
    const { user, regLoading } = useSelector(state => state.auth);

    if (regLoading) {
        return false
    }
    else if (user.email) {
        return true
    }
    else {
        return false
    }
}

export default useAuth;