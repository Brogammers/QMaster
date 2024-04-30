import { Form, Formik } from 'formik';
import DetailsFormsButtons from './DetailsFormsButtons';
import DayForm from './DayForm';

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
          <Form onSubmit={props.handleSubmit} className='flex flex-col justify-center items-start gap-8'>
            <div className="w-64">
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