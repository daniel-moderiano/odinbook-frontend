import { useAuthContext } from "../hooks/useAuthContext";
import { useFetchGet } from "../hooks/useFetchGet";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import profilePicBlank from '../assets/profile-pic-blank.png';

const ProfileFriends = ({ profileUser }) => {
  const { data: friends, loading, error } = useFetchGet(`http://localhost:3000/api/users/${profileUser._id}/friends`);

  console.log(profileUser);

  return (
    <div className="bg-white p-4 md:p-6 rounded">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-2xl">Friends</h2>
        <Link to="/" className="text-blue-600 underline">See all friends</Link>
      </div>
      {friends ? (
        <>
          {/* Friends array may exist but the user may not yet have any accepted friends. Hence this is checked here */}
          {friends.acceptedFriends ? (
            <>
              <h3>{friends.acceptedFriends.length} Friends</h3>
              <div className="grid grid-cols-3 align-middle justify-items-start gap-4">
                {/* Ensure only the first 9 freinds are rendered */}
                {friends.acceptedFriends.slice(0, 9).map((friend, index) => (
                  <div key={friend.user._id} className="">
                    {friend.user.profilePic ? (
                      <img src={friend.user.profilePic.imageUrl} alt="Profile picture" className='w-24 rounded' />
                    ) : (
                      <img src={profilePicBlank} alt="Blank Profile picture" className='w-24 rounded'/>
                    )}
                    <p className="text-xs font-semibold mt-1">{friend.user.fullName}</p>
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