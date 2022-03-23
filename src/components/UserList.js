import { useAuthContext } from "../hooks/useAuthContext";
import { useFetchGet } from "../hooks/useFetchGet"
import FriendCard from "./FriendCard";
                           
const UserList = ({ userFriends }) => {
  const { data: users } = useFetchGet(`http://localhost:3000/api/users`);
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
      {users &&(
        <div className="flex flex-wrap items-center justify-start">
          {users.users.map((userDetails) => {
            if (!isRelatedUser(userDetails._id)) {
              return (<FriendCard friendData={userDetails} type="user" key={userDetails._id}/>)
            }
          })}
        </div>
      )}
    </div>
  )
}

export default UserList