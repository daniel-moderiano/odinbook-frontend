import { useAuthContext } from '../hooks/useAuthContext';
import Header from "./Header";
import FriendsMenu from './FriendsMenu';
import { useFetchGet } from '../hooks/useFetchGet';
import FriendCard from "./FriendCard";
import UserList from "./UserList";
import SkeletonFriendCard from "./skeletons/SkeletonFriendCard";
import { useErrorToast } from "../hooks/useErrorToast";

const FriendsHome = () => {
  const { user } = useAuthContext();
  // Friends data is an object containing 3 arrays of friends: acceptedFriends, incomingRequests, and outgoingRequests
  const { data: friends, loading, error } = useFetchGet(`${process.env.REACT_APP_API_ROUTE}/users/${user._id}/friends`);

  useErrorToast(error, 'An error occurred while loading requests')

  return (
    <div>
      <Header />
      {/* Margin top is chosen to match height of the header */}
      <div className="md:grid md:grid-cols-[270px_1fr] lg:grid-cols-[320px_1fr] mt-[50px] lg:mt-[58px]">
        {/* A bounding div is necessary to avoid the Friends menu fixed positioning from overflowing the grid */}
        <div>
          <FriendsMenu />
        </div>

        <main>
          <section className="bg-white mb-4 mt-3 md:m-4 lg:bg-transparent">
            <h2 className="text-xl font-bold p-4 pb-4 lg:pb-2">Friend Requests</h2>
            <div>
              {friends && (
                <>
                  {friends.incomingRequests.length > 0 ? (
                    <ul className="flex flex-wrap items-center justify-start">
                      {friends.incomingRequests.map((request) => (
                        <li className="w-full" key={request._id}>
                          <FriendCard friendData={request.user} type="incoming" />
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className='px-4 pb-4 w-full lg:mt-2 text-gray-800 text'>No requests yet</p>
                  )} 
                </> 
              )}

              {loading && (
                <div className="flex flex-wrap items-center justify-start">
                  <SkeletonFriendCard />
                  <SkeletonFriendCard />
                  <SkeletonFriendCard />
                </div>
              )}

              {error && (
                <p className='px-4 pb-4 w-full lg:mt-2 text-gray-800 text'>Unable to load requests</p>
              )}
            </div>
          </section>

          <section className="bg-white my-8 md:m-4 lg:bg-transparent">
            <h2 className="text-xl font-bold p-4 lg:pb-2 lg:pt-8 lg:mt-8 lg:border-t lg:border-gray-300">Find new friends</h2>
            <>
              {friends && (
                <UserList userFriends={friends}/>
              )}

              {loading && (
                <div className="flex flex-wrap items-center justify-start">
                  <SkeletonFriendCard />
                  <SkeletonFriendCard />
                  <SkeletonFriendCard />
                </div>
              )}

              {error && (
                <p className='px-4 pb-4 w-full lg:mt-2 text-gray-800 text'>Unable to load users</p>
              )}
            </>
          </section>
        </main>
      </div>
    </div>
  )
}

export default FriendsHome