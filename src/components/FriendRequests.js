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

      <div className="md:grid md:grid-cols-[270px_1fr] lg:grid-cols-[320px_1fr]">
        {/* A bounding div is necessary to avoid the Friends menu fixed positioning from overflowing the grid */}
        <div>
          <FriendsMenu />
        </div>

        <main>
          {friends ? (
            <>
            <section className="bg-white mb-4 mt-3 md:m-4">
                <h2 className="text-xl font-bold p-4 pb-4">Incoming Requests</h2>
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

              <section className="bg-white mb-4 mt-3 md:m-4">
                <h2 className="text-xl font-bold p-4 pb-4">Sent requests</h2>
                {friends ? (
                  <>
                    {friends.outgoingRequests.map((request) => (
                      <FriendCard friendData={request.user} type="outgoing" key={request._id}/>
                    ))}
                  </> 
                ) : (
                  <div>Unable to load friends</div>
                )}
              </section>
            </>
          ) : (
            <div>Unable to load friends</div>
          )}
        </main>
      </div>
    </div>
  )
}

export default FriendRequests