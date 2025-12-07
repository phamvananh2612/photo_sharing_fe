import LayoutDefault from "../component/LayoutDefault";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import GuestRoute from "./GuestRoute";
import Profile from "../pages/Profile";
import Feed from "../pages/Feed";
import HomePublic from "../pages/Home";
import PostDetail from "../pages/PostDetail";

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
          { path: "posts/:photoId", element: <PostDetail /> },
        ],
      },
    ],
  },
];

export default routes;
