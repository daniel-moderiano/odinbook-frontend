import { Route, Routes, Navigate } from "react-router";
import Home from './components/Home';
import Login from "./components/Login";
import Signup from "./components/Signup";
import FriendsHome from "./components/FriendsHome";
import AllFriends from "./components/AllFriends";
import FriendRequests from "./components/FriendRequests";
import { useAuthContext } from "./hooks/useAuthContext";
import Profile from "./components/Profile";
import { useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import Toast from './components/utils/Toast';
import { ToastContext } from "./context/ToastContext";

function App() {
  // Presence of user will allow conditional rendering of routes/route protection on frontend
  const { user, authIsReady } = useAuthContext();

  // Capture the pathname variable app-wide to act on any and all path changes with scroll adjustments
  const { pathname } = useLocation();

  const { toastVisible, toastParams } = useContext(ToastContext);

  // Ensure the window is scrolled to the top when changing any routes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
    <div className="bg-plum-50 w-full m-0 p-0 h-screen flex flex-col">
      {authIsReady && (<>
        <Routes>
          <Route path="/" element={
            <>
            {!user && <Navigate to="/login" />}
            {user && <Home />}
            </>
          } />       
          <Route path="/signup" element={
            <>
            {!user && <Signup />}
            {user && <Navigate to="/" />}
            </>
          }/>
          <Route path="/login" element={
            <>
            {!user && <Login />}
            {user && <Navigate to="/" />}
            </>
          }/>
          <Route path="/friends" element={
            <>
            {!user && <Login />}
            {user && <FriendsHome />}
            </>
          }/>
          <Route path="/friends/all" element={
            <>
            {!user && <Login />}
            {user && <AllFriends />}
            </>
          }/>
          <Route path="/friends/requests" element={
            <>
            {!user && <Login />}
            {user && <FriendRequests />}
            </>
          }/>
          <Route path="/profile/:userId" element={
            <>
            {!user && <Login />}
            {user && <Profile profileView="main" />}
            </>
          }/>
          <Route path="/profile/:userId/friends" element={
            <>
            {!user && <Login />}
            {user && <Profile profileView="friends" />}
            </>
          }/>
          <Route path="/profile/:userId/edit" element={
            <>
            {!user && <Login />}
            {user && <Profile profileView="edit" />}
            </>
          }/>
        </Routes>
      </>)}
      <Toast visible={toastVisible} params={toastParams}/>
    </div>
    </>
  );
}

export default App;
