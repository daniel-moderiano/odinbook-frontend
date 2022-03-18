import { useAuthContext } from "../hooks/useAuthContext";
import Header from "./Header";
import FriendsMenu from './FriendsMenu';
import { useFetchGet } from '../hooks/useFetchGet';
import { useEffect } from "react";
import FriendCard from "./FriendCard";
import UserList from "./UserList";

const FriendsHome = () => {
  const { user } = useAuthContext();
  // Friends data is an object containing 3 arrays of friends: acceptedFriends, incomingRequests, and outgoingRequests
  const { data: friends, loading, error } = useFetchGet(`http://localhost:3000/api/users/${user._id}/friends`);

  return (
    <div>
      <Header />

      <FriendsMenu />

      <main>
        <section>
          <h2>Friend Requests</h2>
          {friends ? (
            <div className="flex">
              <div>
                {friends.incomingRequests.map((request) => (
                  <FriendCard friendData={request.user} type="incoming" key={request._id}/>
                ))}
              </div>
            </div>
          ) : (
            <div>Unable to load friends</div>
          )}
        </section>
        <section>
          <h2>All Users</h2>
          <UserList />
        </section>
      </main>
    </div>
  )
}

export default FriendsHome