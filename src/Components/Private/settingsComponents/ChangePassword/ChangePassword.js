import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import useFirebase from '../../../../Hooks/useFirebase';

const ChangePassword = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { changePassword, updatePassError, setUpdatePassError } = useFirebase();
    const { passUpdated } = useSelector(state => state.auth);

    const onSubmit = async data => {
        setUpdatePassError('');
        if (data.newPassword !== data.confirmPassword) {
            console.log('Password is not match');
            return;
        }
        changePassword(data.currentPassword, data.newPassword, reset);
    };
    return (
        <div className='py-3 flex flex-col gap-4'>
            <h2 className='text-xl font-semibold text-gray-300'>Change Password</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-2/4">
                {passUpdated && <div role="alert" className="rounded border-l-4 border-green bg-lime-200 px-4 py-2">
                    <strong className="block font-medium text-primary"> password updated successfully </strong>
                </div>}
                {updatePassError && <div role="alert" className="rounded border-l-4 border-red-500 bg-red-50 px-4 py-2">
                    <strong className="block font-medium text-red-700">{updatePassError}</strong>
                </div>}
                <div className='w-full'>
                    <input className='px-3 py-2 w-full border border-gray-600 outline-none rounded-lg bg-primary focus:border-gray-400 text-gray-300' {...register("currentPassword")} type="password" placeholder='Current Password' required />
                    {errors.email && <span>This field is required</span>}
                </div>
                <div className='w-full'>
                    <input className='px-3 py-2 w-full border border-gray-600 outline-none rounded-lg bg-primary focus:border-gray-400 text-gray-300' {...register("newPassword")} type="password" placeholder='New Password' required />
                    {errors.email && <span>This field is required</span>}
                </div>
                <div className='w-full'>
                    <input className='px-3 py-2 w-full border border-gray-600 outline-none rounded-lg bg-primary focus:border-gray-400 text-gray-300' {...register("confirmPassword")} type="password" placeholder='Confirm Password' required />
                    {errors.email && <span>This field is required</span>}
                </div>
                <button className='px-5 py-2 border border-gray-600 rounded-lg text-gray-700 bg-yellow disabled:bg-gray-600' type="submit">Update Password</button>
            </form>
        </div>
    );
};

export default ChangePassword;