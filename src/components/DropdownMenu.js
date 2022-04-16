import { useLogout } from "../hooks/useLogout";

const DropdownMenu = ({ closeMenu }) => {
  const { logout } = useLogout();

  return (
    <div data-testid="dropdown" data-id="dropdown" className="rounded p-1 absolute top-10 right-1 shadow-lg w-36 bg-white text-left">
      <button data-id="post-menu" onClick={() => {
        closeMenu();
      }} className="bg-white py-2 px-3 hover:bg-gray-100 w-full text-left rounded">View profile</button>
      <button data-id="post-menu" onClick={() => {
        closeMenu();
      }} className="bg-white py-2 px-3 hover:bg-gray-100 w-full text-left rounded">Settings</button>
       <button data-id="post-menu" onClick={() => {
        closeMenu();
      }} className="bg-white py-2 px-3 hover:bg-gray-100 w-full text-left rounded">Log out</button>
    </div>
  )
}

export default DropdownMenu