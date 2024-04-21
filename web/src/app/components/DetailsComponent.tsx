'use client'
import React, { useState } from 'react';
import DetailsForm from './DetailsForm';
import DetailsPhone from './DetailsPhone';


export default function DetailsComponent() {
  return (
    <div className='flex'>
      <div className='w-9/12'>
        <DetailsForm />
      </div>
      <div className='self-center'>
        <DetailsPhone />
      </div>
    </div>
  );
}
