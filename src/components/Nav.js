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
        <li role="menuitem" className="lg:hidden">
          <button onClick={logout} className="py-0.5 px-4 hover:bg-gray-100 flex flex-col items-center justify-center">
            <LogoutIcon iconFill="#51557d" iconStyles="w-6 h-7 lg:w-7 lg:h-8"/>
            <span className="text-xs">Log out</span>
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Nav