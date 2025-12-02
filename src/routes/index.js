import LayoutDefault from "../component/LayoutDefault";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "../component/PrivateRoute";
import UserDetail from "../component/user/UserDetail";
import UserPhotos from "../component/user/UserPhotos";
import Profile from "../pages/Profile";
import Posts from "../pages/Posts";
const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "profile", element: <Profile /> },

      {
        element: <PrivateRoute />,
        children: [
          {
            path: "posts",
            element: <Posts />,
            children: [
              { path: "users/:id", element: <UserDetail /> },
              { path: "photos/:userId", element: <UserPhotos /> },
            ],
          },
        ],
      },
    ],
  },
];

export default routes;
