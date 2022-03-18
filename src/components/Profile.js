import { useParams } from 'react-router-dom';
import Header from './Header';

const Profile = () => {
  const { userId } = useParams();

  return (
    <div>
      <Header />
      <div className="w-full flex justify-center mt-6">
        {/* ProfileHeader */}
        {/* ProfileNav - optional */}
        {/* ProfileBio/ProfileIntro */}
        {/* ProfileFriends */}
        {/* ProfilePosts */}
        {/* ProfilePhotos - optional */}
      </div>
    </div>
  )
}

export default Profile