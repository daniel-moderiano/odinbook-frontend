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

      <div className="md:grid grid-cols-[270px_1fr]">
        {/* A bounding div is necessary to avoid the Friends menu fixed positioning from overflowing the grid */}
        <div>
          <FriendsMenu />
        </div>

        <main>
          <section className="bg-white mb-4 mt-3 md:m-4">
            <h2 className="text-xl font-bold p-4 pb-4">Friend Requests</h2>
            {friends ? (
              <>
                {friends.incomingRequests.map((request) => (
                  <FriendCard friendData={request.user} type="incoming" key={request._id}/>
                ))}
              </> 
            ) : (
              <div>Unable to load friends</div>
            )}
          </section>

          <section className="bg-white my-8 md:m-4">
            <h2 className="text-xl font-bold p-4 pb-4">Find new friends</h2>
            <UserList />
          </section>
        </main>
      </div>
    </div>
  )
}

export default FriendsHome