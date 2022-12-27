import SignIn from "../../AuthMethod/SignIn/SignIn";
import SignUp from "../../AuthMethod/SignUp/SignUp";
import Main from "../../Layout/Main/Main";
import About from "../../Pages/Home/About/About";
import Home from "../../Pages/Home/Home/Home";

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
            element: <About></About>,
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
  