import { useAuthContext } from "../hooks/useAuthContext";
import { useFetchGet } from "../hooks/useFetchGet";
import FriendCard from "./FriendCard";
import { useErrorToast } from "../hooks/useErrorToast";
import FriendPage from './FriendPage';
import FriendsErrorLoading from "./FriendsErrorLoading";

const FriendRequests = () => {
  const { user } = useAuthContext();
  const { data: friends, loading, error } = useFetchGet(`${process.env.REACT_APP_API_ROUTE}/users/${user._id}/friends`);

  useErrorToast(error, 'An error occurred while loading requests');

  return (
    <FriendPage>
      <main>
        {/* Incoming requests section */}
        <section className="bg-white mb-4 mt-3 md:m-4 lg:bg-transparent">
          <h2 className="text-xl font-bold p-4 pb-4 lg:pb-2">Incoming Requests</h2>
          <div>
            {friends && (friends.incomingRequests.length > 0) ? (   // custom display depending on whether requests exist
              <ul className="flex flex-wrap items-center justify-start">
                {friends.incomingRequests.map((request) => (
                  <li className="w-full lg:w-auto" key={request._id}>
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

        {/* Outgoing requests section */}
        <section className="bg-white mb-4 mt-3 md:m-4 lg:bg-transparent">
          <h2 className="text-xl font-bold p-4 pb-4 lg:pb-2 lg:pt-8 lg:mt-8 lg:border-t lg:border-gray-300">Sent requests</h2>
          <div>
            {friends && (friends.outgoingRequests.length > 0) ? (
              <ul className="flex flex-wrap items-center justify-start">
                {friends.outgoingRequests.map((request) => (
                  <li className="w-full lg:w-auto" key={request._id}>
                    <FriendCard friendData={request.user} type="outgoing" />
                  </li>
                ))}
              </ul>
            ) : (
              <p className='px-4 pb-4 w-full lg:mt-2 text-gray-800 text'>No requests sent</p>
            )}

            {/* Loading + error UI */}
            <FriendsErrorLoading message="Unable to load requests" loading={loading} error={error} />
          </div>
        </section>
      </main>
    </FriendPage>
  )
}

export default FriendRequests