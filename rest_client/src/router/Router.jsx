import * as React from "react";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/Shop/Menu";
import Signup from "../components/Signup";
import UpdateProfile from "../pages/Dashboard/UpdateProfile";
import Login from "../components/Modal";
import LoginUser from "../components/LoginUser";
import Cartpage from "../pages/Shop/Cartpage";
import Dashboardlayout from "../layout/Dashboardlayout";
import Dashboard from "../pages/Dashboard/admin/Dashboard";
import Users from "../pages/Dashboard/admin/Users";
import AddMenu from "../pages/Dashboard/admin/AddMenu";
import MangeMenu from "../pages/Dashboard/admin/MangeMenu";
import Orders from "../pages/Dashboard/admin/Orders";
import PrivateRoute from "../privateRoute/PrivateRoute";


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
        element:<PrivateRoute><Cartpage/></PrivateRoute>
      },
      {
        path: "/update-profile",
        element: <UpdateProfile/>
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
      },
      {
        path:'addmenu',
        element:<AddMenu/>
      },
      {
        path:'managemenu',
        element:<MangeMenu/>
      },
      {
        path:'orders',
        element:<Orders/>
      }
    ]
    } 
  
]);
export default router;