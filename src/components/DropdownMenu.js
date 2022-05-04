import { useLogout } from "../hooks/useLogout";
import { Link } from 'react-router-dom'
import { useAuthContext } from "../hooks/useAuthContext";
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';
import { useMenuCloseEvents } from "../hooks/useMenuCloseEvents";

// Menu is opened by clicking the nav button labelled 'me'. Must have menuitem children to work with keyboard nav + required for accessible menu anyway
const DropdownMenu = ({ closeMenu }) => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  useKeyboardNavigation('NavDropdown');
  useMenuCloseEvents('NavDropdown', closeMenu);

  return (
    <ul aria-labelledby="dropdown-me" id="NavDropdown" role="menu" data-testid="dropdown" data-id="dropdown" className="rounded p-1 absolute top-[53px] right-0 shadow-lg w-36 bg-white text-left lg:top-[60px]">
      <li role="none">
        <Link role="menuitem" to={`/profile/${user._id}`} onClick={() => closeMenu()} className="bg-white py-2 px-3 hover:bg-gray-100 w-full text-left rounded block outline-plum-500 outline-offset-[-1px]">
          View profile
        </Link>
      </li>
      <li role="none">
        <Link role="menuitem" to="/settings" onClick={() => closeMenu()} className="bg-white py-2 px-3 hover:bg-gray-100 w-full text-left rounded block outline-plum-500 outline-offset-[-1px]">
          Settings
        </Link>
      </li>
      <li role="none">
        <button role="menuitem" onClick={() => {
          closeMenu();
          logout();
        }}
          className="bg-white py-2 px-3 hover:bg-gray-100 w-full text-left rounded outline-plum-500 outline-offset-[-1px]">
          Log out
        </button>
      </li>
    </ul>
  )
}

export default DropdownMenu