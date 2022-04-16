import { useLogout } from "../hooks/useLogout";
import { Link } from 'react-router-dom'
import { useAuthContext } from "../hooks/useAuthContext";

const DropdownMenu = ({ closeMenu }) => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <div data-testid="dropdown" data-id="dropdown" className="rounded p-1 absolute top-[53px] right-0 shadow-lg w-36 bg-white text-left lg:top-[60px]">
      <Link to={`/profile/${user._id}`} onClick={() => {
        closeMenu();
      }} className="bg-white py-2 px-3 hover:bg-gray-100 w-full text-left rounded block">View profile</Link>
      <Link to="/settings" onClick={() => {
        closeMenu();
      }} className="bg-white py-2 px-3 hover:bg-gray-100 w-full text-left rounded block">Settings</Link>
       <button onClick={() => {
        closeMenu();
        logout();
      }} className="bg-white py-2 px-3 hover:bg-gray-100 w-full text-left rounded">Log out</button>
    </div>
  )
}

export default DropdownMenu