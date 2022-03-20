import { useAuthContext } from "../hooks/useAuthContext";
import { useFetchGet } from "../hooks/useFetchGet";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import profilePicBlank from '../assets/profile-pic-blank.png';

const ProfileFriends = ({ profileUser }) => {
  const { data: friends, loading, error } = useFetchGet(`http://localhost:3000/api/users/${profileUser._id}/friends`);

  return (
    <div className="bg-white p-4 md:p-6 rounded">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-bold text-2xl">Friends</h2>
        <Link to="/" className="text-gray-600 underline">See all friends</Link>
      </div>
      {friends ? (
        <>
          {/* Friends array may exist but the user may not yet have any accepted friends. Hence this is checked here */}
          {friends.acceptedFriends ? (
            <>
              <h3 className="mb-4">{profileUser.numFriends !== 1 ? `${profileUser.numFriends} Friends` : '1 Friend'}</h3>
              <div className="flex flex-wrap gap-4 sm:gap-5">
                {/* Ensure only the first 9 freinds are rendered */}
                {friends.acceptedFriends.slice(0, 9).map((friend, index) => (
                  <div key={friend.user._id} className="">
                    {friend.user.profilePic ? (
                      <img src={friend.user.profilePic.imageUrl} alt="Profile picture" className='w-24 sm:w-32 rounded' />
                    ) : (
                      <img src={profilePicBlank} alt="Blank Profile picture" className='w-24 sm:w-32 rounded'/>
                    )}
                    <p className="text-xs sm:text-sm font-semibold mt-1 w-full text-center">{friend.user.fullName}</p>
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