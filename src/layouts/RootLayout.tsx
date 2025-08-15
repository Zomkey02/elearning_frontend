import { Outlet } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

const RootLayout = () => {
  return (
    <div>
      <header className='relative inset-x-0 top-0 z-50 items-center md:px-[3%] lg:px-[4%]'>
        <Navbar/>
      </header>
      
      <main className='px-[8%]'>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default RootLayout
