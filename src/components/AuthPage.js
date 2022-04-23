import OdinbookIcon from "./icons/OdinbookIcon"
import Footer from "./Footer"

// Container-type component that provides the shared features of both Auth pages (log in and sign up)
const AuthPage = ({ children, title }) => {
  return (
    <div className="flex w-full flex-col h-screen sm:mt-6 md:mt-12">
      <div className="h-screen m-2 px-4 pt-10 pb-12 flex flex-col items-center lg:justify-center bg-white shadow-sm rounded max-w-md sm:h-auto sm:px-10 sm:mx-auto sm:w-full lg:m-0 lg:flex-row lg:max-w-full lg:bg-transparent lg:h-full lg:shadow-none md:mb-6">
        <div className="container max-w-7xl w-full flex items-center justify-center">
          <div className="items-center justify-center hidden lg:flex w-full -mr-16">
            <OdinbookIcon iconStyles="w-20" />
            <h2 className="font-semibold text-3xl sm:text-4xl text-plum-500 ml-5">odinbook</h2>
          </div>

          <div className="w-full lg:w-full flex items-center lg:justify-center lg:border-l lg:border-plum-500/20">
            <div className="flex flex-col items-center w-full lg:bg-transparent lg:pt-5 lg:pb-6 lg:max-w-lg">
              <div className="w-full text-center">
                <h2 className="font-semibold sm:text-4xl text-3xl text-plum-500 pb-7">{title}</h2>
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AuthPage