import { useAuthContext } from '../hooks/useAuthContext';
import StyledLink from './utils/StyledLink';
import { useFetchGet } from '../hooks/useFetchGet';
import ProfilePic from './utils/ProfilePic';
import SkeletonSideMenu from './skeletons/SkeletonSideMenu';
import FriendsIcon from './icons/FriendsIcon';
import ProfileIcon from './icons/ProfileIcon';
import { Link } from 'react-router-dom';

// Home page mini-menu of sorts that displays the user's image, and a link to their friends and profile pages
const SideMenu = () => {
  const { user } = useAuthContext();
  const { data: userDetails, loading, error } = useFetchGet(`http://localhost:3000/api/users/${user._id}`);

  return (
    <aside className='flex flex-col w-[350px] fixed'>
      {loading && (
        <SkeletonSideMenu />
      )}

      {userDetails && (
        <div className='flex flex-col items-center justify-center rounded shadow-sm bg-white'>
          <div className=' bg-plum-600/20 w-full flex items-center rounded-t justify-center py-4'>
          <Link to={`/profile/${user._id}`} className="hover:opacity-95 active:opacity-100 outline-2 outline-plum-600">
            <ProfilePic image={userDetails.user.profilePic && userDetails.user.profilePic} styles="w-20 h-20 rounded-full border-2 border-white"/>
          </Link>

          </div>
          <div className='p-4 flex flex-col items-center justify-center w-full'>
            <p className='font-bold text-xl'>{userDetails.user.fullName}</p>
            <p className='text-sm mb-5'>
              {userDetails.user.numFriends !== 1 ? `${userDetails.user.numFriends} Friends` : '1 Friend'}
            </p>
            <nav aria-label="Secondary" className='w-full'>
              <StyledLink to={`/profile/${user._id}`} design="btn-ghost-lg" customStyles="mb-3">
                <ProfileIcon iconStyles="w-7 mr-3" />
                View profile
              </StyledLink>
              <StyledLink to={`/friends`} design="btn-ghost-lg">
                <FriendsIcon iconStyles="w-7 mr-3" />
                Friends
              </StyledLink>
            </nav>
          </div>
        </div>
      )}

      {error && (
        <div className='flex flex-col items-center justify-center rounded shadow-sm bg-white'>
          <div className=' bg-plum-600/20 w-full flex items-center rounded-t justify-center py-4'>
          <StyledLink to={`/profile/${user._id}`} customStyles="hover:opacity-95 active:opacity-100">
            <ProfilePic imgUrl={user.profilePic ? user.profilePic.imageUrl : null} styles="w-20 h-20 rounded-full border-2 border-white"/>
          </StyledLink>

        </div>
          <div className='p-4 flex flex-col items-center justify-center w-full'>
            <p className='font-bold text-xl mb-4'>{user.fullName}</p>
            <StyledLink to={`/profile/${user._id}`} design="btn-ghost-lg" customStyles="mb-3">
              <ProfileIcon iconStyles="w-7 mr-3" />
              View profile
            </StyledLink>
            <StyledLink to={`/friends`} design="btn-ghost-lg">
              <FriendsIcon iconStyles="w-7 mr-3" />
              Friends
            </StyledLink>
          </div>
      </div>
      )}
    </aside>
  )
}

export default SideMenu