import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/msgIcon.png'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import ButtonLoader from '../utils/Loader/ButtonLoader';
import useFirebase from '../Hooks/useFirebase';
import { useDispatch, useSelector } from 'react-redux';
import { authLogError } from '../features/auth/authSlice';

const Login = () => {
    const [showPass, setShowPass] = useState(false);
    const { login, loginLoading } = useFirebase();
    const error = useSelector(state => state.auth.authLogError);
    const dispatch = useDispatch();



    useEffect(() => {
        dispatch(authLogError(null))
    }, [dispatch]);

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        login(email, password)
    }


    return (
        <div className='w-full h-full flex justify-center items-center'>
            <form onSubmit={handleLogin} className='w-[350px] flex flex-col gap-3'>
                <img src={logo} className='mb-8 w-20 mx-auto' alt='' />
                <h2 className='text-2xl font-semibold text-center text-white pb-3'>Login</h2>
                <input className='border border-primary bg-[#2d3d57] px-4 py-2 text-white font-light outline-primary' type="text" name='email' placeholder='Enter Your Email' required />
                <div className='relative'>
                    <input className='border border-primary bg-[#2d3d57] pl-4 pr-10 py-2 text-white outline-primary w-full font-light' type={showPass ? 'text' : 'password'} name='password' placeholder='Enter Your Password' required />
                    {!showPass && <AiOutlineEyeInvisible className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer' onClick={() => setShowPass(!showPass)} />}
                    {showPass && <AiOutlineEye className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-white' onClick={() => setShowPass(!showPass)} />}
                </div>
                <button disabled={loginLoading === true} className='px-4 h-11 bg-yellow text-lightBlack flex justify-center items-center' type="submit">{loginLoading ? <ButtonLoader /> : 'Login'}</button>
                {error && <p className='text-xs font-light text-red-500'>{error}</p>}
                {/* <ButtonLoader /> */}
                <div className='flex items-center gap-3'>
                    <p className='text-sm'>Don't have an account?</p>
                    <Link className='text-white text-sm font-extralight relative' to={'/register'}>Create an account<span className='inline-block w-full h-[1px] bg-white absolute left-0 bottom-0'></span></Link>
                </div>
            </form>
        </div>
    );
};

export default Login;