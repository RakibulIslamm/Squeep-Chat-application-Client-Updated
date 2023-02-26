import React, { useEffect, useState } from 'react';
import logo from '../images/msgIcon.png'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { Link } from 'react-router-dom';
import useFirebase from '../Hooks/useFirebase';
import ButtonLoader from '../utils/Loader/ButtonLoader';
import { useDispatch, useSelector } from 'react-redux';
import { authRegError } from '../features/auth/authSlice';

const Register = () => {
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState('');
    const authError = useSelector(state => state.auth.authRegError)

    const { createAccount, regLoading } = useFirebase();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(authRegError(null));
        setError('');
    }, [dispatch]);

    const handleCreateAccount = (e) => {
        setError('');
        e.preventDefault();
        const fName = e.target.firstName.value;
        const lName = e.target.lastName.value;
        const fullName = fName + ' ' + lName
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;
        if (password !== confirmPassword) {
            setError("Password didn't match")
            return
        }
        createAccount(fullName, email, password);

    }

    return (
        <div className='w-full h-screen flex justify-center items-center bg-secondary'>
            <form className='w-[400px] flex flex-col gap-3' onSubmit={handleCreateAccount}>
                <img src={logo} className='mb-8 w-20 mx-auto' alt='' />
                <h2 className='text-2xl font-semibold text-center text-white pb-3'>Register</h2>

                {/* Name and email fields */}
                <div className='flex items-center gap-3'>
                    <input className='border border-primary bg-[#2d3d57] px-4 py-2 text-white font-light outline-primary w-full' type="text" name='firstName' placeholder='First Name' required />
                    <input className='border border-primary bg-[#2d3d57] px-4 py-2 text-white font-light outline-primary w-full' type="text" name='lastName' placeholder='Last Name' required />
                </div>
                <input className='border border-primary bg-[#2d3d57] px-4 py-2 text-white font-light outline-primary w-full' type="email" name='email' placeholder='Enter Your Email' required />

                {/* Password Fields */}
                <div className='relative'>
                    <input className='border border-primary bg-[#2d3d57] pl-4 pr-10 py-2 text-white outline-primary w-full font-light' type={showPass ? 'text' : 'password'} name='password' placeholder='Password' required />
                    {!showPass && <AiOutlineEyeInvisible className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer' onClick={() => setShowPass(!showPass)} />}
                    {showPass && <AiOutlineEye className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-white' onClick={() => setShowPass(!showPass)} />}
                </div>
                <input className='border border-primary bg-[#2d3d57] pl-4 pr-10 py-2 text-white outline-primary w-full font-light' type='password' name='confirmPassword' placeholder='Confirm Password' required />
                {error && <p className='text-xs font-light text-red-500'>{error}</p>}

                {/* Submit button */}
                <button disabled={regLoading === true} className='px-4 h-11 bg-yellow text-lightBlack flex justify-center items-center' type="submit">{regLoading ? <ButtonLoader /> : 'Register'}</button>
                {authError && <p className='text-xs font-light text-red-500'>{authError}</p>}
                <div className='flex items-center gap-3'>
                    <p className='text-sm'>Already have an account?</p>
                    <Link to={'/login'} className='text-white text-sm font-extralight relative'>Login<span className='inline-block w-full h-[1px] bg-white absolute left-0 bottom-0'></span></Link>
                </div>
            </form>
        </div>
    );
};

export default Register;