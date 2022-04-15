import { useLogout } from "../hooks/useLogout";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import LogoutIcon from "./icons/LogoutIcon";
import OdinbookIcon from './icons/OdinbookIcon';
import { useScrollHeader } from "../hooks/useScrollHeader";

// Selectively render different style headers for mobile vs larger screens
const Header = () => {
  const { showHeader } = useScrollHeader();
  const { logout } = useLogout();

  return (
    <header role="banner" aria-labelledby="odinbook-logo" className={`shadow-md w-full fixed bg-white grid grid-cols-1 lg:grid-cols-3 content-center justify-items-center z-20 h-[50px] transition-all duration-300 top-0 lg:h-auto ${showHeader ? 'top-0' : 'top-[-50px] md:top-0'}`}>
      <Link to="/" className="items-center hidden lg:flex justify-self-start">
        <OdinbookIcon iconStyles='w-auto h-[58px]' />
        <h1 className="font-semibold text-3xl text-plum-500 ml-4">odinbook</h1>
      </Link>

      <Nav />
      
      {/* Separate logout button on the far right for large screens only (ordinarily part of nav menu) */}
      <div className="hidden lg:flex justify-self-end mr-4 items-center justify-center">
        <button className="rounded py-0.5 px-4 hover:bg-gray-100 flex flex-col items-center justify-center" onClick={logout}>
          <LogoutIcon iconFill="#51557d" iconStyles="w-6 h-7 lg:w-7 lg:h-8"/>
          <span className="text-xs">Log out</span>
        </button>
      </div>
  </header>
  )
}

export default Header;