import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import Header from "./Header";
import Feed from "./Feed";
import SideMenu from "./SideMenu";
import SideFooter from "./SideFooter";

const Home = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <div>
      <Header />

      {/* Although this page is inaccessible to non-users, check for user regardless */}
      {/* <main className="grid grid-cols-1 lg:grid-cols-2 md:gap-x-4 xl:grid-cols-3"> */}
      <div className="w-full flex justify-center mt-6">
        <main className="grid grid-cols-1 lg:grid-cols-[350px_1fr] md:gap-x-8 2xl:grid-cols-[350px_1fr_350px] lg:mx-8">
          <div className="hidden lg:flex">
            <SideMenu />
          </div>
          {/* Feed */}
          <div className="col-start-1 lg:col-start-2 flex justify-center self-center">
            <Feed />
          </div>
          <div className="hidden lg:flex">
            <SideFooter />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Home