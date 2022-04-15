import { useLogout } from "../hooks/useLogout";
import Nav from "./Nav";
import Button from "./utils/Button";
import { Link } from "react-router-dom";
import LogoutIcon from "./icons/LogoutIcon";
import OdinbookIcon from './icons/OdinbookIcon';
import DynamicHeader from "./DynamicHeader";

const Header = () => {
  const { logout } = useLogout();

  return (
    <header role="banner" aria-labelledby="odinbook-logo" className="shadow-md fixed bottom-0 w-full bg-white grid grid-cols-1 lg:grid-cols-3 items-center z-20">
      <Link to="/" className="items-center hidden lg:flex justify-self-start">
        <OdinbookIcon iconStyles="w-20"/>
        <h1 className="font-semibold text-3xl text-plum-500 ml-4">odinbook</h1>
      </Link>

      <Nav />
      {/* Dropdown profile/settings menu here */}

      {/* Separate logout button on the far right for large screens only (ordinarily part of nav menu) */}
      <div className="hidden lg:block justify-self-end mr-4">
        <Button design="none" customStyles="py-1 px-4 hover:bg-gray-100 flex flex-col items-center justify-center" onClick={logout}>
          <LogoutIcon iconFill="#51557d" iconStyles="w-7 h-8"/>
          <span className="text-xs">Log out</span>
        </Button>
      </div>
      <DynamicHeader />
    </header>
  )
}

export default Header