import profilePicBlank from '../assets/profile-pic-blank.webp';
import Button from './utils/Button';

const FriendCard = ({ friendData, type }) => {
  // Based on request type, buttons and actions will be unique
  return (
    <div className=" shadow-md flex lg:flex-col bg-white w-full p-3 border-b">

      <div className='flex items-center justify-center w-24 mr-4 shrink-0'>
        {friendData.profilePic ? (
          <img src={friendData.profilePic.imageUrl} alt="Profile picture" className='w-full rounded-full' />
        ) : (
          <img src={profilePicBlank} alt="Blank Profile picture" className='w-full rounded-full'/>
        )}
      </div>

      <div className="flex flex-col justify-center w-full mb-1">
        <p className='font-bold text-md mb-2'>{friendData.fullName}</p>

        {type === 'friend' && (
          <Button design="primary">Unfriend</Button>
        )}
        {type === 'incoming' && (<>
          <div className='flex w-full items-center justify-center'>
            <Button design="primary" customStyles="mr-3">Accept</Button>
            <Button design="ghost">Delete</Button>
          </div>
        </>)}
        {type === 'outgoing' && (
          <Button design="primary">Cancel</Button>
        )}
        {type === 'user' && (
          <Button design="primary" customStyles="w-32">Add friend</Button>
        )}
      </div>
    </div>
  )
}

export default FriendCard