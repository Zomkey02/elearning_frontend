import React from 'react'



const ELearning = () => {
  
  return (
    <div className='flex justify-center items center min-h-screen'>
      <div className='bg-green-200 rounded-xl shadow-lg w-full max-w-5x1 p-6'>

        <div className='flex space x-4 mb-6'>
          <button className='px-4 px-2 bg-white text-black font-semibold rounden-t-md shadow-inner'>
            Investing
          </button>
          <button className='px-4 px-2 bg-green-300 text-black font-semibold rounden-t-md'>
            Personal Finance
          </button>
          <button className='px-4 px-2 bg-green-300 text-black font-semibold rounden-t-md'>
            Lorem ipsum
          </button>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          <div className='bg-white p-4 rounded-lg shadow-md'>
            <h3 className='text-lg font-semibold mb-2'>Investing 101: The Basics</h3>
            <p className='text-sm font-bold mb-1'>TAGS</p>
            <p className='text-sm text-gray-600'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
            </p>
          </div>
        </div>

      </div>

    </div>
  )
}

export default ELearning