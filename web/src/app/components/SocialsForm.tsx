import { Field, Form, Formik } from 'formik';
import React from 'react'
import DetailsFormsButtons from './DetailsFormsButtons';

export default function SocialsForm() {
  return (
    <div className="w-full">
      <Formik
        initialValues={{
          Facebook: '',
          LinkedIn: '',
          X: '',
          Instagram: '',
          Tiktok: '',
          Pinterest: '',
          Youtube: '',
        }}
        onSubmit={values => {
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {props => (
          <Form onSubmit={props.handleSubmit} className='flex flex-col'>
            <label htmlFor='Facebook' className='block mb-2 text-sm font-medium text-gray-700'>
              Facebook
            </label>
            <div className='flex items-center mb-4 '>
              <p className='my-2'>https://facebook.com/</p>
              <Field
                type='link'
                name='Facebook'
                placeholder='Enter your facebook link'
                className="w-full h-8 p-2 border-2 border-gray-300 rounded-lg outline-none focus:border-blue-500"
              />
            </div>
            <label htmlFor='LinkedIn' className='block mb-2 text-sm font-medium text-gray-700'>
              LinkedIn
            </label>
            <div className='flex items-center mb-4 '>
              <p className='my-2'>https://LinkedIn.com/</p>
              <Field
                type='link'
                name='LinkedIn'
                placeholder='Enter your linkedIn link'
                className="w-full h-8 p-2 border-2 border-gray-300 rounded-lg outline-none focus:border-blue-500"
              />
            </div>
            <label htmlFor='X' className='block mb-2 text-sm font-medium text-gray-700'>
              X
            </label>
            <div className='flex items-center mb-4 '>
              <p className='my-2'>https://x.com/</p>
              <Field
                type='link'
                name='X'
                placeholder='Enter your X link'
                className="w-full h-8 p-2 border-2 border-gray-300 rounded-lg outline-none focus:border-blue-500"
              />
            </div>
            <label htmlFor='Instagram' className='block mb-2 text-sm font-medium text-gray-700'>
              Instagram
            </label>
            <div className='flex items-center mb-4 '>
              <p className='my-2'>https://Instagram.com/</p>
              <Field
                type='link'
                name='Instagram'
                placeholder='Enter your instagram link'
                className="w-full h-8 p-2 border-2 border-gray-300 rounded-lg outline-none focus:border-blue-500"
              />
            </div>
            <label htmlFor='Youtube' className='block mb-2 text-sm font-medium text-gray-700'>
              Youtube
            </label>
            <div className='flex items-center mb-4 '>
              <p className='my-2'>https://youtube.com/</p>
              <Field
                type='link'
                name='Youtube'
                placeholder='Enter your Youtube link'
                className="w-full h-8 p-2 border-2 border-gray-300 rounded-lg outline-none focus:border-blue-500"
              />
            </div>
            <label htmlFor='Pinterest' className='block mb-2 text-sm font-medium text-gray-700'>
              Pinterest
            </label>
            <div className='flex items-center mb-4 '>
              <p className='my-2'>https://pinterest.com/</p>
              <Field
                type='link'
                name='Pinterest'
                placeholder='Enter your Pinterest link'
                className="w-full h-8 p-2 border-2 border-gray-300 rounded-lg outline-none focus:border-blue-500"
              />
            </div>
            <label htmlFor='Tiktok' className='block mb-2 text-sm font-medium text-gray-700'>
              Tiktok
            </label>
            <div className='flex items-center mb-6 '>
              <p className='my-2'>https://tiktok.com/</p>
              <Field
                type='link'
                name='Tiktok'
                placeholder='Enter your Tiktok link'
                className="w-full h-8 p-2 border-2 border-gray-300 rounded-lg outline-none focus:border-blue-500"
              />
            </div>
            <DetailsFormsButtons />
          </Form>
        )}
      </Formik>
    </div>
  )
}
