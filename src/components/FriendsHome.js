import { useAuthContext } from "../hooks/useAuthContext";
import Header from "./Header";
import FriendsMenu from './FriendsMenu';

const FriendsHome = () => {
  const { user } = useAuthContext();

  return (
    <div>
      <Header />

      <FriendsMenu />

      <main>

      </main>
    </div>
  )
}

export default FriendsHome