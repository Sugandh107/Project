import * as React from "react";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/Shop/Menu";
import Signup from "../components/Signup";
import Profile from "../pages/Dashboard/Profile";
import Login from "../components/Modal";
import LoginUser from "../components/LoginUser";
import Cartpage from "../pages/Shop/Cartpage";
import Dashboardlayout from "../layout/Dashboardlayout";
import Dashboard from "../pages/Dashboard/admin/Dashboard";
import Users from "../pages/Dashboard/admin/Users";
import AddMenu from "../pages/Dashboard/admin/AddMenu";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    children:[
      {
        path:"/",
        element: <Home/>
      },
      {
        path:"/menu",
        element:<Menu/>
      },{
        path:'/cart',
        element:<Cartpage/>
      },
      {
        path: "/update-profile",
        element: <Profile/>
      }
    ]
  },
  ,{
    path:"/signup",
    element:<Signup/>
  },{
    path:"/login",
    element:<LoginUser/>
  },{
    path:"/dashboard",
    element:<Dashboardlayout/>,
    children:[
      {
        path:'',
        element:<Dashboard/>
      },{
        path:'users',
        element:<Users/>
      },{
        path:'addmenu',
        element:<AddMenu/>
      },
    ]
    } 
  
]);
export default router;