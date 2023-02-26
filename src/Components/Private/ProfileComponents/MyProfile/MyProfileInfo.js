import React, { useState } from 'react';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { TiCamera } from 'react-icons/ti'
import Compressor from 'compressorjs';
import { BsFillFileEarmarkImageFill } from 'react-icons/bs';
import { useUpdateUserCoverPhotoMutation } from '../../../../features/user/userApi';

const MyProfileInfo = ({ user }) => {
    const [updateCover, setUpdateCover] = useState(false);
    const [image, setImage] = useState('');
    const [file, setFile] = useState(null);
    const [uploading, setIsUploading] = useState(false);
    const { name, username, img, _id, coverImg } = user || {};
    const navigate = useNavigate();
    const [updateUserCoverPhoto, { isLoading }] = useUpdateUserCoverPhotoMutation()

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
                    await updateUserCoverPhoto({ id: _id, data: img });
                    setUpdateCover(false);
                }
                catch (err) {
                    console.log(err);
                }
                finally {
                    setImage('');
                    setIsUploading(false);
                }
            }
        })
    }


    return (
        <div className='relative'>
            <div className='w-full h-[300px] xs:h-[200px] xxs:h-[200px] bg-secondary rounded-b-xl relative'>
                <img className='w-full h-full object-cover rounded-b-xl' src={coverImg || "https://wallpapers.net/web/wallpapers/lamp-at-the-wall-hd-wallpaper/828x350.jpg"} alt="" />
                {!updateCover && <button onClick={() => setUpdateCover(!updateCover)} className=' absolute right-6 bottom-4 px-5 py-1 bg-white bg-opacity-25 rounded-lg hover:bg-opacity-100 transition-all ease-in-out font-medium flex items-center gap-2'><TiCamera />Edit cover photo</button>}
            </div>
            <div className='w-[700px] xxs:w-full xs:w-full mx-auto xxs:px-5 xs:px-5'>
                <div className='relative -top-5 flex items-center justify-between xs:flex-wrap xxs:flex-wrap gap-3 z-10'>
                    <div className='flex items-center gap-3'>
                        <div className='relative group cursor-pointer'>
                            <img className='w-[120px] h-[120px] object-cover rounded-full border-[5px] border-primary' src={img || "https://www.seekpng.com/png/full/114-1149972_avatar-free-png-image-avatar-png.png"} alt="" />
                            <div className='w-[120px] h-[120px] bg-black invisible rounded-full absolute top-0 left-0 opacity-0 border-[5px] border-primary group-hover:visible group-hover:opacity-70 transition-all'></div>
                            <MdOutlineAddPhotoAlternate className='absolute right-0 bottom-5 text-2xl text-white invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all' />
                        </div>
                        <div>
                            <h3 className='text-xl font-semibold text-white'>{name}</h3>
                            <p className='text-light text-gray-400 text-sm'>@{username}</p>
                        </div>
                    </div>
                    <button onClick={() => navigate('/settings')} className='text-gray-300 px-5 py-1 border border-gray-500 rounded-md xs:ml-auto xxs:ml-auto'>Edit Profile</button>
                </div>
            </div>

            {/* Cover photo update */}
            {updateCover && <div className='absolute top-0 right-0 w-full h-[300px] xs:h-[200px] xxs:h-[200px] bg-secondary z-0 bg-opacity-80'>
                {image ? <div className='w-full h-full flex items-center flex-col'>
                    <div className='w-full h-full relative'>
                        <img className='w-full h-full object-cover object-center' src={image.src} alt="" />

                        <div type='file' className=' absolute top-4 right-4'>
                            <input className='hidden' type="file" id="upload" onChange={handleImageChange} accept='image/*' />
                            <label className='px-3 bg-gray-300 rounded flex items-center gap-2 cursor-pointer hover:bg-opacity-80' htmlFor="upload"><BsFillFileEarmarkImageFill />Change</label>
                        </div>
                    </div>
                    <div className='absolute bottom-4 right-4 flex items-center gap-3'>
                        <button onClick={() => { setUpdateCover(!updateCover); setImage('') }} className="tracking-widest text-gray-100 py-1 px-4 bg-red-500 rounded" disabled={uploading}>Cancel</button>
                        <button onClick={() => handleUploadPhoto(file)} className='tracking-widest text-gray-700 bg-yellow px-6 py-1 rounded' disabled={uploading || isLoading}>{uploading ? 'Saving' : 'Save'}</button>
                    </div>
                </div> :

                    <div className='w-full h-full flex items-center justify-center relative'>
                        <input className='hidden' type="file" id="upload" onChange={handleImageChange} accept='image/*' />
                        <label className='px-4 py-1 bg-gray-500 rounded flex items-center gap-2 cursor-pointer hover:bg-opacity-80' htmlFor="upload"><BsFillFileEarmarkImageFill />Choose Image</label>
                        <button onClick={() => setUpdateCover(!updateCover)} className="tracking-widest text-gray-100 py-1 px-4 bg-red-500 rounded absolute bottom-4 right-4">Cancel</button>
                    </div>}
            </div>}
        </div>
    );
};

export default MyProfileInfo;