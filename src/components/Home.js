import Header from "./Header";
import Feed from "./Feed";
import SideMenu from "./SideMenu";
import SideFooter from "./SideFooter";

// TODO: fix design when no posts are available

const Home = () => {
  return (
    <div>
      <Header />
      <div className="w-full flex justify-center mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] md:gap-x-8 2xl:grid-cols-[350px_1fr_350px] lg:mx-8">
          <div className="hidden lg:flex">
            <SideMenu />
          </div>
          <main className="col-start-1 lg:col-start-2 flex justify-center self-center">
            <Feed />
          </main>
          <div className="hidden lg:flex">
            <SideFooter />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home