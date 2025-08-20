import React from 'react'
import LogoOne from '../assets/logos/logo_one.svg'
import Leaf from '../assets/images/BackgroundImg/leaf.png'
import { PageLoader } from '../components/Loading'
import { useAsync } from '../hooks/useAsync'

const About = () => {
  const { loading, error } = useAsync(async () => {
    /* await new Promise((res) => setTimeout(res, 1200)); */
    return null;
  }, []);

  if (loading) return <PageLoader label='Loading Page...' />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='min-h-screen'>
      <section className='flex flex-col items-center gap-8 mt-10 mb-14 md:flex-row md:gap-16'>
        <div className='flex flex-col gap-2 text-left md:w-1/3'>
          <div className='w-auto rounded-lg'>
            <img src={LogoOne} alt='Logo Img as background' className='w-auto '/>
          </div>
        </div>
          <div className='md:w-2/3'>
          <h2 className='mb-3'>Why we started the FF Academy</h2>
          <p className=''>
            Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet elit eget tempus vulputate consectetur tortor. Neque quam neque ut elit varius sagittis pellentesque tristique ultrices. Morbi in eu tellus ultrices eu.
          </p>
        </div>     
      </section>

      <section className='w-full rounded-lg bg-accent'>
        <div className='flex flex-col justify-between max-w-6xl gap-12 px-6 m-10 mx-auto md:flex-row md:py-10 md:gap-16'>
          {/* Our Mission */}
          <div className='max-w-md mx-auto text-center md:text-left md:w-1/2'>
            <h4 className='mb-4 font-semibold'>Our Mission</h4>
            <p className='leading-relaxed '>
              Lorem ipsum dolor sit amet consectetur. Lorem ipsum elit eget tempus vulputate consectetur tortor. Neque quam neque ut elit varius sagittis pellentesque tristique ultrices. Morbi in eu tellus ultrices eu.
            </p>
          </div>

          {/* Our Vision */}
          <div className='max-w-md mx-auto text-center md:text-right md:w-1/2'>
            <h4 className='mb-4 font-semibold'>Our Vision</h4>
            <p className='leading-relaxed '>
              Lorem ipsum dolor sit amet consectetur. Lorem ipsum elit eget tempus vulputate consectetur tortor. Neque quam neque ut elit varius sagittis pellentesque tristique ultrices. Morbi in eu tellus ultrices eu.
            </p>
          </div>
        </div>
      </section>

      <section className='max-w-2xl px-6 mx-auto mb-24 text-center'>
        <h3 className='mb-4 font-semibold'>Its built for you!</h3>
        <p className='leading-relaxed '>
          plus add on what makes us different? consectetur. Lacina amet elit eget tempus ullamcorper consectetur tortor. Neque quam neque ut elit varius sagittis pellentesque tristique ultrices. Morbi in eu tellus varius pellentesque eu eu vel.
        </p>
      </section>

      <section className='relative max-w-2xl px-6 mx-auto mb-24 text-center h-50'>
        
        <img 
          src={Leaf} 
          alt='Leaf Img as background' 
          className='absolute inset-0 object-contain object-center w-full h-full opacity-30 -z-10 '/>
          
        <h3 className='mb-4 font-semibold'>A Note from Creator</h3>
        <p className='leading-relaxed '>
          plus add on what makes us different? consectetur. Lacina amet elit eget tempus ullamcorper consectetur tortor. Neque quam amet elit eget tempus ullamcorper neque ut elit varius amet elit eget tempus ullamcorper sagittis pellentesque tristique ultrices. Morbi in eu tellus varius pellentesque eu eu vel.
        </p>
      </section>
    </div>
  )
}

export default About