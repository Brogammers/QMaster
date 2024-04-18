import { Formik, Form, Field } from 'formik';
import React from 'react';
import DetailsFormsButtons from './DetailsFormsButtons';

const QueueForm = () => {
    // Initial values for the form fields
    const initialValues = {
        queueName: '',
        enabledOnlyInOpeningHours: 'Yes',
        limitQueueLength: 'No',
        estimatedWaitingTimeMode: 'Auto',
        visitorsToNotify: '3'
    };

    // Options for dropdown menus
    const hoursOptions = ['Yes', 'No'];
    const limitOptions = ['Yes', 'No'];
    const timeModeOptions = ['Auto', 'Manual'];
    const visitorsOptions = ['1', '2', '3', '4', '5'];

    // Submit handler
    const handleSubmit = (values: any) => {
      alert(JSON.stringify(values, null, 2));
        console.log('Form data', values);
    };

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {formik => (
                    <Form className='w-full'>
                        <div className="mb-4">
                            <label htmlFor="queueName" className="block text-gray-700 text-sm font-bold mb-2">Queue Name</label>
                            <Field name="queueName" type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="enabledOnlyInOpeningHours" className="block text-gray-700 text-sm font-bold mb-2">Enabled Only In Opening Hours</label>
                            <Field as="select" name="enabledOnlyInOpeningHours" className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                {hoursOptions.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </Field>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="limitQueueLength" className="block text-gray-700 text-sm font-bold mb-2">Limit Queue Length</label>
                            <Field as="select" name="limitQueueLength" className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                {limitOptions.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </Field>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="estimatedWaitingTimeMode" className="block text-gray-700 text-sm font-bold mb-2">Estimated Waiting Time Mode</label>
                            <Field as="select" name="estimatedWaitingTimeMode" className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                {timeModeOptions.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </Field>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="visitorsToNotify" className="block text-gray-700 text-sm font-bold mb-2">Visitors to Notify</label>
                            <Field as="select" name="visitorsToNotify" className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                {visitorsOptions.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </Field>
                        </div>
                        <DetailsFormsButtons />
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default QueueForm;
