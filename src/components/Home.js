import Header from "./Header";
import Feed from "./Feed";
import SideMenu from "./SideMenu";
import SideFooter from "./SideFooter";
import AddPost from "./AddPost";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="w-full flex justify-center mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] md:gap-x-8 2xl:grid-cols-[350px_1fr_350px] lg:mx-8">
          <div className="hidden lg:flex">
            <SideMenu />
          </div>
          <main className="max-w-[640px] col-start-1 lg:col-start-2 flex flex-col justify-center self-center w-full lg:max-w-[550px] xl:max-w-[640px]">
            <AddPost />
            <Feed />
          </main>
          <div className="hidden 2xl:flex">
            <SideFooter />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home