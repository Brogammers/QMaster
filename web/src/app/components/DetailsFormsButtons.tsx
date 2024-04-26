import React from 'react'

export default function DetailsFormsButtons() {
  return (
    <div className='flex self-start gap-3'>
      <button type='reset' className='w-24 py-2 font-bold text-white bg-red-500 rounded self hover:bg-red-700'>
        Cancel
      </button>
      <button type='submit' className='w-24 py-2 font-bold text-white bg-blue-500 rounded self hover:bg-blue-700'>
        Submit
      </button>
    </div>
  )
}
