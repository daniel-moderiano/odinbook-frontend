import { useFetchGet } from "../hooks/useFetchGet";
import { Link } from 'react-router-dom';
import ProfilePic from "./utils/ProfilePic";
import { useErrorToast } from "../hooks/useErrorToast";
import SkeletonFriendTile from "./skeletons/SkeletonFriendTile";
import Spinner from "./utils/Spinner";
import SkeletonFriendTileLarge from "./skeletons/SkeletonFriendTileLarge";

const ProfileFriendsTab = ({ profileUser }) => {
  const { data: friends, loading, error } = useFetchGet(`http://localhost:3000/api/users/${profileUser._id}/friends`);

  // Set up notifications
  useErrorToast(error, 'An error occurred while loading friends.');

  return (
    <div className="bg-white p-4 md:p-6 rounded">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-bold text-2xl lg:mb-2">Friends</h2>
      </div>

      {error && (
        <div className='text-gray-700 text w-full text-start'>
          Unable to load friends
        </div>
      )}

      {loading && (
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-3 sm:gap-x-5 md:gap-x-10 lg:gap-3 sm:justify-between">
          {[0, 1, 2, 3].map((friend, index) => {
            return <SkeletonFriendTileLarge key={index}/>
          })}
        </div>
      )}

      {friends && (
        <>
          {/* Friends array may exist but the user may not yet have any accepted friends. Hence this is checked here */}
          {friends.acceptedFriends.length > 0 ? (
            <>
              <div className="flex flex-wrap gap-x-4 gap-y-3 sm:gap-x-5 md:gap-x-10 lg:gap-3 sm:justify-between mt-2">
                {friends.acceptedFriends.map((friend, index) => (
                  <div key={friend.user._id} className="flex flex-col items-center justify-start lg:flex-row lg:rounded lg:border lg:border-gray-200 lg:p-2 lg:w-[415px]">
                    <Link to={`/profile/${friend.user._id}`} className="hover:opacity-95 active:opacity-100">
                      <ProfilePic imgUrl={friend.user.profilePic ? friend.user.profilePic.imageUrl : null} styles="w-24 h-24 sm:w-28 sm:h-28 lg:w-24 lg:h-24 lg:mr-4 rounded"/>
                    </Link>
                    <div>
                      <Link to={`/profile/${friend.user._id}`} className="block text-xs sm:text-sm lg:text-lg font-semibold mt-2 w-full text-center max-w-[96px] sm:max-w-[112px] lg:max-w-xs lg:text-left hover:underline">{friend.user.fullName}</Link>
                    </div>
                  </div>
                ))}
              </div>
            </>  
          ) : (
            <div className="mt-4 mb-2">No friends yet</div>
          )}
        </>
      )}
    </div>
  )
}

export default ProfileFriendsTab;