import { Link } from 'react-router-dom';
import FriendsIcon from './icons/FriendsIcon';
import PeopleIcon from './icons/PeopleIcon';
import PlaneIcon from './icons/PlaneIcon';

const FriendsMenu = () => {
  // Define a variable that captures the url of the current page. This is used as a conditional to apply an 'active' or 'current page' styling to the friends menu
  let page = window.location.pathname;

  return (
    // Margin-top is chosen as height of the header + (mt-3)
    <div className="mt-[62px] md:bg-white md:h-full md:m-0 md:fixed md:w-[270px] md:shadow-md lg:w-[320px]">
      <h2 className='hidden md:block text-2xl font-bold p-4'>Friends</h2>
      <nav aria-label="Friends" >
        <ul role="menubar" className='flex items-center justify-start ml-1 md:flex-col md:m-0 md:mx-2'>
          <li role="none" className='md:w-full'>
            <Link role="menuitem" className={`rounded px-3 py-1 m-1 text-sm font-bold flex items-center justify-start ${page === '/friends' ? 'bg-teal-650 md:bg-gray-100 text-white hover:bg-teal-650' : 'bg-white md:bg-white md:text-plum-600 md:shadow-none shadow-sm hover:bg-gray-50'} md:text-black md:m-0 md:h-full md:w-full md:py-3 md:text-lg md:font-semibold md:hover:bg-gray-100 outline-plum-600 md:outline-offset-[-2px]`} to="/friends">
              <PeopleIcon iconStyles="hidden md:block w-5 mr-3" iconFill="#404164"/>
              <span className='text-center md:text-left'>Suggested</span>
            </Link>
          </li>
          <li role="none" className='md:w-full'>
            <Link role="menuitem" className={`flex items-center justify-start rounded px-3 py-1 m-1 text-sm font-bold ${page === '/friends/requests' ? 'bg-teal-650 md:bg-gray-100 text-white hover:bg-teal-650' : 'bg-white md:bg-white md:text-plum-600 md:shadow-none shadow-sm hover:bg-gray-50'} md:text-black md:m-0 md:h-full md:w-full md:py-3 md:text-lg md:font-semibold md:hover:bg-gray-100 outline-plum-600 md:outline-offset-[-2px]`} to="/friends/requests">
              <PlaneIcon iconStyles="hidden md:block w-5 mr-3" iconFill="#404164"/>
              <span className='text-center md:text-left'>Friend requests</span>
            </Link>
          </li>
          <li role="none" className='md:w-full'>
            <Link role="menuitem" className={`flex items-center justify-start rounded  px-3 py-1 m-1 text-sm font-bold ${page === '/friends/all' ? 'bg-teal-650 md:bg-gray-100 text-white hover:bg-teal-650' : 'bg-white md:bg-white md:text-plum-600 md:shadow-none shadow-sm hover:bg-gray-50'} md:text-black md:m-0 md:h-full md:w-full md:py-3 md:text-lg md:font-semibold md:hover:bg-gray-100 outline-plum-600 md:outline-offset-[-2px]`} to="/friends/all">
              <FriendsIcon iconStyles="hidden md:block w-5 mr-3" iconFill="#404164"/>
              <span className='text-center md:text-left'>All friends</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default FriendsMenu;