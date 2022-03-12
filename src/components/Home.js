import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <div>
      <h1>
        Home page
      </h1>

      {/* Although this page is inaccessible to non-users, check for user regardless */}
      {user && (
        <h2>Welcome {user.email}</h2>
      )}

      <button onClick={logout}>Log out</button>
    </div>
  )
}

export default Home