'use client'
import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import Image from 'next/image';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

export default function DetailsComponent() {
  const [phoneNumber, setPhoneNumber] = useState('')
  
  console.log(phoneNumber)
  return (
    <div className='flex'>
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
            <div className='flex'>
              <div>
                {/* <label htmlFor='Logo'>Logo</label>
                <div>
                  <Field
                    type='file'
                    name='Logo'
                    placeholder='Logo'
                    className='border-b-2 border-gray-400 outline-none focus:border-black'
                  />
                </div> */}
              </div>

              <div className='w-2/4 '>
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
                    value={phoneNumber}
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
      <div>
        <div className='bg-gray-600 w-60 h-[470px] rounded-3xl flex flex-col justify-center items-center ml-20'>
          <div className='flex items-center justify-center w-40 h-40 mb-6 bg-black rounded-2xl'>
            <Image
              src='/qrcode.png'
              alt='QR Code'
              width={122}
              height={122}
            />
          </div>
          <h3 className='text-white'>Scan me!</h3>
        </div>
      </div>
    </div>
  );
}
