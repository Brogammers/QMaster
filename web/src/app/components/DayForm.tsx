import React from 'react';
import { TimePicker, Switch } from "antd";
import { DayFormProps } from '../../../types';

export default function DayForm({ day, values, setFieldValue }: DayFormProps) {
  return (
    <div className="border-2 rounded-lg p-2 mb-4">
      <div className={`${values[day][0] && `mb-4`} flex justify-between items-center`}>
        <p className="text-ocean-blue m-0">{day}</p>
        <Switch
          checkedChildren=""
          unCheckedChildren=""
          onChange={(checked) => setFieldValue(`${day}[0]`, checked)}
          value={values[day][0] ?? false}
          onClick={() => setFieldValue(`${day}[1]`, null)}
        />
      </div>
      {values[day][0] &&
        <TimePicker.RangePicker
          placeholder={['Opens at', 'Closes at']}
          onChange={(value) => setFieldValue(`${day}[1]`, value)}
          value={values[day][1] ?? [null, null]}
        />
      }
    </div>
  )
};

