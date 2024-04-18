'use client';
import React, { useEffect, useRef, useState } from 'react';
import { QueuesData } from '../../../data';
import QueueBuilderIllustration from '../../../public/QueueBuilder.svg'
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faUsers } from '@fortawesome/free-solid-svg-icons';

export default function QueuesList() {
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [queues, setQueues] = useState(QueuesData);
  
  
  const toggleMenu = (index: any) => {
    if (openMenuIndex === index) {
      setOpenMenuIndex(null); // Close the menu if it's already open
    } else {
      setOpenMenuIndex(index); // Open the menu for the clicked item
    }
  };

  const deleteQueue = (index: any) => {
    const newQueues = queues.filter((_, i) => i !== index);
    setQueues(newQueues);
    setOpenMenuIndex(null); // Close the menu after deleting the item
  };

  return (
    <div className='w-full'>
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Create New Queue</button>
      <div className=' w-full grid grid-cols-2 gap-4 mt-4 '>
        {queues.map((queue, index) => (
          <div key={index} className='w-[415px] h-[305px] bg- flex-shrink-0 rounded-xl p-4 bg-gray-700'>
            <div className='flex  justify-between'>
              <div className='flex items-center gap-2 mb-4 text-white'>
                <FontAwesomeIcon icon={faUsers} className='w-6 h-6 ' />
                <h2 className=''>
                  {queue[0]}
                </h2>
              </div>
              <div className='relative w-8 h-8'>
                <button className='w-8 h-8 text-white hover:bg-gray-500 rounded-full p-1' onClick={() => toggleMenu(index)}>
                  <FontAwesomeIcon icon={faEllipsisVertical} className='w-6 h-6' />
                </button>
                {openMenuIndex === index && (
                  <div className="absolute top-full right-0 bg-white border border-gray-300 rounded-md z-50">
                    <ul className='p-0 m-0'>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => console.log('Edit')}
                      >
                        Edit
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() =>{ 
                          deleteQueue(index); 
                          setOpenMenuIndex(null);
                          }}
                      >
                        Delete
                      </li>
                    </ul>
                  </div>
                )}
              </div>
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
