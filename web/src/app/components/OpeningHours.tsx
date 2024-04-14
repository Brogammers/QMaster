import React from 'react'
import OpeningHoursField from './OpeningHoursField'
import OpeningHoursForm from './OpeningHoursForm'
import DetailsPhone from './DetailsPhone'

export default function OpeningHours() {
  return (
    <div>
      <div className='flex'>
        <div className='w-9/12 '>
            <OpeningHoursForm />
        </div>
        <div className='self-center'>
          <DetailsPhone />
        </div>
      </div>
    </div>
  )
}
