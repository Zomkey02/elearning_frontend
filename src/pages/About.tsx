import React from 'react'
import LogoOne from '../assets/logos/logo_one.svg'
import LogoTwo from '../assets/logos/logo_two.svg'

import LogoThree from '../assets/logos/logo_three.svg'
import Leaf from '../assets/images/BackgroundImg/leaf.png'
import { PageLoader } from '../components/Loading'
import { useAsync } from '../hooks/useAsync'

const About = () => {
  const { loading, error } = useAsync(async () => {
   /* await new Promise((res) => setTimeout(res, 1200)); */ // to see loader spinning
    return null;
  }, []);

  if (loading) return <PageLoader label='Loading Page...' />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>

      {/* Intro Section*/}
      <section className='flex flex-col items-start gap-8 p-6 mt-10 mb-14 md:px-[10%] md:items-center md:flex-row md:gap-16'>
         
        <div className=' md:text-right md:w-1/2'>
          <h2 className='mb-3'>
            Why we started the 
            <img 
              src={LogoTwo} alt='Small logo' className='h-full pt-2 w-80 md:hidden'/>
          </h2>
          <div className='block'>
            <p className='text-lg md:text-md'>
              Lorem ipsum dolor sit amet consectetur. 
              Lorem ipsum dolor sit amet elit eget tempus vulputate consectetur tortor. 
              Neque quam neque ut elit varius sagittis pellentesque tristique ultrices. 
              Morbi in eu tellus ultrices eu.
            </p>
          </div>
          
        </div>
        
        <div className='hidden md:block md:w-1/2'>
            <img src={LogoOne} alt='Logo Img as background' className='inline-block max-h-80 md:min-w-70 '/>
          
        </div>

            
      </section>

      {/* Second Section*/}
      <section className='w-full p-6 mb-20 rounded-lg md:py-2 bg-accent'>
        <div className='flex flex-col justify-between max-w-6xl gap-12 px-3 py-3 m-10 mx-auto md:flex-row md:py-10 md:gap-16'>

          {/* Our Mission */}
          <div className='max-w-md mx-auto text-center md:text-right md:w-1/2'>
            <h4 className='mb-4 text-2xl font-bold'>Our Mission</h4>
            <p className='text-xl leading-relaxed md:text-lg'>
              Lorem ipsum dolor sit amet consectetur. Lorem ipsum elit eget tempus vulputate consectetur tortor. Neque quam neque ut elit varius sagittis pellentesque tristique ultrices. Morbi in eu tellus ultrices eu.
            </p>
          </div>

          {/* Our Vision */}
          <div className='max-w-md mx-auto text-center md:pt-9 md:text-left md:w-1/2'>
            <h4 className='mb-4 text-2xl font-bold'>Our Vision</h4>
            <p className='text-xl leading-relaxed md:text-lg'>
              Lorem ipsum dolor sit amet consectetur. Lorem ipsum elit eget tempus vulputate consectetur tortor. Neque quam neque ut elit varius sagittis pellentesque tristique ultrices. Morbi in eu tellus ultrices eu.
            </p>
          </div>
          
        </div>
      </section>

      {/* Third Section*/}
      <section className='relative max-w-2xl px-6 py-12 mx-auto mb-10 text-center'>

          <img 
            src={Leaf} 
            alt='Leaf Img as background' 
            className='absolute -translate-x-1/2 -translate-y-1/2 opacity-30 scale-60 left-1/2 top-1/2 rotate-20'
          />
            
        <h3 className='mb-4 '>A Note from Creator</h3>
        <p className='leading-relaxed '>
          plus add on what makes us different? consectetur. Lacina amet elit eget tempus ullamcorper consectetur tortor. Neque quam amet elit eget tempus ullamcorper neque ut elit varius amet elit eget tempus ullamcorper sagittis pellentesque tristique ultrices. Morbi in eu tellus varius pellentesque eu eu vel.
        </p>
        
      </section>
    </div>
  )
}

export default About