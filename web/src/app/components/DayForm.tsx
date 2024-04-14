import React from 'react';
import { TimePicker, Switch } from "antd";
import { DayFormProps } from '../../../types';

export default function DayForm({ day, values, setFieldValue }: DayFormProps) {
  return (
    <div className='mb-4'>
      <div className='flex justify-between'>
        <p>{day}</p>
        <Switch
          checkedChildren="Open"
          unCheckedChildren="Closed"
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
  )
};

