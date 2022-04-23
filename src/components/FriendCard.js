import { Link } from 'react-router-dom';
import ProfilePic from './utils/ProfilePic';
import SendRequestBtn from './buttons/SendRequestBtn';
import AcceptRequestBtn from './buttons/AcceptRequestBtn';
import DeleteRequestBtn from './buttons/DeleteRequestBtn';
import CancelRequestBtn from './buttons/CancelRequestBtn';
import UnfriendRequestBtn from './buttons/UnfriendRequestBtn';

// Simple re-usable friend card that shows different buttons depending on the type of card/request involving that friend.
const FriendCard = ({ friendData, type }) => {

  return (
    <div className="shadow-sm flex lg:flex-col bg-white w-full p-3 border-t lg:rounded lg:w-[200px] lg:m-4 lg:items-center lg:justify-center lg:p-0 lg:shadow-sm lg:border-none">
      <Link to={`/profile/${friendData._id}`} className='flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 lg:h-[200px] lg:w-full mr-4 shrink-0 lg:m-0 lg:mb-2 lg:p-0 hover:opacity-95 active:opacity-100 outline-plum-600 outline-offset-2'>
        <ProfilePic image={friendData.profilePic && friendData.profilePic} styles="w-full h-full rounded-full lg:rounded-none" />
      </Link>

      <div className="flex flex-col justify-center w-full mb-1 lg:px-3 lg:pt-1.5 lg:pb-3 lg:items-center">
        <Link to={`/profile/${friendData._id}`} className='font-semibold text-base mb-2 lg:mb-3 lg:text-center whitespace-nowrap overflow-clip lg:max-w-[180px] hover:underline outline-plum-600 outline-offset-2'>{friendData.fullName}</Link>

        {type === 'friend' && (
          <UnfriendRequestBtn userId={friendData._id} customStyles="w-32 sm:w-36" />
        )}

        {type === 'incoming' && (<>
          <div className='flex lg:flex-col w-full items-center justify-center sm:max-w-xs lg:px-2'>
            <AcceptRequestBtn userId={friendData._id} customStyles="mr-3 lg:mr-0 lg:mb-2" />
            <DeleteRequestBtn userId={friendData._id} />
          </div>
        </>)}

        {type === 'outgoing' && (
          <CancelRequestBtn userId={friendData._id} customStyles="w-32 sm:w-36" />
        )}

        {type === 'user' && (
          <SendRequestBtn userId={friendData._id} customStyles="w-32 sm:w-36" />
        )}
      </div>
    </div>
  )
}

export default FriendCard