import { Link } from 'react-router-dom';
import HomeIcon from './icons/HomeIcon';
import FriendsIcon from "./icons/FriendsIcon";
import MeButton from './MeButton';
import CreatePost from './CreatePost';
import { useNavigate } from 'react-router-dom';

const Nav = ({ updateFeed }) => {
  let navigate = useNavigate();

  // Preferentially handle submitting a new post using the nav 'Post' button depending on the user's location in the app
  const handleUpdatePosts = () => {
    if (window.location.pathname === '/') {   // user on home page currently
      updateFeed();
    } else {    // user is somewhere else in the app
      navigate('/');
    }
  }

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
          <CreatePost updatePosts={handleUpdatePosts} nav={true}/>
        </li>
        <li role="menuitem" className="lg:hidden">
          <MeButton />
        </li>
      </ul>
    </nav>
  )
}

export default Nav