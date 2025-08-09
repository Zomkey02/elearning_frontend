import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const RootLayout = () => {
  return (
    <div>
      <header className='relative inset-x-0 top-0 z-50 w-full items-center'>
        <Navbar/>
      </header>
      
      <main className='px-[10%]'>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default RootLayout
