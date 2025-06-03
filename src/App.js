import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import LayoutDefault from "./component/LayoutDefault";
import PrivateRoute from "./component/PrivateRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserList from "./component/UserList";
import About from "./pages/About";
import UserDetail from "./component/UserDetail";
import UserPhotos from "./component/UserPhotos";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutDefault />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path="about" element={<About />}>
              <Route path="users/:id" element={<UserDetail />} />
              <Route path="photos/:userId" element={<UserPhotos />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
