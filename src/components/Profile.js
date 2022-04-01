import { useParams } from 'react-router-dom';
import Header from './Header';
import ProfileHeader from './ProfileHeader';
import ProfileBio from './ProfileBio';
import { useAuthContext } from '../hooks/useAuthContext';
import { useProfileType } from '../hooks/useProfileType';
import ProfileFriends from './ProfileFriends';
import ProfilePosts from './ProfilePosts';
import ProfileFriendsTab from './ProfileFriendsTab';
import Spinner from './utils/Spinner'
import ProfileEdit from './ProfileEdit';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useFetchProfile } from '../hooks/useFetchProfile';

const Profile = ({ profileView }) => {
  const { userId } = useParams();
  const { user: currentUser } = useAuthContext();
  const { fetchProfile, profileUser, loading, error } = useFetchProfile();
  const { profileType } = useProfileType(profileUser, currentUser);

  // Extract any state passed from edit profile page
  let location = useLocation();

  useEffect(() => {
    // State has been passed from edit profile page (i.e. user updated profile details)
    if (location.state) {
      // Somehow refresh the fetch call here
      fetchProfile(userId);
    }
  }, [location.state, fetchProfile, userId]);

  // Initial render
  useEffect(() => {
    fetchProfile(userId);
  }, [fetchProfile, userId]);

  return (
    <div>
      <Header />

      <Spinner loading={loading}/>

      {(profileUser && profileType) && (
        <div className="w-full flex justify-center items-center flex-col">
          <section className='shadow-sm mb-6 w-full'>
            <ProfileHeader profileUser={profileUser.user} profileType={profileType}/>
          </section>
          {profileView === 'main' && (
            <div className='flex flex-col lg:flex-row lg:items-start items-center justify-center w-full max-w-4xl'>
            <div className='lg:mr-6 lg:w-[376px] w-full shrink-0 flex flex-col items-center justify center'>
              {profileUser.user.bio && (
                <section className='shadow-sm mb-6 rounded max-w-2xl w-full'>
                  <ProfileBio profileUser={profileUser.user}/>
                </section>
              )}
              <section className='shadow-sm mb-6 rounded max-w-2xl w-full'>
                <ProfileFriends profileUser={profileUser.user}/>
              </section>
              </div>
              <section className='mb-6 rounded max-w-2xl w-full'>
                <ProfilePosts profileUser={profileUser.user}/>
              </section>
            </div>
          )}
          {profileView === 'friends' && (
            <section className='mb-6 rounded sm:max-w-2xl lg:max-w-4xl w-full'>
              <ProfileFriendsTab profileUser={profileUser.user}/>        
            </section>
          )}
          {profileView === 'edit' && (
            <section className='shadow-sm mb-6 rounded sm:max-w-2xl lg:max-w-4xl w-full'>
              <ProfileEdit profileUser={profileUser.user}/>
            </section>
          )}
        </div>)}
    </div>
  )
}

export default Profile