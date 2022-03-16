import { useAuthContext } from '../hooks/useAuthContext';
import StyledLink from './utils/StyledLink';
import profilePicBlank from '../assets/profile-pic-blank.png';

const SideMenu = () => {
  const { user } = useAuthContext();

  return (
    <aside className='flex flex-col rounded shadow-md p-4'>
      <div className='flex flex-col items-center justify-center px-4'>
        {user.profilePic ? (
          <img src={user.profilePic.imageUrl} alt="Profile picture" className='w-5' />
        ) : (
          <img src={profilePicBlank} alt="Blank Profile picture" className='w-10 mr-4 rounded-full'/>
        )}
        <p className='font-bold'>{user.fullName}</p>
        <StyledLink to="/" design="btn-ghost" customStyles="mb-2">View profile</StyledLink>
        <StyledLink to="/" design="btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="w-8">
            <path fill="#51557d" d="M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3c-95.73 0-173.3 77.6-173.3 173.3C0 496.5 15.52 512 34.66 512H413.3C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM479.1 320h-73.85C451.2 357.7 480 414.1 480 477.3C480 490.1 476.2 501.9 470 512h138C625.7 512 640 497.6 640 479.1C640 391.6 568.4 320 479.1 320zM432 256C493.9 256 544 205.9 544 144S493.9 32 432 32c-25.11 0-48.04 8.555-66.72 22.51C376.8 76.63 384 101.4 384 128c0 35.52-11.93 68.14-31.59 94.71C372.7 243.2 400.8 256 432 256z"/>
          </svg>
          <p className='font-bold'>Friends</p>
        </StyledLink>
      </div>

        

    </aside>
  )
}

export default SideMenu