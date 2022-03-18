import { useAuthContext } from "../hooks/useAuthContext";
import Header from "./Header";
import FriendsMenu from './FriendsMenu';
import { useFetchGet } from "../hooks/useFetchGet";
import FriendCard from "./FriendCard";

const AllFriends = () => {
  const { user } = useAuthContext();
  const { data: friends, loading, error } = useFetchGet(`http://localhost:3000/api/users/${user._id}/friends`);

  return (
    <div>
      <Header />

      <div className="md:grid md:grid-cols-[270px_1fr] lg:grid-cols-[320px_1fr]">
        {/* A bounding div is necessary to avoid the Friends menu fixed positioning from overflowing the grid */}
        <div>
          <FriendsMenu />
        </div>

        <main className="bg-white mb-4 mt-3 md:m-4 lg:bg-transparent">
          <h2 className="text-xl font-bold p-4 pb-4 lg:pb-2">Friends</h2>
          <div className="flex flex-wrap items-center justify-start">
            {friends ? (
              <>
                {friends.acceptedFriends.map((friend, index) => (
                  <FriendCard friendData={friend.user} type="friend" key={friend._id}/>
                ))}
              </> 
            ) : (
              <div>Unable to load friends</div>
            )}
        </div>
        </main>
      </div>
    </div>
  )
}

export default AllFriends