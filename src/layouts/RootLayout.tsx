import { Outlet } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

const RootLayout = () => {
  return (
    <div>
      <header>
        <Navbar/>
      </header>
      
      <main className='flex flex-col justify-center bg-light'>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default RootLayout
