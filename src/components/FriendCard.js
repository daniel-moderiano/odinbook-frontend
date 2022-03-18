import profilePicBlank from '../assets/profile-pic-blank.webp';
import Button from './utils/Button';

const FriendCard = ({ friendData, type }) => {
  // Based on request type, buttons and actions will be unique
  return (
    <div className="rounded shadow-md flex flex-col bg-white w-60">

      <div className="w-full flex items-cmiddle justify-center max-w-xs">
        {friendData.profilePic ? (
          <img src={friendData.profilePic.imageUrl} alt="Profile picture" />
        ) : (
          <img src={profilePicBlank} alt="Blank Profile picture" />
        )}
      </div>

      <div className="flex flex-col justify-start items-middle p-4">
        <p className='font-bold text-lg'>{friendData.fullName}</p>

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