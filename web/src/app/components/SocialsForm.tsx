import { Field, Form, Formik } from 'formik';
import React from 'react'
import DetailsFormsButtons from './DetailsFormsButtons';
import { socialMediaPlatforms } from '../../../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
            {socialMediaPlatforms.map((platform) => (
              <>
                {/* <label htmlFor={platform.name} className="block mb-2 text-sm font-medium text-gray-700 text-start">
                  {platform.name}
                </label> */}
                <div className='flex justify-start items-center mb-4 gap-4'>
                  {/* <p className='my-2'>{platform.url}</p> */}
                  <figure className="rounded-full m-0 p-4 bg-ocean-blue flex justify-center items-center">
                    <FontAwesomeIcon className="text-crystal-blue" icon={platform.icon} />
                  </figure>
                  <Field
                    type='link'
                    name={platform.name}
                    placeholder={`Enter your ${platform.name} link`}
                    className="w-full h-8 px-2 py-3 border-2 border-off-white rounded-lg outline-none focus:border-baby-blue"
                  />
                </div>
              </>
            ))}
            <DetailsFormsButtons />
          </Form>
        )}
      </Formik>
    </div>
  )
}
