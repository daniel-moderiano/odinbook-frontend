import ProfilePic from './utils/ProfilePic';
import { useAuthContext } from '../hooks/useAuthContext';
import { useScrollHeader } from '../hooks/useScrollHeader';

const DynamicHeader = () => {
  const { user } = useAuthContext();
  const { showHeader } = useScrollHeader();

  return (
    <div data-testid="dynamic" className={`fixed flex w-full h-[50px] bg-white shadow-md items-center justify-start ${showHeader ? 'top-0' : 'top-[-50px]'} transition-all duration-300 px-4`}>
        <ProfilePic imgUrl={user.profilePic ? user.profilePic.imageUrl : null} styles="w-9 h-9 rounded-full"/>
      <p>{`${user.firstName} ${user.lastName}`}</p>
    </div>
  )
}

export default DynamicHeader