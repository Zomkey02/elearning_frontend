import React from 'react'
import { Link } from 'react-router-dom'
import LogoThree from '../assets/logos/logo_three.svg'

const Home = () => {
  return (
     <div className="w-full">
      {/* Hero Section */}      
      <section className="relative h-[70vh] flex items-center justify-center">
        {/* Logo Image */}
        <div className="absolute flex items-center justify-center">
            <img src={LogoThree} alt='Logo Img as background' className='h-[50vh] w-auto'/>
        </div>

        {/* Overlay Text */}
        <div className="relative z-10 text-center">
          <h1 className='tracking-widest text-black uppercase sm:text-5xl md:text-6xl drop-shadow-lg'>
            Grow your money, your way
          </h1>
        </div>
      </section>

      {/* Learn Investing Section */}
      <section className="max-w-4xl px-6 py-16 mx-auto text-center">
        <h2 className="mb-6 text-4xl md:text-5xl">
          Learn investing, made easy
        </h2>
        <p className="mb-8 text-lg text-gray-700 md:text-xl">
          Whether you're just getting started or simply curious about investing,  
          <strong> Flourish Finance Academy</strong> makes it easy to understand and fun to explore.
          <br /><br />
          Learn the basics at your own pace with simple explanations, real-life examples,
          and a space that helps you grow financially, one step at a time.
        </p>
        <Link to="/elearning">
          <button className='btn-hero'>
            Get started
          </button>
        </Link>
      </section>

      {/* E-LEARNING PREVIEW IMAGE */}
      <section className="flex justify-center py-12">
        <div className="w-[80%] h-64 bg-gray-300 flex items-center justify-center rounded-xl shadow-md">
          <span className="text-lg font-semibold text-gray-700">E-Learning Page Preview Placeholder</span>
        </div>
      </section>

      {/* Numbering Section*/}
      <section className='px-6 py-10 rounded-lg bg-accent drop-shadow-lg'>
        <div className="flex flex-col items-center justify-center max-w-6xl gap-12 mx-auto md:flex-row">
          {/* LEFT TITLE */}
          <div className='text-center md:w-1/3 md:text-left'>
            <h2 className='text-2xl font-bold md:text-4xl xl:text-6xl'>
              It’s about time you had a place to learn investing that actually makes sense and feels like it’s made for you.
            </h2>
          </div>

          {/* RIGHT FEATURES */}
          <div className="space-y-8 md:w-2/3">
            {/* Feature 1 */}
            <div className="flex items-center">
              <div className='w-10 mr-3 font-semibold leading-none text-center xl:text-7xl md:text-8xl sm:text-7xl text-primary shrink-0'>1</div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold">Made to Feel Like Home</h3>
                <p>
                  Learning about money can feel intimidating, but it shouldn’t. This platform is designed to help you feel safe while learning something new.
                </p>
              </div>
            </div>
            {/* Feature 2 */}
            <div className="flex items-center">
              <div className='w-10 mr-3 font-semibold leading-none text-center xl:text-7xl md:text-8xl sm:text-7xl text-primary shrink-0'>2</div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">No Finance Degree Required</h3>
                <p className="text-gray-700">
                  You don’t need to speak “Wall Street” to understand the basics. We explain everything in clear language that just makes sense. No Fluff, No Stress.
                </p>
              </div>
            </div>
            {/* Feature 3 */}
            <div className="flex items-center">
              <div className='w-10 mr-3 font-semibold leading-none text-center xl:text-7xl md:text-8xl sm:text-7xl text-primary shrink-0'>3</div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Learn Your Way, On Your Time</h3>
                <p className="text-gray-700">
                  You're not here for pressure or deadlines. Learn at your own pace, take breaks, and come back whenever you’re ready, your progress is always saved.
                </p>
              </div>
            </div>
            {/* Feature 4 */}
            <div className="flex items-center">
              <div className='w-10 mr-3 font-semibold leading-none text-center xl:text-7xl md:text-8xl sm:text-7xl text-primary shrink-0'>4</div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Built for Real Life</h3>
                <p className="text-gray-700">
                  From confusing ETFs to saving for the future, we cover real topics that matter. This isn’t theory, it’s practical, simple knowledge you can actually use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 bg-white">
        <h2 className="mb-12 text-2xl text-center md:text-4xl">
          But it's more than just E-Learning, stay updated with current Finance News!
        </h2>

        <div className="flex flex-col mb-12 md:flex-row">

          <div className="w-full h-64 bg-gray-300 md:w-1/3" />

          <div className="w-full md:w-2/3 bg-[#6DAE81] p-6 flex items-center">
            <div>
              <h3 className="mb-2 text-xl font-semibold text-white">Blog Title Placeholder</h3>
              <p className="mb-4 text-white">A short subtitle or excerpt from the article goes here. This will be dynamic content later.</p>
              <a href='/blog' className="text-white transition hover:font-semibold">
                Read more →
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex items-center justify-center h-64 text-gray-500 bg-gray-200 rounded-lg">
            News Card Component Placeholder
          </div>
          <div className="flex items-center justify-center h-64 text-gray-500 bg-gray-200 rounded-lg">
            News Card Component Placeholder
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className='py-16'>
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
            <p className='mt-3 text-sm text-gray-700'>
              No judgment, no jargon — just clear guidance. I feel supported every step of the way. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore...
            </p>
          </div>

          {/* Card 2 */}
          <div className='max-w-[300px] bg-primary_lighter p-6 rounded-lg shadow-md flex-shrink-0'>
            <div className='text-sm font-semibold'> Marie, 22</div>
            <h3 className='mt-2 text-lg font-semibold'>
              Exactly What I Was Looking For
            </h3>
            <p className='mt-3 text-sm text-gray-700'>
              The lessons are short, visual, and easy to fit into my busy schedule. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore...
            </p>
          </div>

          {/* Card 3 */}
          <div className='max-w-[300px] bg-primary_lighter p-6 rounded-lg shadow-md flex-shrink-0'>
            <div className='text-sm font-semibold'> Marie, 22</div>
            <h3 className='mt-2 text-lg font-semibold'>
              Clear and Straightforward
            </h3>
            <p className='mt-3 text-sm text-gray-700'>
              The tone is friendly but still professional. I never feel talked down to. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore...
            </p>
          </div>

          {/* Card 4 */}
          <div className='max-w-[300px] bg-primary_lighter p-6 rounded-lg shadow-md flex-shrink-0'>
            <div className='text-sm font-semibold'> Marie, 22</div>
            <h3 className='mt-2 text-lg font-semibold'>
              Easy to Navigate
            </h3>
            <p className='mt-3 text-sm text-gray-700'>
              The platform is simple to use, and I can always find what I’m looking for quickly. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore...
            </p>
          </div>
          {/* Card 5 */}
          <div className='max-w-[300px] bg-primary_lighter p-6 rounded-lg shadow-md flex-shrink-0'>
            <div className='text-sm font-semibold'> Marie, 22</div>
            <h3 className='mt-2 text-lg font-semibold'>
              Well-Organized Content
            </h3>
            <p className='mt-3 text-sm text-gray-700'>
              Everything is broken down into clear sections, which makes learning easier. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore...
            </p>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home