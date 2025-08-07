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
import UpdateCourse from './pages/UpdateCourse'
import CreateLesson from './pages/CreateLesson'
import SingleCourse from './pages/SingleCourse'
import SingleLesson from './pages/SingleLesson'
import UpdateLesson from './pages/UpdateLesson'



const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout/>}>
        <Route index element={<Home/>} />
        <Route path="login" element={<Login/>} />
        <Route path="signup" element={<SignUp/>} />
        <Route path="elearning" element={<ELearning/>} />
        <Route path="course/:courseId" element={<SingleCourse/>} />
        <Route path="course/:courseId/lesson/:lessonId" element={<SingleLesson/>} />

        <Route element = {<PrivateLayout />}>
          <Route path="dashboard" element={<Dashboard/>} />
          <Route path="course/create" element={<CreateCourse/>} />
          <Route path="course/update/:courseId" element={<UpdateCourse/>} />

          
          <Route path="lesson/create" element={<CreateLesson />} />
          <Route path= "course/:courseId/lesson/create" element={<CreateLesson/>} />
          <Route path= "course/:courseId/lesson/update/:lessonId" element={<UpdateLesson/>} />

        </Route>

      </Route>

      
    </>
  )
);

function App() {
  return <RouterProvider router={router} />
}

export default App

