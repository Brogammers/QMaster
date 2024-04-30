import React from 'react'
import OpeningHoursForm from './OpeningHoursForm'
import DetailsPhone from './DetailsPhone'
import Image from 'next/image'
import WorkingHours from '../../../public/working-hours.svg';

export default function OpeningHours() {
  return (
    <div>
      <div className='w-full flex justify-center items-center gap-4'>
        <div className='w-1/3'>
          <OpeningHoursForm />
        </div>
        <div className='w-2/3 flex flex-row justify-center gap-24'>
          <Image
            src={WorkingHours}
            alt='Working hours image'
            width={360}
          />
          <div className='flex justify-center items-center'>
            <DetailsPhone />
          </div>
        </div>
      </div>
    </div>
  )
}
