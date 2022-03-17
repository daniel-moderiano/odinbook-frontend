import { useAuthContext } from "../hooks/useAuthContext";
import Header from "./Header";
import FriendsMenu from './FriendsMenu';
import { useFetchGet } from "../hooks/useFetchGet";
import FriendCard from "./FriendCard";

const FriendRequests = () => {
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
              <h2>Incoming Friend Requests</h2>
              {friends.incomingRequests.map((request) => (
                <FriendCard friendData={request} type="incoming" key={request._id}/>
              ))}
            </div>

            <div>
              <h2>Requests Sent</h2>
              {friends.outgoingRequests.map((request) => (
                <FriendCard friendData={request} type="outgoing" key={request._id}/>
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

export default FriendRequests