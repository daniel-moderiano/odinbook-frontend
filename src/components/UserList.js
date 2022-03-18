import { useAuthContext } from "../hooks/useAuthContext";
import { useFetchGet } from "../hooks/useFetchGet"
import FriendCard from "./FriendCard";
                           
const UserList = () => {
  const { data: users } = useFetchGet(`http://localhost:3000/api/users`);
  const { user } = useAuthContext();

  return (
    <div className="mx-4">UserList
      {users && (
        <div className="flex flex-auto flex-wrap gap-6 items-center justify-center">
          {users.users.map((userDetails) => {
            // Ensure that the current user is not rendered in the list of all users
            if (userDetails._id !== user._id) {
              return (<FriendCard friendData={userDetails} type="user" key={userDetails._id}/>)
            }
          })}
        </div>
      )}
    </div>
  )
}

export default UserList