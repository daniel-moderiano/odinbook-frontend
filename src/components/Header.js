import { useLogout } from "../hooks/useLogout";
import Nav from "./Nav";
import Button from "./utils/Button";
import { Link } from "react-router-dom";

const Header = () => {
  const { logout } = useLogout();

  return (
    <header role="banner" aria-labelledby="odinbook-logo" className="shadow-md sticky top-0 w-full bg-white grid grid-cols-1 lg:grid-cols-3 items-center z-20">
      <Link to="/" className="items-center hidden lg:flex justify-self-start">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 105.22 83.68" className="w-20">
          <title id="odinbook-logo" aria-labelledby="odinbook-logo">Odinbook</title>
          <g id="Layer_2" data-name="Layer 2">
            <g id="Layer_1-2" data-name="Layer 1">
              <rect fill="#51557d" className="cls-1" width="105.22" height="83.68" />
              <path fill="#fff" className="cls-2" d="M15.36,48.09c0-11.74,8.07-18.43,17.28-18.43s17.28,6.69,17.28,18.43c0,11.59-8.06,18.29-17.28,18.29S15.36,59.68,15.36,48.09Zm28.44,0c0-8.07-4.46-13.47-11.16-13.47S21.48,40,21.48,48.09,26,61.41,32.64,61.41,43.8,56.08,43.8,48.09Z" />
              <path fill="#fff" className="cls-2" d="M62.88,61.63h-.22l-.57,3.88H57.34V14.25h6v14L63,35h.22A17.2,17.2,0,0,1,75,29.66c9.43,0,14.54,7,14.54,17.78,0,12-7.49,18.94-15.77,18.94C70.3,66.38,66.12,64.58,62.88,61.63ZM83.4,47.51c0-7.7-2.88-12.81-9.86-12.81-3.1,0-6.7,1.58-10.23,5.18V57.31a14.67,14.67,0,0,0,9.44,4C78.79,61.34,83.4,56.15,83.4,47.51Z" />
            </g>
          </g>
        </svg>
        <h1 className="font-semibold text-3xl text-plum-500 ml-4">odinbook</h1>
      </Link>

      <Nav />
      {/* Dropdown profile/settings menu here */}

      {/* Separate logout button on the far right for large screens only (ordinarily part of nav menu) */}
      <div className="hidden lg:block justify-self-end mr-4">
        <Button design="none" onClick={logout}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-8">
            <path fill="#51557d" d="M160 416H96c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h64c17.67 0 32-14.33 32-32S177.7 32 160 32H96C42.98 32 0 74.98 0 128v256c0 53.02 42.98 96 96 96h64c17.67 0 32-14.33 32-32S177.7 416 160 416zM502.6 233.4l-128-128c-12.51-12.51-32.76-12.49-45.25 0c-12.5 12.5-12.5 32.75 0 45.25L402.8 224H192C174.3 224 160 238.3 160 256s14.31 32 32 32h210.8l-73.38 73.38c-12.5 12.5-12.5 32.75 0 45.25s32.75 12.5 45.25 0l128-128C515.1 266.1 515.1 245.9 502.6 233.4z"/>
          </svg>
          <span className="text-xs">Log out</span>
        </Button>
      </div>
    </header>
  )
}

export default Header