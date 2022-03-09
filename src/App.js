import { Route, Routes } from "react-router";
import Home from './components/Home';
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Signup />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/login" element={<Login />}/>
          {/* <Route path="/signup" />
          <Route path="/login" /> */}
        </Routes>
    </div>
  );
}

export default App;
