import { Route, Routes, Navigate } from "react-router";
import Home from './components/Home';
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  // Presence of user will allow conditional rendering of routes/route protection on frontend
  const { user, authIsReady } = useAuthContext();

  return (
    <div className="App">
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
        </Routes>
      </>)}
    </div>
  );
}

export default App;
