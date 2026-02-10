import React from 'react'
import "./App.css";
import User from "./components/getUser/User.jsx";
import AddUser from './components/addUser/AddUser.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UpdateUser from './components/updateUser/UpdateUser.jsx';

function App(){
  const route = createBrowserRouter([
    {
      path:"/",
      element: <User />
    },
    {
      path: "/add",
      element: <AddUser />
    },
    {
      path: "/update/:id",
      element:<UpdateUser />
    }
  ]);
  return (
    <div>
      <RouterProvider router={route}></RouterProvider>
    </div>
  )
}
export default App
