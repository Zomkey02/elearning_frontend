import logoOne from '../../assets/logos/logo_one.svg';

const Footer = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full p-6 bg-accent md:flex-row'>
        {/* Logo */}
        <div className='flex items-center justify-center mb-6 md:mb-0 md:mr-8 lg:mr-16 '>
          <img src={logoOne} alt='My Logo' className='w-auto h-20 lg:h-20 xl:h-22'/>
        </div>

        {/* Links */}
        <div className='flex flex-row items-center justify-center text-sm sm:space-x-10 md:space-x-10 lg:space-x-20'>
          <div className='flex flex-col space-y-3 text-center md:text-left'>
            <a href='/elearning' >E-Learning</a>
            <a href="/blog" >Blog</a>
            <a href="/about" >About</a>
          </div>
          <div className='flex flex-col space-y-3 text-center md:text-left'>
            <a href="/contact" >Contact</a>
            <a href="#" >Glossary</a>
            <a href="#" >Privacy</a>
          </div>
        </div>
    </div>
  )
}
3
export default Footer