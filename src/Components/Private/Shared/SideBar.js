import logo from '../../../images/msgIcon.png'
import { AiOutlineHome } from 'react-icons/ai'
import { BiMessageDetail, BiStar } from 'react-icons/bi'
import { IoPeopleOutline, IoSettingsOutline, IoExitOutline } from 'react-icons/io5'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import CustomLink from '../../../utils/CustomLink';
import { useDispatch, useSelector } from 'react-redux';
import { collapseSidebar } from '../../../features/toggle/toggleSlice'
import useFirebase from '../../../Hooks/useFirebase'
import { useNavigate } from 'react-router-dom'

const SideBar = () => {
    const toggle = useSelector(state => state.toggle.sidebarToggle)
    const { email } = useSelector(state => state.auth.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { logOut } = useFirebase();

    const handleLogOut = () => {
        logOut(navigate, email);
    }

    return (
        <div className={`${toggle ? 'w-[200px]' : 'w-[60px]'} xxs:w-0 xs:w-0 sm:w-0 h-full bg-sidebarBg py-6 flex flex-col justify-between items-center overflow-hidden transition-all ease-in-out duration-300`}>
            <div className='w-full flex items-center h-[70px] px-4'>
                <img className=' w-[40px]' src={logo} alt="" />
                <p className={`absolute transform ${toggle ? 'opacity-100 translate-x-12 duration-300' : 'opacity-0 translate-x-20 duration-200'} transition-all ease-in-out font-semibold text-white`}>Squeep</p>
            </div>

            <div className='w-full'>
                <CustomLink title='Home' to={'/my-profile'}>
                    <AiOutlineHome className='text-2xl xs:text-xl' />
                    <p className={`absolute transform ${toggle ? 'opacity-100 translate-x-10 duration-300' : 'opacity-0 translate-x-20 duration-200'} transition-all ease-in-out`}>Home</p>
                </CustomLink>
                <CustomLink title='Messages' to={`/inbox`}>
                    <BiMessageDetail className='text-2xl xs:text-xl' />
                    <p className={`absolute transform ${toggle ? 'opacity-100 translate-x-10 duration-300' : 'opacity-0 translate-x-20 duration-200'} transition-all ease-in-out`}>Messages</p>
                </CustomLink>
                <CustomLink title='Find People' to={'/find-people'}>
                    <IoPeopleOutline className='text-2xl xs:text-xl' />
                    <p className={`absolute transform ${toggle ? 'opacity-100 translate-x-10 duration-300' : 'opacity-0 translate-x-20 duration-200'} transition-all ease-in-out`}>Find People</p>
                </CustomLink>
                <CustomLink title='Favorites' to={'/favorites'}>
                    <BiStar className='text-2xl xs:text-xl' />
                    <p className={`absolute transform ${toggle ? 'opacity-100 translate-x-10 duration-300' : 'opacity-0 translate-x-20 duration-200'} transition-all ease-in-out`}>Favorites</p>
                </CustomLink>
            </div>

            <div className='w-full'>
                <CustomLink title='Settings' to={'/settings'}>
                    <IoSettingsOutline className='text-2xl xs:text-xl' />
                    <p className={`absolute transform ${toggle ? 'opacity-100 translate-x-10 duration-300' : 'opacity-0 translate-x-20 duration-200'} transition-all ease-in-out`}>Settings</p>
                </CustomLink>
                <button onClick={handleLogOut} className='w-full py-4 pl-4 hover:bg-secondary text-white flex items-center gap-3 transition-all ease-in-out relative font-light' title='Logout' >
                    <IoExitOutline className='text-2xl xs:text-xl' />
                    <p className={`absolute transform ${toggle ? 'opacity-100 translate-x-10 duration-300' : 'opacity-0 translate-x-20 duration-200'} transition-all ease-in-out`}>Logout</p>
                </button>
            </div>
            <div className='w-full'>
                <button className='w-full py-4 pl-4 hover:bg-secondary text-white flex items-center gap-3 transition-all ease-in-out relative font-light' title='Collapse' onClick={() => dispatch(collapseSidebar())} >
                    {toggle ? <BsArrowLeft className='text-2xl xs:text-xl' /> : <BsArrowRight className='text-2xl' />}
                    <p className={`absolute transform ${toggle ? 'opacity-100 translate-x-10 duration-300' : 'opacity-0 translate-x-20 duration-200'} transition-all ease-in-out`}>Collapse</p>
                </button>
            </div>

        </div>
    );
};

export default SideBar;