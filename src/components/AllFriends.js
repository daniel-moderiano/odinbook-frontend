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
      {friends ? (
          <div className="flex">
            <div>
              <h2>Friends</h2>
              {friends.acceptedFriends.map((friend, index) => (
                // Friend component here
                <FriendCard friendData={friend.user} type="friend" key={friend._id}/>
              ))}
            </div>
          </div>
        ) : (
          <div>Unable to load friends</div>
        )}
      </main>
    </div>
  )
}

export default AllFriends