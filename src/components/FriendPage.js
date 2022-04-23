import Header from "./Header"
import FriendsMenu from "./FriendsMenu"

// Container-type component for all variations of the friends page to provide common shared elements
const FriendPage = ({ children }) => {
  return (
    <div>
      <Header />
      {/* Margin-top is chosen as height of the header */}
      <div className="md:grid md:grid-cols-[270px_1fr] lg:grid-cols-[320px_1fr] mt-[50px] lg:mt-[58px]">
        {/* A bounding div is necessary to avoid the Friends menu fixed positioning from overflowing the grid */}
        <div>
          <FriendsMenu />
        </div>

        <main className="bg-white mb-4 mt-3 md:m-4 lg:bg-transparent">
          {children}
        </main>
      </div>
    </div>
  )
}

export default FriendPage