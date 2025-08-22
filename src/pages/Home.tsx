import { Link } from 'react-router-dom'
import LogoThree from '../assets/logos/logo_three.svg'
import Wave from '../assets/images/BackgroundImg/wave.jpg'

const Home = () => {
  return (
     <div className='flex flex-col items-center w-full'>
      {/* Hero Section */}      
      <section className='relative h-[70vh] flex items-center justify-center max-w-6xl'>
        {/* Logo Image */}
        <div className='absolute flex items-center justify-center'>
            <img src={LogoThree} alt='Logo Img as background' className='h-[50vh] w-auto'/>
        </div>

        {/* Overlay Text */}
        <div className='relative z-10 text-center'>
          <h1 className='tracking-widest text-black uppercase sm:text-5xl md:text-6xl drop-shadow-lg'>
            Grow your money, your way
          </h1>
          
        </div>
      </section>

      {/* Learn Investing Section */}
      <section className='max-w-4xl px-16 py-16 mx-auto text-center'>
        <h2 className='mb-6 text-4xl md:text-5xl'>
          Learn investing, made easy
        </h2>
        <p className='block mb-8 text-lg md:text-xl'>
          Whether you're just getting started or simply curious about investing,  
          <strong> Flourish Finance Academy</strong> makes it easy to understand and fun to explore.
          <br /><br />
          Learn the basics at your own pace with simple explanations, real-life examples,
          and a space that helps you grow financially, one step at a time.
        </p>
        <Link to='/elearning'>
          <button className='btn-hero'>
            Get started
          </button>
        </Link>
      </section>

      {/* E-LEARNING PREVIEW IMAGE */}
      <section className='relative flex justify-center w-full px-20 pb-12 mx-auto overflow-hidden rounded-xl'>

        
        <div className='absolute inset-0 z-10 bg-accent'>
        
        <img 
            src={Wave} 
            alt='Leaf Img as background' 
            className='absolute inset-0 object-cover '
        />
        </div>


        <div className='relative z-20 flex items-center justify-center w-full bg-gray-200 rounded-lg h-70'>
          <span className='text-lg font-semibold text-dark'>E-Learning Page Preview Placeholder</span>
          
        </div>
      </section>

      {/* Numbering Section*/}
      <section className='w-full px-20 py-10 -mt-2 rounded-t-none rounded-b-lg bg-accent'>
        <div className='flex flex-col items-center justify-center max-w-6xl gap-12 mx-auto md:flex-row'>
          {/* LEFT TITLE */}
          <div className='text-center md:w-1/3 md:text-left'>
            <h2 className='font-bold md:text-4xl xl:text-5xl'>
              It’s about time you had a place to learn investing that actually makes sense and feels like it’s made for you.
            </h2>
          </div>

          {/* RIGHT FEATURES */}
          <div className='space-y-8 md:w-2/3'>
            {/* Feature 1 */}
            <div className='flex items-center'>
              <div className='mr-3 font-semibold text-center w-15 text-8xl xl:text-7xl text-primary shrink-0'>1</div>
              <div className='ml-4'>
                <h3 className='text-2xl md:text-xl'>Made to Feel Like Home</h3>
                <p className='text-lg'>
                  Learning about money can feel intimidating, but it shouldn’t. This platform is designed to help you feel safe while learning something new.
                </p>
              </div>
            </div>
            {/* Feature 2 */}
            <div className='flex items-center'>
              <div className='mr-3 font-semibold text-center w-15 text-8xl xl:text-7xl text-primary shrink-0'>2</div>
              <div className='ml-4'>
                <h3 className='text-2xl md:text-xl'>No Finance Degree Required</h3>
                <p className='text-lg'>
                  You don’t need to speak “Wall Street” to understand the basics. We explain everything in clear language that just makes sense. No Fluff, No Stress.
                </p>
              </div>
            </div>
            {/* Feature 3 */}
            <div className='flex items-center'>
              <div className='mr-3 font-semibold text-center w-15 text-8xl xl:text-7xl text-primary shrink-0'>3</div>
              <div className='ml-4'>
                <h3 className='text-2xl md:text-xl'>Learn Your Way, On Your Time</h3>
                <p className='text-lg'>
                  You're not here for pressure or deadlines. Learn at your own pace, take breaks, and come back whenever you’re ready, your progress is always saved.
                </p>
              </div>
            </div>
            {/* Feature 4 */}
            <div className='flex items-center'>
              <div className='mr-3 font-semibold text-center w-15 text-8xl xl:text-7xl text-primary shrink-0'>4</div>
              <div className='ml-4'>
                <h3 className='text-2xl md:text-xl'>Built for Real Life</h3>
                <p className='text-lg'>
                  From confusing ETFs to saving for the future, we cover real topics that matter. This isn’t theory, it’s practical, simple knowledge you can actually use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className='max-w-6xl px-10 py-16'>
        <h2 className='mb-12 text-2xl text-center md:text-4xl'>
          But it's more than just E-Learning, stay updated with current Finance News!
        </h2>

        <div className='flex flex-col mb-12 md:flex-row'>

          <div className='w-full h-64 bg-gray-300 rounded-tl-lg rounded-tr-lg md:w-1/3 md:rounded-bl-lg md:rounded-tr-none ' />

          <div className='flex items-center w-full p-6 rounded-bl-lg rounded-br-lg md:w-2/3 bg-primary md:rounded-tr-lg md:rounded-bl-none'>
            <div>
              <h3 className="mb-2 text-xl font-semibold text-white">Blog Title Placeholder</h3>
              <p className="mb-4 text-white">A short subtitle or excerpt from the article goes here. This will be dynamic content later.</p>
              <a href='/blog' className="text-white transition hover:font-semibold">
                Read more →
              </a>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <div className='flex items-center justify-center h-64 bg-gray-200 rounded-lg text-dark'>
            News Card Component Placeholder
          </div>
          <div className='flex items-center justify-center h-64 bg-gray-200 rounded-lg text-dark'>
            News Card Component Placeholder
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className='max-w-6xl py-16'>
        <h2 className='mb-12 text-3xl font-semibold text-center'>
          Proof that learning can be simple and fun
        </h2>

        <div className='flex px-4 space-x-6 overflow-x-auto'>
          {/* Card 1 */}
          <div className='max-w-[300px] bg-primary_lighter p-6 rounded-lg shadow-md flex-shrink-0'>
            <div className='text-sm font-semibold'> Marie, 22</div>
            <h3 className='mt-2 text-lg font-semibold'>
              A Safe Space to Learn
            </h3>
            <p className='mt-3 text-sm text-dark'>
              No judgment, no jargon — just clear guidance. I feel supported every step of the way. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore...
            </p>
          </div>

          {/* Card 2 */}
          <div className='max-w-[300px] bg-primary_lighter p-6 rounded-lg shadow-md flex-shrink-0'>
            <div className='text-sm font-semibold'> Marie, 22</div>
            <h3 className='mt-2 text-lg font-semibold'>
              Exactly What I Was Looking For
            </h3>
            <p className='mt-3 text-sm text-dark'>
              The lessons are short, visual, and easy to fit into my busy schedule. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore...
            </p>
          </div>

          {/* Card 3 */}
          <div className='max-w-[300px] bg-primary_lighter p-6 rounded-lg shadow-md flex-shrink-0'>
            <div className='text-sm font-semibold'> Marie, 22</div>
            <h3 className='mt-2 text-lg font-semibold'>
              Clear and Straightforward
            </h3>
            <p className='mt-3 text-sm text-dark'>
              The tone is friendly but still professional. I never feel talked down to. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore...
            </p>
          </div>

          {/* Card 4 */}
          <div className='max-w-[300px] bg-primary_lighter p-6 rounded-lg shadow-md flex-shrink-0'>
            <div className='text-sm font-semibold'> Marie, 22</div>
            <h3 className='mt-2 text-lg font-semibold'>
              Easy to Navigate
            </h3>
            <p className='mt-3 text-sm text-dark'>
              The platform is simple to use, and I can always find what I’m looking for quickly. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore...
            </p>
          </div>
          {/* Card 5 */}
          <div className='max-w-[300px] bg-primary_lighter p-6 rounded-lg shadow-md flex-shrink-0'>
            <div className='text-sm font-semibold'> Marie, 22</div>
            <h3 className='mt-2 text-lg font-semibold'>
              Well-Organized Content
            </h3>
            <p className='mt-3 text-sm text-dark'>
              Everything is broken down into clear sections, which makes learning easier. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore...
            </p>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home