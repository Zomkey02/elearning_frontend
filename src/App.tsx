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
import ELearning from './pages/ELearning'

import CreateCourse from './pages/CreateCourse'
import CreateLesson from './pages/CreateLesson'



const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout/>}>
        <Route index element={<Home/>} />
        <Route path="login" element={<Login/>} />
        <Route path="signup" element={<SignUp/>} />
        <Route path="elearning" element={<ELearning/>} />

        

        <Route element = {<PrivateLayout />}>
          <Route path="dashboard" element={<Dashboard/>} />
          <Route path="course/create" element={<CreateCourse/>} />
          <Route path= "lesson/create" element={<CreateLesson/>} />

        </Route>

      </Route>

      
    </>
  )
);

function App() {
  return <RouterProvider router={router} />
}

export default App

