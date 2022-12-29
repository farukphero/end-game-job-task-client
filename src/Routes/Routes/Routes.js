import SignIn from "../../AuthMethod/SignIn/SignIn";
import SignUp from "../../AuthMethod/SignUp/SignUp";
import Main from "../../Layout/Main/Main";
import EditProfile from "../../Pages/Home/EditProfile/EditProfile";
import Home from "../../Pages/Home/Home/Home";
import Media from "../../Pages/Home/Media/Media";
import PostDetails from "../../Pages/Home/PostDetails/PostDetails";
import Profile from "../../Pages/Home/Profile/Profile";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const { createBrowserRouter } = require("react-router-dom");

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path: "/",
            element: <Home></Home>,
        },
        {
            path: "/About",
            element: <PrivateRoute><Profile></Profile></PrivateRoute>,
        },
        {
            path: "/Profile",
            element:<PrivateRoute> <Profile></Profile></PrivateRoute>,
        },
        {
            path: "/Media",
            element: <Media></Media>,
        },
        {
            path: "/PostDetails/:id",
            element:  <PrivateRoute><PostDetails></PostDetails></PrivateRoute> ,
            loader:({params}) => fetch(`https://end-game-job-task-server.vercel.app/posts/${params.id}`)
        },
        {
            path: "/EditProfile",
            element:<PrivateRoute> <EditProfile></EditProfile></PrivateRoute>,
        },
        {
            path: "/SignIn",
            element: <SignIn></SignIn>,
        },
        {
            path: "/SignUp",
            element: <SignUp></SignUp>,
        }
      ]
    },
  ]);
  