import { useLogout } from "../hooks/useLogout";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import LogoutIcon from "./icons/LogoutIcon";
import OdinbookIcon from './icons/OdinbookIcon';
import { useScrollHeader } from "../hooks/useScrollHeader";
import ProfilePic from './utils/ProfilePic';
import DropdownMenu from "./DropdownMenu";
import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

// Selectively render different style headers for mobile vs larger screens
const Header = () => {
  const { showHeader } = useScrollHeader();
  const { logout } = useLogout();
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
    <header role="banner" aria-labelledby="odinbook-logo" className={`shadow-md w-full fixed bg-white grid grid-cols-1 lg:grid-cols-3 content-center justify-items-center z-20 h-[50px] transition-all duration-300 top-0 lg:h-auto ${showHeader ? 'top-0' : 'top-[-50px] md:top-0'}`}>
      <Link to="/" className="items-center hidden lg:flex justify-self-start">
        <OdinbookIcon iconStyles='w-auto h-[58px]' />
        <h1 className="font-semibold text-3xl text-plum-500 ml-4">odinbook</h1>
      </Link>

      <Nav />
      
      {/* Separate menu button on the far right for large screens only (ordinarily part of nav menu) */}
      <div role="menuitem" className="relative hidden lg:flex justify-self-end mr-4 items-center justify-center">
          <button data-testid="user-menu" data-id="dropdown" onClick={toggleMenu} className="pb-[2px] pt-[4px] px-4 flex flex-col items-center justify-center hover:bg-gray-100">
            <ProfilePic imgUrl={user.profilePic ? user.profilePic.imageUrl : null} styles="mb-0.5 w-6 h-6 lg:w-8 lg:h-8 rounded-full pointer-events-none"/>
            <div className='flex items-center justify-center pointer-events-none'>
              <span className="text-xs">Me</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className='w-2.5 ml-0.5 -mt-0.5 pointer-events-none'>
                <path fill='#51557d' d="M310.6 246.6l-127.1 128C176.4 380.9 168.2 384 160 384s-16.38-3.125-22.63-9.375l-127.1-128C.2244 237.5-2.516 223.7 2.438 211.8S19.07 192 32 192h255.1c12.94 0 24.62 7.781 29.58 19.75S319.8 237.5 310.6 246.6z"/>
              </svg>
            </div>
          </button>
          {showMenu && (
            <DropdownMenu closeMenu={toggleMenu}/>
          )}
        </div>
  </header>
  )
}

export default Header;