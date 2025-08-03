import { 
    createBrowserRouter, // creates a router for a browser application
    createRoutesFromElements, Form, // creates routes from a set of route elements
    RouterProvider, // provides the router to the application
    Route, // a single route
} from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import PrivateLayout from './layouts/PrivateLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

import Dashboard from './pages/Dashboard'



const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout/>}>
        <Route index element={<Home/>}></Route>
        <Route path="login" element={<Login/>} />
        <Route path="signup" element={<SignUp/>} />

        <Route element = {<PrivateLayout />}>
          <Route path="dashboard" element={<Dashboard/>} />
        </Route>

      </Route>

      
    </>
  )
);

function App() {
  return <RouterProvider router={router} />
}

export default App

