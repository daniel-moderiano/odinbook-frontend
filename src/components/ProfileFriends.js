import { useFetchGet } from "../hooks/useFetchGet";
import { Link } from "react-router-dom";
import ProfilePic from "./utils/ProfilePic";
import { useErrorToast } from "../hooks/useErrorToast";
import SkeletonFriendTile from './skeletons/SkeletonFriendTile';

// The friends section of the main profile view
const ProfileFriends = ({ profileUser }) => {
  const { data: friends, loading, error } = useFetchGet(`${process.env.REACT_APP_API_ROUTE}/users/${profileUser._id}/friends`);

  // Set up notifications
  useErrorToast(error, 'An error occurred while loading friends.');

  return (
    <div className="bg-white p-4 md:p-6 rounded">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-bold text-2xl">Friends</h2>
        <Link to={`/profile/${profileUser._id}/friends`} className="text-gray-600 underline outline-plum-600 outline-offset-1">See all friends</Link>
      </div>

      {error && (
        <div className='mt-4 text-gray-800 text-sm w-full text-center'>Unable to load friends</div>
      )}

      {/* Display 9 skeleton friend tiles while loading, and render ellipsis for even consistent styling */}
      {loading && (
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-5 sm:gap-x-4 lg:gap-x-5 sm:justify-between friend:justify-center">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((number) => {
            return <SkeletonFriendTile key={number} />
          })}
          <span to={`/profile/${profileUser._id}/friends`} className="-mt-2 hidden text-4xl font-semibold w-24 h-24 sm:w-28 sm:h-28 lg:w-24 lg:h-24 friend:flex items-center justify-center text-gray-400">...</span>
        </div>
      )}

      {/* Ensure user has some freinds before attempting to render friend list */}
      {friends && (friends.acceptedFriends.length > 0) ? (
        <div>
          <h3 className="mb-4">{profileUser.numFriends !== 1 ? `${profileUser.numFriends} Friends` : '1 Friend'}</h3>
          <ul className="flex flex-wrap gap-x-5 gap-y-5 sm:gap-x-4 lg:gap-x-5 lg:gap-y-4 sm:gap-y-4">
            {/* Ensure only the first 9 freinds are rendered */}
            {friends.acceptedFriends.slice(0, 9).map((friend, index) => (
              <li key={friend.user._id} className="w-24 md:w-28 lg:w-24 ">
                {/* Width adjusts back to smaller size on large screens because the friends section becomes a side column instead of full screen width */}
                <Link to={`/profile/${friend.user._id}`} className="block hover:opacity-95 active:opacity-100 outline-plum-600 outline-offset-2">
                  <ProfilePic image={friend.user.profilePic && friend.user.profilePic} styles="w-24 h-24 md:w-28 md:h-28 lg:w-24 lg:h-24 rounded" />
                </Link>

                <Link to={`/profile/${friend.user._id}`} className="block text-xs md:text-sm lg:text-xs font-semibold mt-1.5 w-full text-center max-w-[96px] md:max-w-[112px] lg:max-w-[96px] hover:underline outline-plum-600">{friend.user.fullName}</Link>
              </li>
            ))}
            {/* Ellipsis link to indicate more friends specifically present to even the gap in friends on certain screen sizes */}
            {friends.acceptedFriends.length > 9 && (
              <Link to={`/profile/${profileUser._id}/friends`} className="hidden text-4xl font-semibold w-24 h-24 md:w-28 md:h-28 lg:w-24 lg:h-24 friend:flex items-center justify-center">
                <span className="-mt-4">...</span>
              </Link>
            )}
          </ul>
        </div>
      ) : (
        <div className="mt-4">No friends yet</div>
      )}
    </div>
  )
}

export default ProfileFriends;