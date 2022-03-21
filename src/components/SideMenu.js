import { useAuthContext } from '../hooks/useAuthContext';
import StyledLink from './utils/StyledLink';
import profilePicBlank from '../assets/profile-pic-blank.png';
import { useFetchGet } from '../hooks/useFetchGet';

const SideMenu = () => {
  const { user } = useAuthContext();
  
  const { data: userDetails, loading, error } = useFetchGet(`http://localhost:3000/api/users/${user._id}`);

  return (
    <aside className='flex flex-col w-[350px] fixed'>
      <div className='flex flex-col items-center justify-center rounded shadow-sm bg-white'>
        {userDetails ? (
          <>
            <div className=' bg-plum-600/20 w-full flex items-center rounded-t justify-center py-4'>
            <StyledLink to="/" customStyles="hover:opacity-95 active:opacity-100">
              {userDetails.user.profilePic ? (
                <img src={userDetails.user.profilePic.imageUrl} alt="Profile picture" className='w-20 rounded-full border-2 border-white' />
              ) : (
                <img src={profilePicBlank} alt="Blank Profile picture" className='w-20 rounded-full border-4 border-white'/>
              )}
            </StyledLink>

            </div>
            <div className='p-4 flex flex-col items-center justify-center w-full'>
              <p className='font-bold text-xl'>{userDetails.user.fullName}</p>
              <p className='text-sm mb-6'>
                {userDetails.user.numFriends !== 1 ? `${userDetails.user.numFriends} Friends` : '1 Friend'}
              </p>
              <StyledLink to="/" design="btn-ghost-lg" customStyles="mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-7 mr-3">
                  <path fill="#51557d" d="M512 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h448c35.35 0 64-28.65 64-64V96C576 60.65 547.3 32 512 32zM176 128c35.35 0 64 28.65 64 64s-28.65 64-64 64s-64-28.65-64-64S140.7 128 176 128zM272 384h-192C71.16 384 64 376.8 64 368C64 323.8 99.82 288 144 288h64c44.18 0 80 35.82 80 80C288 376.8 280.8 384 272 384zM496 320h-128C359.2 320 352 312.8 352 304S359.2 288 368 288h128C504.8 288 512 295.2 512 304S504.8 320 496 320zM496 256h-128C359.2 256 352 248.8 352 240S359.2 224 368 224h128C504.8 224 512 231.2 512 240S504.8 256 496 256zM496 192h-128C359.2 192 352 184.8 352 176S359.2 160 368 160h128C504.8 160 512 167.2 512 176S504.8 192 496 192z"/>
                </svg>
                View profile
              </StyledLink>
              <StyledLink to="/" design="btn-ghost-lg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="w-7 mr-3">
                  <path fill="#51557d" d="M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3c-95.73 0-173.3 77.6-173.3 173.3C0 496.5 15.52 512 34.66 512H413.3C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM479.1 320h-73.85C451.2 357.7 480 414.1 480 477.3C480 490.1 476.2 501.9 470 512h138C625.7 512 640 497.6 640 479.1C640 391.6 568.4 320 479.1 320zM432 256C493.9 256 544 205.9 544 144S493.9 32 432 32c-25.11 0-48.04 8.555-66.72 22.51C376.8 76.63 384 101.4 384 128c0 35.52-11.93 68.14-31.59 94.71C372.7 243.2 400.8 256 432 256z"/>
                </svg>
                Friends
              </StyledLink>
            </div>
          </>
        ) : <p>No user loaded</p>}
      </div>
    </aside>
  )
}

export default SideMenu