import { useFetchGet } from "../hooks/useFetchGet";
import { Link } from "react-router-dom";
import ProfilePic from "./utils/ProfilePic";

const ProfileFriends = ({ profileUser }) => {
  const { data: friends, loading, error } = useFetchGet(`http://localhost:3000/api/users/${profileUser._id}/friends`);

  return (
    <div className="bg-white p-4 md:p-6 rounded">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-bold text-2xl">Friends</h2>
        <Link to={`/profile/${profileUser._id}/friends`} className="text-gray-600 underline">See all friends</Link>
      </div>
      {friends ? (
        <>
          {/* Friends array may exist but the user may not yet have any accepted friends. Hence this is checked here */}
          {friends.acceptedFriends.length > 0 ? (
            <>
              <h3 className="mb-4">{profileUser.numFriends !== 1 ? `${profileUser.numFriends} Friends` : '1 Friend'}</h3>
              <div className="flex flex-wrap gap-x-4 gap-y-3 sm:gap-x-4 lg:gap-x-5">
                {/* Ensure only the first 9 freinds are rendered */}
                {friends.acceptedFriends.slice(0, 9).map((friend, index) => (
                  <div key={friend.user._id} className="">
                    {/* Width adjusts back to smaller size on large screens because the friends section becomes a side column instead of full screen width */}
                    <Link to={`/profile/${friend.user._id}`} className="block hover:opacity-95 active:opacity-100">
                      <ProfilePic imgUrl={friend.user.profilePic ? friend.user.profilePic.imageUrl : null} styles="w-24 sm:w-28 lg:w-24 rounded"/>
                    </Link>
  
                      <Link to={`/profile/${friend.user._id}`} className="block text-xs sm:text-sm lg:text-xs font-semibold mt-1.5 w-full text-center max-w-[96px] sm:max-w-[112px] lg:max-w-[96px] hover:underline">{friend.user.fullName}</Link>
                  </div>
                ))}
              </div>
            </>  
          ) : (
            <div>No friends yet</div>
          )}
        </>
      ) : (
        <div>Friends not loaded</div>
      )}
    </div>
  )
}

export default ProfileFriends;