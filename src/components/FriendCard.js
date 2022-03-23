import Button from './utils/Button';
import { Link } from 'react-router-dom';
import ProfilePic from './utils/ProfilePic';
import SendRequestBtn from './SendRequestBtn';
import AcceptRequestBtn from './AcceptRequestBtn';
import DeleteRequestBtn from './DeleteRequestBtn';
import CancelRequestBtn from './CancelRequestBtn';

const FriendCard = ({ friendData, type }) => {
  
  // Based on request type, buttons and actions will be unique
  return (
    <div className="shadow-sm flex lg:flex-col bg-white w-full p-3 border-t lg:rounded lg:w-52 lg:m-4 lg:items-center lg:justify-center lg:p-0 lg:shadow-sm lg:border-none">

      <Link to={`/profile/${friendData._id}`} className='flex items-center justify-center w-24 mr-4 shrink-0 lg:m-0 lg:mb-2 lg:w-full lg:p-0 hover:opacity-95 active:opacity-100'>
        <ProfilePic imgUrl={friendData.profilePic ? friendData.profilePic.imageUrl : null} styles="w-full rounded-full lg:rounded-none"/>
      </Link>

      <div className="flex flex-col justify-center w-full mb-1 lg:p-3 lg:items-center">
        <Link to={`/profile/${friendData._id}`} className='font-semibold text-base mb-2 lg:mb-3 lg:text-center whitespace-nowrap overflow-clip lg:max-w-[180px] hover:underline'>{friendData.fullName}</Link>

        {type === 'friend' && (
          <Button design="primary" customStyles="w-32">Unfriend</Button>
        )}

        {type === 'incoming' && (<>
          <div className='flex w-full items-center justify-center sm:max-w-xs'>
            <AcceptRequestBtn userId={friendData._id}/>
            <DeleteRequestBtn userId={friendData._id}/>
          </div>
        </>)}

        {type === 'outgoing' && (
          <CancelRequestBtn userId={friendData._id}/>
        )}

        {type === 'user' && (
          <SendRequestBtn userId={friendData._id}/>
        )}

      </div>
    </div>
  )
}

export default FriendCard