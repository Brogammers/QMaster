import React from 'react';
import { QueuesData } from '../../../data';
import QueueBuilderIllustration from '../../../public/QueueBuilder.svg'
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faUsers } from '@fortawesome/free-solid-svg-icons';

export default function QueuesList() {
  return (
    <div className='w-full'>
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Create New Queue</button>
      <div className=' w-full grid grid-cols-2 gap-4 mt-4 '>
        {QueuesData.map((queue, index) => (
          <div key={index} className='w-[415px] h-[305px] bg- flex-shrink-0 rounded-xl p-4 bg-gray-700'>
            <div className='flex  justify-between'>
              <div className='flex items-center gap-2 mb-4 text-white'>
                <FontAwesomeIcon icon={faUsers} className='w-6 h-6 ' />
                <h2 className=''>
                  {queue[0]}
                </h2>
              </div>
              <button className='w-8 h-8 text-white hover:bg-gray-500 rounded-full p-1'>
                <FontAwesomeIcon icon={faEllipsisVertical}  className='w-6 h-6'/>
              </button>
            </div>
            <ul>
              <div className='flex text-white font-bold'>
                <p className='w-4/6'>Max Length</p>
                <li>{queue[1]}</li>
              </div>
              <div className='flex text-white font-bold'>
                <p className='w-4/6'>Number of visitors to notify</p>
                <li>{queue[2]}</li>
              </div>
              <div className='flex text-white font-bold'>
                <p className='w-4/6'>Estimated waiting time mode</p>
                <li>{queue[3]}</li>
              </div>
              <div className='flex text-white font-bold'>
                <p className='w-4/6'>Enabled only in opening hours</p>
                <li>{queue[4]}</li>
              </div>
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
