import { useAuthContext } from "../hooks/useAuthContext";
import Header from "./Header";
import FriendsMenu from './FriendsMenu';
import { useFetchGet } from '../hooks/useFetchGet';
import FriendCard from "./FriendCard";
import UserList from "./UserList";
import SkeletonFriendCard from "./skeletons/SkeletonFriendCard";

const FriendsHome = () => {
  const { user } = useAuthContext();
  // Friends data is an object containing 3 arrays of friends: acceptedFriends, incomingRequests, and outgoingRequests
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
          <section className="bg-white mb-4 mt-3 md:m-4 lg:bg-transparent">
            <h2 className="text-xl font-bold p-4 lg:pb-2">Friend Requests</h2>
            <div className="flex flex-wrap items-center justify-start">
              {/* {friends ? (
                <>
                  {friends.incomingRequests.map((request) => (
                    <FriendCard friendData={request.user} type="incoming" key={request._id}/>
                  ))}
                </> 
              ) : (
                <>
                  <SkeletonFriendCard />
                  <SkeletonFriendCard />
                  <SkeletonFriendCard />
                </>
              )} */}
               <>
                  <SkeletonFriendCard />
                  <SkeletonFriendCard />
                  <SkeletonFriendCard />
                </>
            </div>
          </section>

          <section className="bg-white my-8 md:m-4 lg:bg-transparent">
            <h2 className="text-xl font-bold p-4 lg:pb-2 lg:pt-8 lg:mt-8 lg:border-t lg:border-gray-300">Find new friends</h2>
            {friends && (
              <UserList userFriends={friends}/>
            )}
          </section>
        </main>
      </div>
    </div>
  )
}

export default FriendsHome