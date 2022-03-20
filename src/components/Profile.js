import { useParams } from 'react-router-dom';
import Header from './Header';
import { useFetchGet } from '../hooks/useFetchGet';
import ProfileHeader from './ProfileHeader';
import ProfileBio from './ProfileBio';
import { useAuthContext } from '../hooks/useAuthContext';
import { useProfileType } from '../hooks/useProfileType';
import ProfileFriends from './ProfileFriends';
import ProfilePosts from './ProfilePosts';

const Profile = () => {
  const { userId } = useParams();
  const { user: currentUser } = useAuthContext();
  const { data: profileUser, loading, error } = useFetchGet(`http://localhost:3000/api/users/${userId}`);
  const { profileType } = useProfileType(profileUser, currentUser);

  return (
    <div>
      <Header />
     {(profileUser && profileType) ? (
      <div className="w-full flex justify-center items-center flex-col">
        <section className='shadow-sm mb-8 w-full'>
          <ProfileHeader profileUser={profileUser.user} profileType={profileType}/>
        </section>
        {profileUser.user.bio && (
          <section className='shadow-sm mb-8 rounded max-w-2xl w-full'>
            <ProfileBio profileUser={profileUser.user}/>
          </section>
        )}
        {/* ProfileNav - optional */}
        <section className='shadow-sm mb-8 rounded max-w-2xl w-full'>
          <ProfileFriends profileUser={profileUser.user}/>
        </section>
        
        <section className='shadow-sm mb-8 rounded max-w-2xl w-full'>
          <ProfilePosts profileUser={profileUser.user}/>
        </section>
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