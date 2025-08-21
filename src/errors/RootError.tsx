import { NavLink } from "react-router-dom"
import Navbar from "../components/layout/Navbar"

const RootError = () => {
  return (
    <div>
        <Navbar />

        <h1 className="absolute">404, Page not found.</h1>
        <NavLink to="/">Go Home</NavLink>
    </div>
  )
}

export default RootError