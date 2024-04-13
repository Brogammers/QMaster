import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import Image from 'next/image';
import EmptyProfile from '../../../public/EmptyProfile.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import DetailsLogo from './DetailsLogo';

export default function DetailsForm() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [file, setFile] = useState<string | undefined>(undefined); // Fix: Specify the type of 'file' as 'string | undefined' and provide a default value of 'undefined'
  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) { // Fix: Add type annotation for the event parameter
    console.log(e.target.files);
    if (e.target.files && e.target.files.length > 0) {
      setFile(URL.createObjectURL(e.target.files[0]));
    }
  }
  
  return (
    <div className='w-full'>
      <Formik
        initialValues={{
          Logo: '',
          Name: '',
          Description: '',
          ContactEmail: '',
          Phone: '',
          Address: '',
          Language: '',
          Timezone: '',
        }}
        onSubmit={values => {
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {props => (
          <Form onSubmit={props.handleSubmit}>
            <div className='flex justify-between'>
              <div>
              <div className='flex flex-col items-center justify-center w-36 h-36'>
      <Image src={file || EmptyProfile}
        alt='Image Preview'
        width={144}
        height={144}
        className='absolute rounded-full'
      />
      <div className='absolute z-10 bg-gray-500 bg-opacity-50 rounded-full w-36 h-36' />
      <div className='z-30 flex justify-around w-2/4 gap-4 '>
        <div className='relative z-40'>
          <button type = 'button' className='absolute z-40'>
            <FontAwesomeIcon icon={faPencilAlt} color='white' className='w-4 h-4'/>
          </button>
          <input
            type='file'
            name='Logo'
            placeholder='Logo'
            className='absolute z-50 w-4 h-4 opacity-0 cursor-pointer text-[0px]'
            onChange={(event) => {
              handleImageChange(event);
              if (event.target.files && event.target.files.length > 0) {
                props.values.Logo = URL.createObjectURL(event.target.files[0]) ?? null;
              }
            }}
            accept='image/*'  
          />
        </div>
        <button
          type='button'
          onClick={() => setFile(undefined)}>
          <FontAwesomeIcon icon={faTrash} color='white' className='w-4 h-4'/>
        </button>
      </div>
    </div>
              </div>

              <div className='w-9/12'>
                <label htmlFor='Name' className='mb-1'>Name</label>
                <div>
                  <Field
                    type='text'
                    name='Name'
                    placeholder='Enter the name of your business'
                    className='w-full mb-4 border-b-2 border-gray-400 outline-none focus:border-black'
                  />
                </div>
                <label htmlFor='Description' className='mb-1'>Description</label>
                <div>
                  <Field
                    as='textarea'
                    name='Description'
                    placeholder='Describe your services'
                    className='w-full mb-4 border-b-2 border-gray-400 outline-none focus:border-black'
                  />
                </div>
                <label htmlFor='ContactEmail' className='mb-1'>
                  Contact Email
                </label>
                <div>
                  <Field
                    type='email'
                    name='ContactEmail'
                    placeholder='Enter an email for customers to contact you'
                    className='w-full mb-4 border-b-2 border-gray-400 outline-none focus:border-black'
                  />
                </div>
                <label htmlFor='Phone' className='mb-1'>Phone</label>
                <div>
                  <PhoneInput
                    name='Phone'
                    placeholder='Enter your business phone number'
                    className='w-full mb-4 border-b-2 border-gray-400 outline-none focus:border-black'
                    onChange={(value) => {
                      setPhoneNumber(value || ''); // Fix: Handle undefined value and provide default value of an empty string
                      props.values.Phone = value?.toString() ?? '';
                      console.log(value);
                    }}
                  />
                </div>

                <label htmlFor='Address' className='mb-1'>Address</label>
                <div>
                  <Field
                    type='text'
                    name='Address'
                    placeholder='Enter your business address'
                    className='w-full mb-4 border-b-2 border-gray-400 outline-none focus:border-black'
                  />
                </div>

                <label htmlFor='Language' className='mb-1'>Language</label>
                <div>
                  <Field
                    type='text'
                    name='Language'
                    placeholder='Language'
                    className='w-full mb-4 border-b-2 border-gray-400 outline-none focus:border-black'
                  />
                </div>

                <label htmlFor='Timezone' className='mb-1'>Timezone</label>
                <div>
                  <Field
                    type='text'
                    name='Timezone'
                    placeholder='Timezone'
                    className='w-full mb-4 border-b-2 border-gray-400 outline-none focus:border-black'
                  />
                </div>
              </div>
            </div>
            <button type='submit'>Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
