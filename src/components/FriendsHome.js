import { useAuthContext } from "../hooks/useAuthContext";
import Header from "./Header";
import FriendsMenu from './FriendsMenu';
import { useFetchGet } from '../hooks/useFetchGet';
import { useEffect } from "react";

const FriendsHome = () => {
  const { user } = useAuthContext();
  // Friends data is an object containing 3 arrays of friends: acceptedFriends, incomingRequests, and outgoingRequests
  const { data: friends, loading, error } = useFetchGet(`http://localhost:3000/api/users/${user._id}/friends`);

  useEffect(() => {
    console.log(friends);
  }, [friends])

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
                <div key={friend._id}>
                  <h3>{friend.user.fullName}</h3>
                </div>
              ))}
            </div>

            <div>
              <h2>Friend Requests</h2>
              {friends.incomingRequests.map((request) => (
                <div key={request._id}>
                  <h3>{request.user.fullName}</h3>
                </div>
              ))}
            </div>

            <div>
              <h2>Requests Sent</h2>
              {friends.outgoingRequests.map((request) => (
                <div key={request._id}>
                  <h3>{request.user.fullName}</h3>
                </div>
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

export default FriendsHome