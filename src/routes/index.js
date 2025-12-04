import LayoutDefault from "../component/LayoutDefault";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import GuestRoute from "./GuestRoute";

import UserPhotos from "../component/user/UserPhotos";
import Profile from "../pages/Profile";
import Posts from "../pages/Posts";
import Feed from "../pages/Feed";
import HomePublic from "../pages/Home";

const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        element: <GuestRoute />,
        children: [
          { index: true, element: <HomePublic /> },
          { path: "login", element: <Login /> },
          { path: "register", element: <Register /> },
        ],
      },

      {
        element: <PrivateRoute />,
        children: [
          { path: "feed", element: <Feed /> },
          { path: "profile", element: <Profile /> },
          { path: "profile/:id", element: <Profile /> },

          {
            path: "posts",
            element: <Posts />,
            children: [{ path: "photos/:userId", element: <UserPhotos /> }],
          },
        ],
      },
    ],
  },
];

export default routes;
