import Image from 'next/image'
import React from 'react'
import img1 from '../../public/Shoe.png'
import img2 from '../../public/elec.jpg'


const BottomSection = () => {
  return (
      <div className='hidden lg:flex flex-col space-y-6'>
        <div className='flex justify-between mx-auto w-3/4 h-80 bg-red-600 rounded-lg'>
          <div>
              <div className="p-4 text-black rounded-md h-full">
                      <p className="text-2xl font-bold mb-3">
                          Be the star of this summer&apos;s<br />
                          games
                      </p>
                  <p className="text-md">
                      Step up to the podium with top<br />
                      sneakers and great prices
                  </p>
                  <button className="px-6 py-2 border-2 border-black rounded-full hover:bg-black hover:text-white mt-10">
                      Shop Now
                  </button>
              </div>
          </div>
          <div>
              <Image
                  className='rounded-lg'
                  width={450}
                  height={300}
                  src={img1}
              />
          </div>
      </div><br />
      <div className='flex justify-between mx-auto w-3/4 h-80 bg-teal-300 rounded-lg'>
          <div>
              <div className="p-4 text-black rounded-md h-full">
                      <p className="text-2xl font-bold mb-3">
                          Be the star of this summer&apos;s<br />
                          games
                      </p>
                  <p className="text-md">
                      Step up to the podium with top<br />
                      sneakers and great prices
                  </p>
                  <button className="px-6 py-2 border-2 border-black rounded-full hover:bg-black hover:text-white mt-10">
                      Shop Now
                  </button>
              </div>
          </div>
          <div>
              <Image
                  className='w-full h-80 rounded-lg'
                  src={img2}
                  alt='img'
              />
          </div>
      </div>
      </div>
  )
}

export default BottomSection