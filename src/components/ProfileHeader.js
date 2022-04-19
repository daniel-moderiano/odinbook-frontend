import Button from './utils/Button';
import ProfileNav from './ProfileNav';
import ProfilePic from './utils/ProfilePic';
import { useState } from 'react';
import ProfilePicModal from './modals/ProfilePicModal';
import EditProfileModal from './modals/EditProfileModal';
import CameraIcon from './icons/CameraIcon';
import UnfriendRequestButton from './buttons/UnfriendRequestBtn';
import SendRequestButton from './buttons/SendRequestBtn';

const ProfileHeader = ({ profileUser, profileType }) => {
  const [showPicModal, setShowPicModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <div className="w-full relative bg-white flex flex-col items-center justify-center">
      <div className="bg-gradient-to-t from-plum-50 h-28 md:h-36 relative w-full"></div>
      <div className="w-full absolute flex items-center justify-center top-7 md:top-14 lg:top-24 lg:justify-start max-w-4xl">
        <div className="relative">
          <ProfilePic image={profileUser.profilePic && profileUser.profilePic} styles="w-40 h-40 lg:w-44 lg:h-44 rounded-full border-4 border-white"/>
          {profileType === 'ownProfile' && (
            <button data-testid="camera" className="absolute rounded-full bg-gray-200 w-9 h-9 flex items-center justify-center bottom-4 right-0 border-gray-300 border hover:bg-gray-300 active:scale-95" aria-haspopup="dialog" onClick={() => setShowPicModal(true)}>
              <CameraIcon iconFill="#000" iconStyles="w-5"/>
            </button>
          )}
        </div>
      </div>
      <div className="w-full px-6 mt-20 pt-2 flex flex-col items-center justify-center max-w-2xl lg:mt-10 lg:flex-row lg:justify-between lg:ml-36 lg:px-0 lg:items-end lg:pb-2">
       <div className='lg:pl-4'>
        <h2 className="font-bold text-3xl mb-1">{profileUser.fullName}</h2>
        <p className="text-gray-600 mb-4 w-full text-center lg:text-left">
          {profileUser.numFriends !== 1 ? `${profileUser.numFriends} Friends` : '1 Friend'}
        </p>
       </div>
        <div className='lg:-mr-10 lg:mb-4 z-10'>
          {profileType === 'friend' && (
            <UnfriendRequestButton userId={profileUser._id} customStyles="w-40"/>
          )}
          {profileType === 'ownProfile' && (
            <Button onClick={() => setShowEditModal(true)} design="primary" customStyles="w-40">Edit profile</Button>
          )}
          {profileType === 'nonFriend' && (
            <SendRequestButton design="primary" customStyles="w-40" userId={profileUser._id}/>
          )}
        </div>
      </div>
      <div className='w-full flex items-center justify-center lg:max-w-4xl lg:justify-start'>
        <ProfileNav profileUser={profileUser}/>
      </div>

      {showPicModal && (
        <ProfilePicModal closeModal={() => setShowPicModal(false)} profileUser={profileUser} />
      )}

      {showEditModal && (
        <EditProfileModal closeModal={() => setShowEditModal(false)} profileUser={profileUser} />
      )}
    </div>
  )
}

// Set default type to nonFriend as the safest option
ProfileHeader.defaultProps = {
  profileType: 'nonFriend'
}

export default ProfileHeader;
