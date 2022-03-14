import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import Header from "./Header";
import Feed from "./Feed";
import Post from "./Post";

const Home = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <div>
      <Header />

      {/* Although this page is inaccessible to non-users, check for user regardless */}
      {user && (
        <h2>Welcome {user.email}</h2>
      )}

      <Post />

      <main className="lg:grid grid-cols-3">
        <div className="sidebar hidden">
          SideMenu
        </div>
        {/* Feed */}
        <Feed />
        <div className="recommendations hidden">
          Recommendations
        </div>
      </main>
    </div>
  )
}

export default Home