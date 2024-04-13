import React from 'react'
import Image from 'next/image';

export default function DetailsPhone() {
  return (
    <div className='flex flex-col items-center justify-center ml-20 bg-gray-700 shadow-lg w-60 h-[470px] rounded-3xl'>
  <div className='flex items-center justify-center mb-6 bg-gray-800 shadow-md w-36 h-36 rounded-xl'>
    <Image
      src='/qrcode.png'
      alt='QR Code'
      width={122}
      height={122}
    />
  </div>
  <h3 className='text-lg font-semibold text-white'>Scan me!</h3>
</div>

  )
}
