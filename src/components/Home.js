import Header from "./Header";
import Feed from "./Feed";
import SideMenu from "./SideMenu";
import SideFooter from "./SideFooter";
import CreatePost from "./CreatePost";
import { useState } from "react";
import ErrorBoundary from "./utils/ErrorBoundary";

const Home = () => {
  // A method of updating the Feed when a new post is created, updated, or deleted. Update or change the feedKey state from within a child component to re-render the Feed component
  const [feedKey, setFeedKey] = useState(0);

  return (
    <ErrorBoundary>
      <Header />
        {/* Margin-top is chosen with mt-6 (24px) + height of the header */}
        <div className="w-full flex justify-center mt-[74px] lg:mt-[82px]">
          <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] md:gap-x-8 2xl:grid-cols-[350px_1fr_350px] lg:mx-8">
            <div className="hidden lg:flex">
              <SideMenu />
            </div>
            <main className="max-w-[640px] col-start-1 lg:col-start-2 flex flex-col justify-center self-center w-full lg:max-w-[550px] xl:max-w-[640px] md:min-w-[640px] lg:min-w-[550px] xl:min-w-[640px]">
              <CreatePost updatePosts={() => setFeedKey(Math.random())}/>
              <Feed updatePosts={() => setFeedKey(Math.random())} key={feedKey}/>
            </main>
            <div className="hidden 2xl:flex">
              <SideFooter />
            </div>
          </div>
        </div>
    </ErrorBoundary>
  )
}

export default Home