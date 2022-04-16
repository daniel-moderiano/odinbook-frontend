import ProfilePic from './utils/ProfilePic';
import DropdownMenu from "./DropdownMenu";
import { useAuthContext } from "../hooks/useAuthContext";
import CaretIcon from './icons/CaretIcon';
import { useDropdownMenu } from '../hooks/useDropdownMenu';

const MeButton = () => {
  const { user } = useAuthContext();
  const { showMenu, toggleMenu } = useDropdownMenu();

  return (
    <div className="relative" data-testid="outside">
      <button data-testid="user-menu" data-id="dropdown" onClick={toggleMenu} className="w-full pb-[2px] pt-[4px] px-4 lg;px-12 lg:pb-0 lg:pt-[2px] lg:rounded flex flex-col items-center justify-center hover:bg-gray-100">
        <ProfilePic imgUrl={user.profilePic ? user.profilePic.imageUrl : null} styles="mb-0.5 w-6 h-6 lg:w-8 lg:h-8 rounded-full pointer-events-none"/>
        <div className='flex items-center justify-center pointer-events-none'>
          <span className="text-xs">Me</span>
          <CaretIcon iconStyles='w-2.5 ml-0.5 -mt-0.5 pointer-events-none' iconFill="#51557d"/>
        </div>
      </button>
      {showMenu && (
        <DropdownMenu closeMenu={toggleMenu}/>
      )}
    </div>
  )
}

export default MeButton