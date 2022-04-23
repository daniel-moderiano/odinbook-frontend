import { useAuthContext } from "../hooks/useAuthContext";
import { useFetchGet } from "../hooks/useFetchGet";
import FriendCard from "./FriendCard";
import { useErrorToast } from '../hooks/useErrorToast';
import FriendPage from "./FriendPage";
import FriendsErrorLoading from './FriendsErrorLoading';

const AllFriends = () => {
  const { user } = useAuthContext();
  const { data: friends, loading, error } = useFetchGet(`${process.env.REACT_APP_API_ROUTE}/users/${user._id}/friends`);

  useErrorToast(error, 'An error occurred while loading friends');

  return (
    <FriendPage>
      <h2 className="text-xl font-bold p-4 pb-4 lg:pb-2">Friends</h2>
      <div>
        {friends && (friends.acceptedFriends.length > 0) ? (    // custom display depending on whether user has friends
          <ul className="flex flex-wrap items-center justify-start">
            {friends.acceptedFriends.map((friend, index) => (
              <li className="w-full lg:w-auto" key={friend._id}>
                <FriendCard friendData={friend.user} type="friend" />
              </li>
            ))}
          </ul>
        ) : (
          <p className='px-4 pb-4 w-full lg:mt-2 text-gray-800 text'>No friends yet</p>
        )}

        {/* Loading + error UI */}
        <FriendsErrorLoading message="Unable to load friends" loading={loading} error={error} />
      </div>
    </FriendPage>
  )
}

export default AllFriends