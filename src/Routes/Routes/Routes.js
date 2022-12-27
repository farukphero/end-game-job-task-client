import SignIn from "../../AuthMethod/SignIn/SignIn";
import SignUp from "../../AuthMethod/SignUp/SignUp";
import Main from "../../Layout/Main/Main";
import About from "../../Pages/Home/About/About";
import EditProfile from "../../Pages/Home/EditProfile/EditProfile";
import Home from "../../Pages/Home/Home/Home";
import Profile from "../../Pages/Home/Profile/Profile";

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
            element: <Profile></Profile>,
        },
        {
            path: "/Profile",
            element: <Profile></Profile>,
        },
        {
            path: "/EditProfile",
            element: <EditProfile></EditProfile>,
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
  