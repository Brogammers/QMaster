import React from 'react'
import Image from 'next/image';

export default function DetailsPhone() {
  return (
    <div className='bg-gray-600 w-60 h-[470px] rounded-3xl flex flex-col justify-center items-center ml-20'>
          <div className='flex items-center justify-center w-40 h-40 mb-6 bg-black rounded-2xl'>
            <Image
              src='/qrcode.png'
              alt='QR Code'
              width={122}
              height={122}
            />
          </div>
          <h3 className='text-white'>Scan me!</h3>
        </div>
  )
}
