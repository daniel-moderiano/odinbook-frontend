import { Link } from 'react-router-dom'

const FriendsMenu = () => {
  let page = window.location.pathname;

  return (
    <aside className="">
      <nav role="navigation" aria-label="Friends menu" className='mt-2'>
        <ul className='flex items-center justify-evenly'>
          <li>
            <Link className={`block rounded  px-3 py-1 my-2 text-sm font-bold ${page === '/friends' ? 'bg-plum-500 text-white' : 'bg-white'}`} to="/friends">Suggested</Link>
          </li>
          <li>
            <Link className={`block rounded  px-3 py-1 my-2 text-sm font-bold ${page === '/friends/requests' ? 'bg-plum-500 text-white' : 'bg-white'}`} to="/friends/requests">Friend requests</Link>
          </li>
          <li>
            <Link className={`block rounded  px-3 py-1 my-2 text-sm font-bold ${page === '/friends/all' ? 'bg-plum-500 text-white' : 'bg-white'}`} to="/friends/all">All friends</Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default FriendsMenu;