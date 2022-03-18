import StyledLink from './utils/StyledLink';

const FriendsMenu = () => {
  return (
    <aside className="">
      <nav role="navigation" aria-label="Friends menu" className=''>
        <ul>
          <li><StyledLink to="/friends">Home</StyledLink></li>
          <li><StyledLink to="/friends/requests">Friend requests</StyledLink></li>
          <li><StyledLink to="/friends/all">All friends</StyledLink></li>
        </ul>
      </nav>
    </aside>
  )
}

export default FriendsMenu