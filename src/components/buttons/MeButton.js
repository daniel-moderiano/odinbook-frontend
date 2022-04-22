import ProfilePic from '../utils/ProfilePic';
import DropdownMenu from "../DropdownMenu";
import { useAuthContext } from "../../hooks/useAuthContext";
import CaretIcon from '../icons/CaretIcon';
import { useState } from 'react';

const MeButton = () => {
  const { user } = useAuthContext();
  const [showMenu, setShowMenu] = useState(false)

  return (
    <div className="relative" data-testid="outside">
      <button aria-controls="dropdown" aria-haspopup="true" aria-expanded={showMenu} role="menuitem" data-testid="user-menu" data-id="dropdown" onClick={() => {setShowMenu((prevState) => !prevState)}} className="w-full pb-[2px] pt-[4px] px-4 lg;px-12 lg:pb-0 lg:pt-[2px] lg:rounded flex flex-col items-center justify-center hover:bg-gray-100 outline-plum-600 outline-offset-[-2px] lg:outline-offset-[-1px]">
        <ProfilePic image={user.profilePic && user.profilePic} styles="mb-0.5 w-6 h-6 lg:w-8 lg:h-8 rounded-full pointer-events-none"/>
        <div className='flex items-center justify-center pointer-events-none'>
          <span id="me-dropdown" className="text-xs">Me</span>
          <CaretIcon iconStyles='w-2.5 ml-0.5 -mt-0.5 pointer-events-none' iconFill="#51557d"/>
        </div>
      </button>
      {showMenu && (
        <DropdownMenu closeMenu={() => setShowMenu(false)}/>
      )}
    </div>
  )
}

export default MeButton