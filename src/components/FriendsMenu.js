import { Link } from 'react-router-dom'

const FriendsMenu = () => {
  // Define a variable that captures the url of the current page. This is used as a conditional to apply an 'active' or 'current page' styling to the friends menu
  let page = window.location.pathname;

  return (
    <aside className="">
      <nav role="navigation" aria-label="Friends menu" className='mt-3'>
        <ul className='flex items-center justify-start'>
          <li>
            <Link className={`block rounded px-3 py-1 m-2 text-sm font-bold ${page === '/friends' ? 'bg-teal-650 text-white' : 'bg-white shadow-sm'}`} to="/friends">Suggested</Link>
          </li>
          <li>
            <Link className={`block rounded  px-3 py-1 m-2 text-sm font-bold ${page === '/friends/requests' ? 'bg-teal-650 text-white' : 'bg-white shadow-sm'}`} to="/friends/requests">Friend requests</Link>
          </li>
          <li>
            <Link className={`block rounded  px-3 py-1 m-2 text-sm font-bold ${page === '/friends/all' ? 'bg-teal-650 text-white' : 'bg-white shadow-sm'}`} to="/friends/all">All friends</Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default FriendsMenu;