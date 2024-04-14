import { Field, Form, Formik } from 'formik';
import React from 'react'
import DetailsFormsButtons from './DetailsFormsButtons';
import { TimePicker, Switch } from "antd";

export default function OpeningHoursForm() {
  const handleTimeChange = (dates: any, dateStrings: [string, string]) => {
    console.log('Start Time:', dateStrings[0]);
    console.log('End Time:', dateStrings[1]);
  };

  return (
    <div className="w-full">
      <Formik
        initialValues={{
          Saturday: [true, null],
          Sunday: [true, null],
          Monday: [true, null],
          Tuesday: [true, null],
          Wednesday: [true, null],
          Thursday: [true, null],
          Friday: [true, null],
        }}
        onSubmit={values => {
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {props => (
          <Form onSubmit={props.handleSubmit} className='flex flex-col'>
            <div className='w-5/12 '>
              <div className='mb-4'>
                <div className='flex justify-between'>
                  <p>Saturday</p>
                  <Switch checkedChildren="Open" unCheckedChildren="Closed" defaultChecked onChange={(checked) => props.setFieldValue('Saturday[0]', checked)} />
                </div>
                {props.values.Saturday[0] == true && <TimePicker.RangePicker placeholder={['Opens at', 'Closes at']} onChange={(value) => props.setFieldValue('Saturday[1]', value)} />}
              </div>
              <div className='mb-4'>
                <div className='flex justify-between'>
                  <p>Sunday</p>
                  <Switch checkedChildren="Open" unCheckedChildren="Closed" defaultChecked onChange={(checked) => props.setFieldValue('Sunday[0]', checked)} />
                </div>
                {props.values.Sunday[0] == true && <TimePicker.RangePicker placeholder={['Opens at', 'Closes at']} onChange={(value) => props.setFieldValue('Sunday[1]', value)} />}
              </div>
              <div className='mb-4'>
                <div className='flex justify-between'>
                  <p>Monday</p>
                  <Switch checkedChildren="Open" unCheckedChildren="Closed" defaultChecked onChange={(checked) => props.setFieldValue('Monday[0]', checked)} />
                </div>
                {props.values.Monday[0] == true && <TimePicker.RangePicker placeholder={['Opens at', 'Closes at']} onChange={(value) => props.setFieldValue('Monday[1]', value)} />}
              </div>
              <div className='mb-4'>
                <div className='flex justify-between'>
                  <p>Tuesday</p>
                  <Switch checkedChildren="Open" unCheckedChildren="Closed" defaultChecked onChange={(checked) => props.setFieldValue('Tuesday[0]', checked)} />
                </div>
                {props.values.Tuesday[0] == true && <TimePicker.RangePicker placeholder={['Opens at', 'Closes at']} onChange={(value) => props.setFieldValue('Tuesday[1]', value)} />}
              </div>
              <div className='mb-4'>
                <div className='flex justify-between'>
                  <p>Wednesday</p>
                  <Switch checkedChildren="Open" unCheckedChildren="Closed" defaultChecked onChange={(checked) => props.setFieldValue('Wednesday[0]', checked)} />
                </div>
                {props.values.Wednesday[0] == true && <TimePicker.RangePicker placeholder={['Opens at', 'Closes at']} onChange={(value) => props.setFieldValue('Wednesday[1]', value)} />}
              </div>
              <div className='mb-4'>
                <div className='flex justify-between'>
                  <p>Thursday</p>
                  <Switch checkedChildren="Open" unCheckedChildren="Closed" defaultChecked onChange={(checked) => props.setFieldValue('Thursday[0]', checked)} />
                </div>
                {props.values.Thursday[0] == true && <TimePicker.RangePicker placeholder={['Opens at', 'Closes at']} onChange={(value) => props.setFieldValue('Thursday[1]', value)} />}
              </div>
              <div className='mb-4'>
                <div className='flex justify-between'>
                  <p>Friday</p>
                  <Switch checkedChildren="Open" unCheckedChildren="Closed" defaultChecked onChange={(checked) => props.setFieldValue('Friday[0]', checked)} />
                </div>
                {props.values.Friday[0] == true && <TimePicker.RangePicker placeholder={['Opens at', 'Closes at']} onChange={(value) => props.setFieldValue('Friday[1]', value)} />}
              </div>
            </div>
            <DetailsFormsButtons />
          </Form>
        )}
      </Formik>
    </div>
  )
}
