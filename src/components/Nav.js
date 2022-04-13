import Button from "./utils/Button";
import { useLogout } from "../hooks/useLogout";
import { Link } from 'react-router-dom';
import { useAuthContext } from "../hooks/useAuthContext";
import HomeIcon from './icons/HomeIcon';
import FriendsIcon from "./icons/FriendsIcon";
import ProfileIcon from "./icons/ProfileIcon";
import LogoutIcon from './icons/LogoutIcon';

const Nav = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <nav aria-label="Main menu" role="navigation" className="w-full lg:max-w-lg lg:justify-self-center">
      <ul role="menubar" className="flex items-center justify-evenly">
        <li role="menuitem" >
          <Link to="/">
            <div className="py-1 px-4 hover:bg-gray-100 flex flex-col items-center justify-center">
              <HomeIcon iconFill="#51557d" iconStyles="w-7 h-8"/>
              <span className="text-xs">Home</span>
            </div>
          </Link>
        </li>
        <li role="menuitem">
          <Link to="/friends">
            <div className="py-1 px-4 hover:bg-gray-100 flex flex-col items-center justify-center">
              <FriendsIcon iconFill="#51557d" iconStyles="w-7 h-8"/>
              <span className="text-xs">Friends</span>
            </div>
          </Link>
        </li>
        <li role="menuitem">
          <Link to={`/profile/${user._id}`}>
            <div className="py-1 px-4 hover:bg-gray-100 flex flex-col items-center justify-center">
              <ProfileIcon iconFill="#51557d" iconStyles="w-7 h-8"/>
              <span className="text-xs">Profile</span>
            </div>
          </Link>
        </li>
        <li role="menuitem" className="lg:hidden">
          <Button design="none" onClick={logout} customStyles="py-1 px-4 hover:bg-gray-100 flex flex-col items-center justify-center">
            <LogoutIcon iconFill="#51557d" iconStyles="w-7 h-8"/>
            <span className="text-xs">Log out</span>
          </Button>
        </li>
      </ul>
    </nav>
  )
}

export default Nav