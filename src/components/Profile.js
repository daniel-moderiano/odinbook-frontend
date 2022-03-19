import { useParams } from 'react-router-dom';
import Header from './Header';
import { useFetchGet } from '../hooks/useFetchGet';
import ProfileHeader from './ProfileHeader';
import { useAuthContext } from '../hooks/useAuthContext';
import { useProfileType } from '../hooks/useProfileType';

const Profile = ({ ownProfile }) => {
  const { userId } = useParams();
  const { user: currentUser } = useAuthContext();
  const { data: profileUser, loading, error } = useFetchGet(`http://localhost:3000/api/users/${ownProfile ? currentUser._id : userId}`);
  const { profileType } = useProfileType(profileUser, currentUser);

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