import { useFetchGet } from "../hooks/useFetchGet";
import profilePicBlank from '../assets/profile-pic-blank.png';

const ProfileFriendsView = ({ profileUser }) => {
  const { data: friends, loading, error } = useFetchGet(`http://localhost:3000/api/users/${profileUser._id}/friends`);

  return (
    <div className="bg-white p-4 md:p-6 rounded">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-2xl">Friends</h2>
      </div>
      {friends ? (
        <>
          {/* Friends array may exist but the user may not yet have any accepted friends. Hence this is checked here */}
          {friends.acceptedFriends ? (
            <>
              <div className="flex flex-wrap gap-x-4 gap-y-3 sm:gap-x-5 lg:gap-3">
                {friends.acceptedFriends.map((friend, index) => (
                  <div key={friend.user._id} className="flex flex-col items-center justify-start lg:flex-row lg:rounded lg:border lg:border-gray-200 lg:p-2 lg:w-[415px]">
                    {friend.user.profilePic ? (
                      <img src={friend.user.profilePic.imageUrl} alt="Profile picture" className='w-24 sm:w-28 rounded lg:w-24 lg:mr-4' />
                    ) : (
                      <img src={profilePicBlank} alt="Blank Profile picture" className='w-24 sm:w-28 rounded lg:w-24 lg:mr-4'/>
                    )}
                    <div>
                      <p className="text-xs sm:text-sm lg:text-lg font-semibold mt-2 w-full text-center max-w-[96px] sm:max-w-[112px] lg:max-w-xs lg:text-left">{friend.user.fullName}</p>
                    </div>
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

export default ProfileFriendsView