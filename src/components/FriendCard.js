import profilePicBlank from '../assets/profile-pic-blank.png';
import Button from './utils/Button';

const FriendCard = ({ friendData, type }) => {
  // Based on request type, buttons and actions will be unique
  return (
    <div className="rounded shadow-md flex flex-col bg-white">
      <div className="w-full flex items-cmiddle justify-center">
        {friendData.user.profilePic ? (
          <img src={friendData.user.profilePic.imageUrl} alt="Profile picture" />
        ) : (
          <img src={profilePicBlank} alt="Blank Profile picture" />
        )}
      </div>
      <div className="flex flex-col justify-start items-middle p-4">
        <p className='font-bold text-lg'>{friendData.user.fullName}</p>
        {type === 'friend' && (
          <Button design="primary">Unfriend</Button>
        )}
        {type === 'incoming' && (<>
          <Button design="primary" customStyles="mb-2">Accept</Button>
          <Button design="ghost">Delete</Button>
        </>)}
        {type === 'outgoing' && (
          <Button design="primary">Cancel</Button>
        )}
        {type === 'user' && (
          <Button design="primary">Add friend</Button>
        )}
      </div>
    </div>
  )
}

export default FriendCard