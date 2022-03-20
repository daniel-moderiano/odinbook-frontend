import Button from './utils/Button';
import profilePicBlank from '../assets/profile-pic-blank.png';

const ProfileHeader = ({ profileUser, profileType }) => {
  return (
    <div className="w-full relative shadow-sm pb-7 bg-white flex flex-col items-center justify-center">
      <div className="bg-gradient-to-t from-gray-400 h-28 md:h-36 relative w-full"></div>
      <div className="w-full absolute flex items-center justify-center top-7 md:top-14 lg:top-24 lg:justify-start max-w-4xl">
        <div className="relative">
          {profileUser.profilePic ? (
            <img src={profileUser.profilePic.imageUrl} alt="Profile picture" className='w-40 lg:w-44 rounded-full border-4 border-white' />
          ) : (
            <img src={profilePicBlank} alt="Blank Profile picture" className='w-20 rounded-full border-4 border-white'/>
          )}
          <button className="absolute rounded-full bg-gray-200 w-9 h-9 flex items-center justify-center bottom-4 right-0 border-gray-300 border">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5">\
              <path d="M194.6 32H317.4C338.1 32 356.4 45.22 362.9 64.82L373.3 96H448C483.3 96 512 124.7 512 160V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V160C0 124.7 28.65 96 64 96H138.7L149.1 64.82C155.6 45.22 173.9 32 194.6 32H194.6zM256 384C309 384 352 341 352 288C352 234.1 309 192 256 192C202.1 192 160 234.1 160 288C160 341 202.1 384 256 384z"/>
            </svg>
        </button>
        </div>
      </div>
      <div className="w-full px-6 mt-20 pt-2 flex flex-col items-center justify-center max-w-2xl lg:mt-10 lg:flex-row lg:justify-between lg:ml-36 lg:px-0 lg:items-end lg:pb-2">
       <div className='lg:pl-4'>
        <h2 className="font-bold text-3xl mb-1">{profileUser.fullName}</h2>
        <p className="text-gray-600 mb-4 w-full text-center lg:text-left">
          {/* Adjust format of friends string for singular vs plural friends */}
          {profileUser.friends.length !== 1 ? `${profileUser.friends.length} Friends` : '1 Friend'}
        </p>
       </div>
        <div className='lg:-mr-10 lg:mb-4'>
          {profileType === 'friend' && (
            <Button design="ghost" customStyles="w-44">Friends</Button>
          )}
            {profileType === 'ownProfile' && (
            <Button design="primary" customStyles="w-44">Edit profile</Button>
          )}
            {profileType === 'nonFriend' && (
            <Button design="primary" customStyles="w-44">Add friend</Button>
          )}
        </div>
      </div>
    </div>
  )
}

// Set default type to nonFriend as the safest option
ProfileHeader.defaultProps = {
  profileType: 'nonFriend'
}

export default ProfileHeader;