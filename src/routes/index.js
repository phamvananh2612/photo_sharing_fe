import LayoutDefault from '../component/LayoutDefault';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import PrivateRoute from '../component/PrivateRoute';
import About from '../pages/About';
import UserDetail from '../component/UserDetail';
import UserPhotos from '../component/UserPhotos';
const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      {
        element: <PrivateRoute />,
        children: [
          {
            path: "about",
            element: <About />,
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
