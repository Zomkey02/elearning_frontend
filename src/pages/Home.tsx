import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
     <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-gray-200 flex items-center justify-center">
        {/* Placeholder for Image */}
        <div className="absolute inset-0 bg-gray-400 flex items-center justify-center">
          <div className="text-white text-2xl font-bold">IMAGE PLACEHOLDER</div>
        </div>

        {/* Overlay Text */}
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-widest uppercase">
            Grow your money, your way
          </h1>
        </div>
      </section>

      {/* Learn Investing Section */}
      <section className="py-16 px-6 bg-white text-center max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Learn investing, made easy
        </h2>
        <p className="text-lg md:text-xl text-gray-700 mb-8">
          Whether you're just getting started or simply curious about investing,  
          <strong> Flourish Finance Academy</strong> makes it easy to understand and fun to explore.
          <br /><br />
          Learn the basics at your own pace with simple explanations, real-life examples,
          and a space that helps you grow financially, one step at a time.
        </p>
        <Link to="/e-learning">
          <button className="bg-[#6DAE81] text-white px-6 py-3 rounded-lg hover:bg-[#5b986f] transition">
            Get started
          </button>
        </Link>
      </section>

      {/* E-LEARNING PREVIEW IMAGE */}
      <section className="flex justify-center py-12">
        <div className="w-[80%] h-64 bg-gray-300 flex items-center justify-center rounded-xl shadow-md">
          <span className="text-gray-700 text-lg font-semibold">E-Learning Page Preview Placeholder</span>
        </div>
      </section>

      {/* Numbering Section*/}
      <section className="py-20 px-6 bg-[#f8f8f8]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-start justify-center">
          {/* LEFT TITLE */}
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-2xl md:text-4xl font-bold">
              It’s about time you had a place to learn investing that actually makes sense and feels like it’s made for you.
            </h2>
          </div>

          {/* RIGHT FEATURES */}
          <div className="md:w-1/2 space-y-8">
            {/* Feature 1 */}
            <div className="flex items-start">
              <div className="text-3xl font-bold text-[#6DAE81] w-10 shrink-0">1</div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Made to Feel Like Home</h3>
                <p className="text-gray-700">
                  Learning about money can feel intimidating, but it shouldn’t. This platform is designed to help you feel safe while learning something new.
                </p>
              </div>
            </div>
            {/* Feature 2 */}
            <div className="flex items-start">
              <div className="text-3xl font-bold text-[#6DAE81] w-10 shrink-0">2</div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">No Finance Degree Required</h3>
                <p className="text-gray-700">
                  You don’t need to speak “Wall Street” to understand the basics. We explain everything in clear language that just makes sense. No Fluff, No Stress.
                </p>
              </div>
            </div>
            {/* Feature 3 */}
            <div className="flex items-start">
              <div className="text-3xl font-bold text-[#6DAE81] w-10 shrink-0">3</div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Learn Your Way, On Your Time</h3>
                <p className="text-gray-700">
                  You're not here for pressure or deadlines. Learn at your own pace, take breaks, and come back whenever you’re ready, your progress is always saved.
                </p>
              </div>
            </div>
            {/* Feature 4 */}
            <div className="flex items-start">
              <div className="text-3xl font-bold text-[#6DAE81] w-10 shrink-0">4</div>
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
      {/* Section Title */}
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-12">
        But it's more than just E-Learning, stay updated with the economy
      </h2>

      {/* Featured News Box */}
      <div className="flex flex-col md:flex-row mb-12">
        {/* Image Placeholder */}
        <div className="w-full md:w-1/3 h-64 bg-gray-300" />

        {/* Text Box */}
        <div className="w-full md:w-2/3 bg-[#6DAE81] text-white p-6 flex items-center">
          <div>
            <h3 className="text-xl font-semibold mb-2">Blog Title Placeholder</h3>
            <p className="mb-4">A short subtitle or excerpt from the article goes here. This will be dynamic content later.</p>
            <a href="#" className="underline hover:text-gray-100 transition">
              Read more →
            </a>
          </div>
        </div>
      </div>

      {/* News Cards Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
          News Card Component Placeholder
        </div>
        <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
          News Card Component Placeholder
        </div>
      </div>
      </section>

      {/* Testimonial Section */}
      <section className='py-16'>
        <h2 className='text-center text-3x1 font-semibold mb-12'>
          Proof that learning can be simple and fun
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {/* Card 1 */}
          <div className='bg-[#F7D6D6] p-6 rounded-lg shadow-md'>
            <div className='text-sm font-semibold'>– Marie, 22</div>
            <h3 className='text-lg font-semibold mt-2'>
              Keys to writing copy that actually converts and sells users
            </h3>
            <p className='text-sm mt-3 text-gray-700'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore...
            </p>
          </div>

          {/* Card 2 */}
          <div className='bg-[#F7D6D6] p-6 rounded-lg shadow-md'>
            <div className='text-sm font-semibold'>– Marie, 22</div>
            <h3 className='text-lg font-semibold mt-2'>
              Keys to writing copy that actually converts and sells users
            </h3>
            <p className='text-sm mt-3 text-gray-700'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore...
            </p>
          </div>

          {/* Card 3 */}
          <div className='bg-[#F7D6D6] p-6 rounded-lg shadow-md'>
            <div className='text-sm font-semibold'>– Marie, 22</div>
            <h3 className='text-lg font-semibold mt-2'>
              Keys to writing copy that actually converts and sells users
            </h3>
            <p className='text-sm mt-3 text-gray-700'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore...
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore...
            </p>
          </div>

          {/* Card 4 */}
          <div className='bg-[#F7D6D6] p-6 rounded-lg shadow-md'>
            <div className='text-sm font-semibold'>– Marie, 22</div>
            <h3 className='text-lg font-semibold mt-2'>
              Keys to writing copy that actually converts and sells users
            </h3>
            <p className='text-sm mt-3 text-gray-700'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore...
            </p>
          </div>

          {/* Card 5 */}
          <div className='bg-[#F7D6D6] p-6 rounded-lg shadow-md'>
            <div className='text-sm font-semibold'>– Marie, 22</div>
            <h3 className='text-lg font-semibold mt-2'>
              Keys to writing copy that actually converts and sells users
            </h3>
            <p className='text-sm mt-3 text-gray-700'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore...
            </p>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home