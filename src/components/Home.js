import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import Header from "./Header";
import Feed from "./Feed";
import SideMenu from "./SideMenu";

const Home = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <div>
      <Header />

      {/* Although this page is inaccessible to non-users, check for user regardless */}
      <main className="grid grid-cols-1 lg:grid-cols-2 md:gap-x-4 xl:grid-cols-3">
        <div className="hidden lg:flex">
          <SideMenu />
        </div>
        {/* Feed */}
        <div className="col-start-1 lg:col-start-2 flex justify-center self-center">
          <Feed />
        </div>
        <div className="recommendations hidden">
          Recommendations
        </div>
      </main>
    </div>
  )
}

export default Home