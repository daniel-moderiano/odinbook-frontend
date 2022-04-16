import { Link } from 'react-router-dom';
import { useAuthContext } from "../hooks/useAuthContext";
import HomeIcon from './icons/HomeIcon';
import FriendsIcon from "./icons/FriendsIcon";
import ProfileIcon from "./icons/ProfileIcon";
import LogoutIcon from './icons/LogoutIcon';
import { useEffect, useState } from "react";
import ProfilePic from './utils/ProfilePic';
import DropdownMenu from "./DropdownMenu";

const Nav = () => {

  const { user } = useAuthContext();
  const [showMenu, setShowMenu] = useState(true);

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
          <button data-testid="user-menu" data-id="dropdown" onClick={toggleMenu} className="py-0.5 px-1 flex items-center justify-center">
            <ProfilePic imgUrl={user.ProfilePic ? user.ProfilePic.imageUrl : null} styles="w-9 h-9 rounded-full pointer-events-none"/>
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