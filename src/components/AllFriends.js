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

      <FriendsMenu />

      <main>
        <h2 className="text-xl font-bold p-4 pb-4 bg-white mt-3">Friends</h2>
        {friends ? (
          <>
            {friends.acceptedFriends.map((friend, index) => (
              <FriendCard friendData={friend.user} type="friend" key={friend._id}/>
            ))}
          </> 
        ) : (
          <div>Unable to load friends</div>
        )}
      </main>
    </div>
  )
}

export default AllFriends