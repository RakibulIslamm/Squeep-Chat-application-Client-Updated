import Compressor from 'compressorjs';
import React, { useState } from 'react';
import { BiUpload } from 'react-icons/bi';
import { BsFillFileEarmarkImageFill } from 'react-icons/bs';
import { TfiControlSkipForward } from 'react-icons/tfi';
import 'react-image-crop/dist/ReactCrop.css'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetUserQuery, useUpdateUserProfilePhotoMutation } from '../../../features/user/userApi';

const UploadProfilePhoto = () => {
    const [image, setImage] = useState('');
    const [file, setFile] = useState(null);
    const [uploading, setIsUploading] = useState(false);
    const navigate = useNavigate();
    const { email } = useSelector(state => state.auth.user) || {};
    const { data: user } = useGetUserQuery(email);
    const [updateUserProfilePhoto, { isLoading: updatePhotoLoading }] = useUpdateUserProfilePhotoMutation()

    const handleImageChange = (e) => {
        setImage({
            src: URL.createObjectURL(e.target.files[0]),
            alt: e.target.files[0].name
        })
        setFile(e.target.files[0]);
    }

    const handleUploadPhoto = async (file) => {
        setIsUploading(true);
        if (!file) {
            console.log('Image not found')
            return;
        }
        new Compressor(file, {
            quality: .4, // 0.6 can also be used, but its not recommended to go below.
            success: async (compressedResult) => {
                const formData = new FormData();
                formData.append("file", compressedResult);
                formData.append("upload_preset", "testttttttttttttttt");
                formData.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);

                try {
                    const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`, {
                        method: "post",
                        body: formData
                    });
                    const data = await res.json();

                    // Upload Image
                    const img = { img: data.secure_url };
                    updateUserProfilePhoto({ id: user?._id, data: img });
                    navigate('/my-profile');
                }
                catch (err) {
                    console.log(err);
                }
                finally {
                    setImage('');
                    setIsUploading(false)
                }
            }
        })
    }


    return (
        <div className="grid h-screen px-4 bg-primary place-content-center space-y-4">
            <h1 className="tracking-widest text-gray-300 text-center font-semibold text-lg">Upload Profile Photo</h1>
            {image ? <div className='w-[400px] h-[400px] bg-secondary flex items-center flex-col'>
                <div className='w-[400px] h-[350px] relative'>
                    <img className='w-full h-full object-cover object-center' src={image.src} alt="" />

                    <div type='file' className=' absolute top-4 right-4'>
                        <input className='hidden' type="file" id="upload" onChange={handleImageChange} accept='image/*' />
                        <label className='px-3 bg-gray-300 rounded flex items-center gap-2 cursor-pointer hover:bg-opacity-80' htmlFor="upload"><BsFillFileEarmarkImageFill />Change</label>
                    </div>
                </div>
                <button onClick={() => handleUploadPhoto(file)} className='w-full py-4 bg-yellow disabled:bg-slate-500 flex justify-center items-center gap-2' disabled={!image || uploading || updatePhotoLoading}><BiUpload />{(uploading || updatePhotoLoading) ? 'Uploading...' : 'Upload'}</button>
            </div> :

                <div className='w-[400px] h-[400px] bg-secondary flex items-center justify-center'>
                    <input className='hidden' type="file" id="upload" onChange={handleImageChange} accept='image/*' />
                    <label className='px-4 py-1 bg-gray-500 rounded flex items-center gap-2 cursor-pointer hover:bg-opacity-80' htmlFor="upload"><BsFillFileEarmarkImageFill />Choose Photo</label>
                </div>}
            <button onClick={() => navigate('/my-profile')} className="tracking-widest text-gray-400 flex items-center justify-center gap-2 py-1">Skip<TfiControlSkipForward /></button>
        </div>
    );
};

export default UploadProfilePhoto;