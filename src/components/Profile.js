import { useParams } from 'react-router-dom';
import Header from './Header';
import { useFetchGet } from '../hooks/useFetchGet';
import ProfileHeader from './ProfileHeader';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

const Profile = ({ ownProfile }) => {
  const { userId } = useParams();
  const { user: currentUser } = useAuthContext();
  // Fetch user data with either the 
  const { data: profileUser, loading, error } = useFetchGet(`http://localhost:3000/api/users/${ownProfile ? currentUser._id : userId}`);
  
  // Default profileType to nonFriend to be on the safe side in case of unexpected errors in checking profile type
  const [profileType, setProfileType] = useState('nonFriend');

  const findRelationshipType = (profileUser, currentUser) => {
    // The simplest case where the current user views their own profile
    if (currentUser._id === profileUser._id) {
      return 'ownProfile';
    }

    // Check if the friends list of the user whose profile is being viewed contains the currently logged in user (i.e. the current user is friends with the owner of this profile being rendered)
    if (profileUser.friends.some((friend) => (friend.status === 'friend' && friend.user === currentUser._id))) {
      return 'friend'
    }

    // The default case should be nonFriend, as this is the safest option in case of unexpected error/results
    return 'nonFriend';
  }

  // Dynamically set the profileType once all user data is available
  useEffect(() => {
    // Do not attempt relationship determination unless all fetched data is available for comparison
    if (profileUser && currentUser) {
      // Set the profile type based on the relationship
      setProfileType(findRelationshipType(profileUser.user, currentUser));
    }
  }, [profileUser, currentUser]);

  return (
    <div>
      <Header />
     {profileUser && (
        <div className="w-full flex justify-center mt-6">
        <ProfileHeader profileUser={profileUser.user} profileType={ownProfile ? 'ownProfile' : profileType}/>
        {/* ProfileHeader */}
        {/* ProfileNav - optional */}
        {/* ProfileBio/ProfileIntro */}
        {/* ProfileFriends */}
        {/* ProfilePosts */}
        {/* ProfilePhotos - optional */}
      </div>
     )}
    </div>
  )
}

export default Profile