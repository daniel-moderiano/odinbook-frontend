import { useLogout } from "../hooks/useLogout";
import { Link } from 'react-router-dom'
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect } from "react";

const DropdownMenu = ({ closeMenu }) => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  // Trap focus within the menu and handle arrow navigation (still allow user to tab out of menu)
  useEffect(() => {
    const menu = document.querySelector('#dropdown');
    // Grab all focusable elements within the menu
    const menuItems = menu.querySelectorAll('[role="menuitem"]');

    // Focus the first menu item when the menu is first opened
    menuItems[0].focus();

    // Add accessible up/down arroy key navigation to menu
    const handleKeyPress = (e) => {
      let currentFocus; 

      // Set currently focused variable to correspond to the index of the currently focused menu item
      for (let i = 0; i < menuItems.length; i++) {
        if (menuItems[i] === document.activeElement) {
          currentFocus = i;
        }
      }

      // Perform unique action based on key pressed
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();   // avoid scrolling the entire browser window
          if (currentFocus < menuItems.length - 1) {    // user is not at last item, move down menu
            currentFocus++;
          } else {    // user is at last item, move to top item
            currentFocus = 0;
          }
          menuItems[currentFocus].focus(); 
          break;

        case 'ArrowUp':
          e.preventDefault();
          if (currentFocus === 0) {   // user is at top item, return to bottom item
            currentFocus = menuItems.length - 1;
          } else {    // user is not at top item, move up list
            currentFocus--;
          }
          menuItems[currentFocus].focus();
          break;

        default:
          break;
      }
    }

    menu.addEventListener('keydown', handleKeyPress);

    return () => {
      menu.removeEventListener('keydown', handleKeyPress);
    }
  }, []);

  return (
    <ul aria-labelledby="me-dropdown" id="dropdown" role="menu" data-testid="dropdown" data-id="dropdown" className="rounded p-1 absolute top-[53px] right-0 shadow-lg w-36 bg-white text-left lg:top-[60px]">
      <li role="none">
        <Link id="first-item" role="menuitem" to={`/profile/${user._id}`} onClick={() => {
        closeMenu();
        }} className="bg-white py-2 px-3 hover:bg-gray-100 w-full text-left rounded block outline-plum-500 outline-offset-[-1px]">View profile</Link>
      </li>
      <li role="none">
        <Link role="menuitem" to="/settings" onClick={() => {
        closeMenu();
        }} className="bg-white py-2 px-3 hover:bg-gray-100 w-full text-left rounded block outline-plum-500 outline-offset-[-1px]">Settings</Link>
      </li>
      <li role="none">
        <button role="menuitem" onClick={() => {
          closeMenu();
          logout();
          }} className="bg-white py-2 px-3 hover:bg-gray-100 w-full text-left rounded outline-plum-500 outline-offset-[-1px]">
          Log out
        </button>
      </li>
    </ul>
  )
}

export default DropdownMenu