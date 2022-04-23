import { useAuthContext } from "../hooks/useAuthContext";
import { useFetchGet } from "../hooks/useFetchGet"
import FriendCard from "./FriendCard";
import FriendsErrorLoading from "./FriendsErrorLoading";

const UserList = ({ userFriends }) => {
  const { data: users, loading, error } = useFetchGet(`${process.env.REACT_APP_API_ROUTE}/users`);
  const { user: currentUser } = useAuthContext();

  // Returns false if a user is either involved in the current user's friends array (request or friend), or is the current user themselves. Should only be called once users data is available
  const isRelatedUser = (userId) => {
    // Perform array operations to manipulate the userFriends object into a single depth array of user IDs
    const flatFriends = [userFriends.acceptedFriends, userFriends.incomingRequests, userFriends.outgoingRequests].flat();
    const userFriendIds = flatFriends.map((friend) => friend.user._id);
    userFriendIds.push(currentUser._id);

    return userFriendIds.some((id) => id === userId);
  }

  return (
    <div>
      {users && (   // render only unrelated users
        <ul className="flex flex-wrap items-center justify-start">
          {users.users.map((userDetails) => {
            if (!isRelatedUser(userDetails._id)) {    // only render those unrelated users
              return (
                <li className="w-full lg:w-auto" key={userDetails._id}>
                  <FriendCard friendData={userDetails} type="user" />
                </li>
              )
            }
            return null;    // .map() expects a return value in every case, hence null here
          })}
        </ul>
      )}

      {/* Loading + error UI */}
      <FriendsErrorLoading message="Unable to load users" loading={loading} error={error} />
    </div>
  )
}

export default UserList