import ProfilePic from './utils/ProfilePic';
import DropdownMenu from "./DropdownMenu";
import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import CaretIcon from './icons/CaretIcon';

const MeButton = () => {
  const { user } = useAuthContext();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
  };

  // Runs once only on initial mount, and cleans up on dismount
  useEffect(() => {
    // Ensure the post menu closes on outside click with a global window event listener
    const menuOutsideClick = (event) => {
      if (event.target.dataset.id !== 'dropdown') {
        setShowMenu(false);
      }      
    };

    const closeOnEsc = (event) => {
      if (event.key === 'Escape') {
        setShowMenu(false);
      }
    };

    window.addEventListener('click', menuOutsideClick);
    window.addEventListener('keydown', closeOnEsc);

    return () => {
      window.removeEventListener('click', menuOutsideClick);
      window.addEventListener('keydown', closeOnEsc);
    }
  }, [])

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