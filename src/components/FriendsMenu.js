import StyledLink from './utils/StyledLink';

const FriendsMenu = () => {
  return (
    <aside className="fixed left-0">
      <nav role="navigation" aria-label="Friends menu">
        <ul>
          <li><StyledLink to="/">Home</StyledLink></li>
          <li><StyledLink to="/">Friend requests</StyledLink></li>
          <li><StyledLink to="/">All friends</StyledLink></li>
        </ul>
      </nav>
    </aside>
  )
}

export default FriendsMenu