import React from 'react';
import {QueuesData} from '../../../data';
import QueueBuilderIllustration from '../../../public/QueueBuilder.svg'
import Image from 'next/image'; 
import QueueModal from '../shared/QueueModal';

export default function QueueBuilder() {
  return (
    <div>
        <div className='w-full flex justify-center'>
        <div className='w-2/4 h-96 justify-around flex flex-col items-center'>
          <Image src={QueueBuilderIllustration} alt="Queue Builder Illustration" />
          <h2>Queue Builder</h2>
          <p className='text-center'>Welcome to the Queue builder! To create your first Queue, please click on the &apos;Create New Queue&apos; button</p>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Create New Queue</button>
        </div>
        </div>   
    </div>
  )
}
