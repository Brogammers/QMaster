import React from 'react';
import { Formik, Field, Form } from 'formik';

export default function DetailsComponent() {
  return (
    <div className='flex'>
      <div>
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
          <Form>
            <div className='flex'>
              <div>
                <label htmlFor='Logo'>Logo</label>
                <div>
                  <Field
                    type='text'
                    name='Logo'
                    placeholder='Logo'
                  />
                </div>
              </div>

              <div>
                <label htmlFor='Name'>Name</label>
                <div>
                  <Field
                    type='text'
                    name='Name'
                    placeholder='Name'
                  />
                </div>
                <label htmlFor='Description'>Description</label>
                <div>
                  <Field
                    type='text'
                    name='Description'
                    placeholder='Description'
                  />
                </div>
                <label htmlFor='ContactEmail'>Contact Email</label>
                <div>
                  <Field
                    type='email'
                    name='ContactEmail'
                    placeholder='Contact Email'
                  />
                </div>
                <label htmlFor='Phone'>Phone</label>
                <div>
                  <Field
                    type='text'
                    name='Phone'
                    placeholder='Phone'
                  />
                </div>

                <label htmlFor='Address'>Address</label>
                <div>
                  <Field
                    type='text'
                    name='Address'
                    placeholder='Address'
                  />
                </div>

                <label htmlFor='Language'>Language</label>
                <div>
                  <Field
                    type='text'
                    name='Language'
                    placeholder='Language'
                  />
                </div>

                <label htmlFor='Timezone'>Timezone</label>
                <div>
                  <Field
                    type='text'
                    name='Timezone'
                    placeholder='Timezone'
                  />
                </div>
              </div>
            </div>
            <button type='submit'>Submit</button>
          </Form>
        </Formik>
      </div>
      <div>
        phone here
      </div>
    </div>
  );
}
