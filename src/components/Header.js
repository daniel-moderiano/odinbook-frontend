import Nav from "./Nav";
import { Link } from "react-router-dom";
import OdinbookIcon from './icons/OdinbookIcon';
import { useScrollHeader } from "../hooks/useScrollHeader";
import MeButton from "./buttons/MeButton";

// Selectively render different style headers for mobile vs larger screens
const Header = ({ updateFeed }) => {
  const { showHeader } = useScrollHeader();

  return (
    <header aria-labelledby="odinbook-logo" className={`shadow-md w-full fixed bg-white grid grid-cols-1 lg:grid-cols-3 content-center justify-items-center z-20 h-[50px] transition-all duration-300 top-0 lg:h-auto ${showHeader ? 'top-0' : 'top-[-50px] md:top-0'}`}>
      <Link to="/" className="items-center hidden lg:flex justify-self-start outline-plum-600 outline-offset-[-2px]">
        <OdinbookIcon iconStyles='w-auto h-[58px]' />
        <h1 className="font-semibold text-3xl text-plum-500 ml-4 pr-4">odinbook</h1>
      </Link>

      <Nav updateFeed={updateFeed}/>
      
      {/* Separate menu button on the far right for large screens only (ordinarily part of nav menu) */}
      <div role="menuitem" className="hidden lg:flex justify-self-end mr-4 items-center justify-center w-[70px]">
        <MeButton />
      </div>
  </header>
  )
}

export default Header;