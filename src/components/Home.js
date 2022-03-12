import { useLogout } from "../hooks/useLogout"

const Home = () => {
  const { logout } = useLogout();

  return (
    <div>
      <h1>
        Home page
      </h1>

      <button onClick={logout}>Log out</button>
    </div>
  )
}

export default Home