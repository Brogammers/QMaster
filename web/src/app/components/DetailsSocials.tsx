import { Field, Form, Formik } from 'formik'
import React from 'react'
import DetailsFormsButtons from './DetailsFormsButtons';
import DetailsPhone from './DetailsPhone';
import SocialsForm from './SocialsForm';

export default function DetailsSocials() {
  return (
    <div >
      <div className='flex justify-center items-center gap-24'>
        <div className='w-3/4'>
          <SocialsForm />
        </div>
        <div className='self-start'>
          <DetailsPhone />
        </div>
      </div>
    </div>
  )
}
