import { Field, Form, Formik } from 'formik';
import React from 'react';
import DetailsFormsButtons from './DetailsFormsButtons';
import { TimePicker, Switch } from "antd";
import { checkCustomRoutes } from 'next/dist/lib/load-custom-routes';
import { DayFormProps } from '../../../types';

const DayForm = ({ day, values, setFieldValue }: DayFormProps) => (
  <div className='mb-4'>
    <div className='flex justify-between'>
      <p>{day}</p>
      <Switch 
        checkedChildren="Open" 
        unCheckedChildren="Closed" 
        defaultChecked 
        onChange={(checked) => setFieldValue(`${day}[0]`, checked)} 
        value={values[day][0] ?? false} 
        onClick={() => setFieldValue(`${day}[1]`, null)}
      />
    </div>
    {values[day][0] == true && 
      <TimePicker.RangePicker 
        placeholder={['Opens at', 'Closes at']} 
        onChange={(value) => setFieldValue(`${day}[1]`, value)} 
        value={values[day][1] ?? [null, null]}
      />
    }
  </div>
);

export default function OpeningHoursForm() {
  const days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <div className="w-full">
      <Formik
        initialValues={days.reduce((acc, day) => ({ ...acc, [day]: [null, null] }), {})}
        onSubmit={values => {
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {props => (
          <Form onSubmit={props.handleSubmit} className='flex flex-col'>
            <div className='w-64 '>
              {days.map(day => 
                <DayForm 
                  key={day} 
                  day={day} 
                  values={props.values} 
                  setFieldValue={props.setFieldValue} 
                />
              )}
            </div>
            <DetailsFormsButtons />
          </Form>
        )}
      </Formik>
    </div>
  )
}