import profilePicBlank from '../assets/profile-pic-blank.webp';
import Button from './utils/Button';

const FriendCard = ({ friendData, type }) => {
  // Based on request type, buttons and actions will be unique
  return (
    <div className="shadow-sm flex lg:flex-col bg-white w-full p-3 border-t lg:rounded lg:w-52 lg:m-4 lg:items-center lg:justify-center lg:p-0 lg:shadow-md">

      <div className='flex items-center justify-center w-24 mr-4 shrink-0 lg:m-0 lg:mb-2 lg:w-full lg:p-0'>
        {friendData.profilePic ? (
          <img src={friendData.profilePic.imageUrl} alt="Profile picture" className='w-full rounded-full lg:rounded-none' />
        ) : (
          <img src={profilePicBlank} alt="Blank Profile picture" className='w-full rounded-full lg:rounded-none'/>
        )}
      </div>

      <div className="flex flex-col justify-center w-full mb-1 lg:p-3 lg:items-center">
        <p className='font-bold text-md mb-2 lg:mb-3'>{friendData.fullName}</p>

        {type === 'friend' && (
          <Button design="primary" customStyles="w-32">Unfriend</Button>
        )}
        {type === 'incoming' && (<>
          <div className='flex w-full items-center justify-center sm:max-w-xs'>
            <Button design="primary" customStyles="mr-3">Accept</Button>
            <Button design="ghost">Delete</Button>
          </div>
        </>)}
        {type === 'outgoing' && (
          <Button design="primary" customStyles="w-32 sm:w-36">Cancel</Button>
        )}
        {type === 'user' && (
          <Button design="primary" customStyles="w-32 sm:w-36">Add friend</Button>
        )}
      </div>
    </div>
  )
}

export default FriendCard