import { useAuthContext } from '../hooks/useAuthContext';
import { useFetchGet } from '../hooks/useFetchGet';
import FriendCard from "./FriendCard";
import UserList from "./UserList";
import { useErrorToast } from "../hooks/useErrorToast";
import FriendsErrorLoading from './FriendsErrorLoading';
import FriendPage from './FriendPage';

const FriendsHome = () => {
  const { user } = useAuthContext();
  // Friends data is an object containing 3 arrays of friends: acceptedFriends, incomingRequests, and outgoingRequests
  const { data: friends, loading, error } = useFetchGet(`${process.env.REACT_APP_API_ROUTE}/users/${user._id}/friends`);

  useErrorToast(error, 'An error occurred while loading requests')

  return (
    <FriendPage>
      {/* Incoming requests section */}
      <section className="bg-white mb-4 mt-3 md:m-4 lg:bg-transparent">
        <h2 className="text-xl font-bold p-4 pb-4 lg:pb-2">Friend Requests</h2>
        <div>
          {friends && (friends.incomingRequests.length > 0) ? (
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

          {/* Loading + error UI */}
          <FriendsErrorLoading message="Unable to load requests" loading={loading} error={error} />
        </div>
      </section>

      {/* Suggested friends/users section */}
      <section className="bg-white my-8 md:m-4 lg:bg-transparent">
        <h2 className="text-xl font-bold p-4 lg:pb-2 lg:pt-8 lg:mt-8 lg:border-t lg:border-gray-300">Find new friends</h2>
        <>
          {friends && (
            <UserList userFriends={friends} />
          )}

          {/* Loading + error UI */}
          <FriendsErrorLoading message="Unable to load users" loading={loading} error={error} />
        </>
      </section>
    </FriendPage>
  )
}

export default FriendsHome