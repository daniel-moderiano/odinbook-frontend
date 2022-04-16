import { Link } from 'react-router-dom';
import { useAuthContext } from "../hooks/useAuthContext";
import HomeIcon from './icons/HomeIcon';
import FriendsIcon from "./icons/FriendsIcon";
import ProfileIcon from "./icons/ProfileIcon";
import { useEffect, useState } from "react";
import ProfilePic from './utils/ProfilePic';
import DropdownMenu from "./DropdownMenu";

const Nav = () => {
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
    <nav aria-label="Main menu" role="navigation" className="w-full lg:max-w-lg lg:justify-self-center lg:flex items-center justify-center">
      <ul role="menubar" className="flex items-center justify-evenly">
        <li role="menuitem" className="lg:px-4 xl:px-12">
          <Link to="/">
            <div className="py-0.5 px-4 hover:bg-gray-100 flex flex-col items-center justify-center lg:rounded">
              <HomeIcon iconFill="#51557d" iconStyles="w-6 h-7 lg:w-7 lg:h-8"/>
              <span className="text-xs">Home</span>
            </div>
          </Link>
        </li>
        <li role="menuitem" className="lg:px-4 xl:px-12">
          <Link to="/friends">
            <div className="py-0.5 px-4 hover:bg-gray-100 flex flex-col items-center justify-center lg:rounded">
              <FriendsIcon iconFill="#51557d" iconStyles="w-6 h-7 lg:w-7 lg:h-8"/>
              <span className="text-xs">Friends</span>
            </div>
          </Link>
        </li>
        <li role="menuitem" className="lg:px-4 xl:px-12">
          <Link to={`/profile/${user._id}`}>
            <div className="py-0.5 px-4 hover:bg-gray-100 flex flex-col items-center justify-center lg:rounded">
              <ProfileIcon iconFill="#51557d" iconStyles="w-6 h-7 lg:w-7 lg:h-8"/>
              <span className="text-xs">Profile</span>
            </div>
          </Link>
        </li>
        <li role="menuitem" className="relative">
          <button data-testid="user-menu" data-id="dropdown" onClick={toggleMenu} className="pb-[2px] pt-[4px] px-4 flex flex-col items-center justify-center hover:bg-gray-100 active:scale-95">
            <ProfilePic imgUrl={user.profilePic ? user.profilePic.imageUrl : null} styles="mb-0.5 w-6 h-6 lg:w-8 lg:h-8 border border-plum-500 rounded-full pointer-events-none"/>
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
        </li>
      </ul>
    </nav>
  )
}

export default Nav