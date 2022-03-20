import { useParams } from 'react-router-dom';
import Header from './Header';
import { useFetchGet } from '../hooks/useFetchGet';
import ProfileHeader from './ProfileHeader';
import { useAuthContext } from '../hooks/useAuthContext';
import { useProfileType } from '../hooks/useProfileType';

const Profile = () => {
  const { userId } = useParams();
  const { user: currentUser } = useAuthContext();
  const { data: profileUser, loading, error } = useFetchGet(`http://localhost:3000/api/users/${userId}`);
  const { profileType } = useProfileType(profileUser, currentUser);

  return (
    <div>
      <Header />
     {(profileUser && profileType) ? (
      <div className="w-full flex justify-center">
        <section className='w-full'>
          <ProfileHeader profileUser={profileUser.user} profileType={profileType}/>
        </section>
        {profileUser.user.bio && (
          <section>
          
          </section>
        )}
        {/* ProfileNav - optional */}
        {/* ProfileBio/ProfileIntro */}
        {/* ProfileFriends */}
        {/* ProfilePosts */}
        {/* ProfilePhotos - optional */}
      </div>
     ) : (
       <div>User not loaded</div>
     )}
    </div>
  )
}

export default Profile