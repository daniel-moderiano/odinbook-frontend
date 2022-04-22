import { useAuthContext } from "../context/AuthContext";
import { useFetchGet } from "../hooks/useFetchGet"
import FriendCard from "./FriendCard";
import SkeletonFriendCard from "./skeletons/SkeletonFriendCard";
                           
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
      {users && (
        <ul className="flex flex-wrap items-center justify-start">
          {users.users.map((userDetails) => {
            if (!isRelatedUser(userDetails._id)) {    // only render those unrelated users
              return (
              <li className="w-full lg:w-auto" key={userDetails._id}>
                <FriendCard friendData={userDetails} type="user"/>
              </li>
              )
            }
            return null;    // .map() expects a return value in every case, hence null here
          })}
        </ul>
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
    </div>
  )
}

export default UserList