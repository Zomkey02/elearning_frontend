import { 
    createBrowserRouter, 
    createRoutesFromElements, 
    RouterProvider, 
    Route, 
} from 'react-router-dom'

import RootLayout from './layouts/RootLayout'
import PrivateLayout from './layouts/PrivateLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

import Dashboard from './pages/Dashboard'
import ELearning from './pages/ELearning'

import SingleCourse from './pages/course/SingleCourse'
import CreateCourse from './pages/course/CreateCourse'
import UpdateCourse from './pages/course/UpdateCourse'

import SingleLesson from './pages/lessons/SingleLesson'
import CreateLesson from './pages/lessons/CreateLesson'
import UpdateLesson from './pages/lessons/UpdateLesson'

import Blog from './pages/blog/Blog'
import About from './pages/About'
import Contact from './pages/Contact'
import RootError from './errors/RootError'



const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout/>} errorElement={<RootError/>}>
        <Route index element={<Home/>} />

        <Route path="elearning" element={<ELearning/>} />
        <Route path="blog" element={<Blog/>} />
        <Route path="about" element={<About/>} />

        
        <Route path="contact" element={<Contact/>} />
        <Route path="login" element={<Login/>} />
        <Route path="signup" element={<SignUp/>} />

      
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

