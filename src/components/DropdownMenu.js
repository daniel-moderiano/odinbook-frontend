import { useLogout } from "../hooks/useLogout";
import { Link } from 'react-router-dom'
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect } from "react";

const DropdownMenu = ({ closeMenu }) => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  // Focus the first menu item when the menu is rendered
  // useEffect(() => {
  //   const firstItem = document.querySelector('#first-item');
  //   firstItem.focus();
  // }, []);

  // Trap focus within the menu
  useEffect(() => {
    const menu = document.querySelector('#dropdown');
    // Grab all focusable elements within the menu
    const menuItems = menu.querySelectorAll('[role="menuitem"]');

    // Focus the first menu item when the menu is first opened
    menuItems[0].focus();

    const handleKeyPress = (e) => {
      let currentFocus; 

      // Find currently focused menu item
      for (let i = 0; i < menuItems.length; i++) {
        if (menuItems[i] === document.activeElement) {
          currentFocus = i;
        }
      }

      console.log(currentFocus);

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          if (currentFocus < menuItems.length - 1) {
            currentFocus++;
          } else {
            currentFocus = 0;
          }
          menuItems[currentFocus].focus();
          break;

        case 'ArrowUp':
          e.preventDefault();
          if (currentFocus === 0) {
            currentFocus = menuItems.length - 1;
          } else {
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