import { Link } from "react-router-dom"

// Designed to be imported into the Profile page to provide navigation between any Profile subpages
const ProfileNav = ({ profileUser }) => {
  return (
    <div className='flex items-center justify-center mx-4 border-t mt-6 lg:justify-start lg:mx-0 w-full max-w-xl lg:max-w-4xl'>
      {/* Use current URL pathname to identify which page the user is currently on and mark this link as 'active' */}
      <Link className={`w-20 text-center border-2 border-transparent text-sm py-3  hover:bg-gray-100 ${!window.location.pathname.includes('friends') ? 'text-plum-500 font-semibold bg-plum-50 border-b-plum-500' : 'font-medium text-gray-600'}`} to={`/profile/${profileUser._id}`}>Home</Link>
      <Link className={`w-20 text-center border-2 border-transparent text-sm py-3 hover:bg-gray-100  ${window.location.pathname.includes('friends') ? 'text-plum-500 font-semibold bg-plum-50 border-b-plum-500' : 'font-medium text-gray-600'}`} to={`/profile/${profileUser._id}/friends`}>Friends</Link>
    </div>
  )
}

export default ProfileNav;