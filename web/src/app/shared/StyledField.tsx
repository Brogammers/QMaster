// StyledField.jsx
import React from 'react';
import { Field, FieldProps } from 'formik';
import { Input } from 'antd';
import { StyledFieldProps } from '../../../types';


export default function StyledField({ name, placeholder, type }: StyledFieldProps) {
  const inputType = type || 'text'; // Default type is 'text'

  return (
    <div className="border-2 rounded-xl bg-ocean-blue p-1">
      <Field name={name}>
        {({ field }: FieldProps<any>) => <Input {...field} placeholder={placeholder} type={inputType} />}
      </Field>
    </div>
  );
}
