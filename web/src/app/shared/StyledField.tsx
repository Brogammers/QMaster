// StyledField.jsx
import React from 'react';
import { Field } from 'formik';

interface StyledFieldProps {
  name: string;
  placeholder?: string;
  type?: string;
  className?: string;
}

export default function StyledField({ name, placeholder, type = 'text', className }: StyledFieldProps) {
  return (
    <Field
      name={name}
      placeholder={placeholder}
      type={type}
      className={className || 'w-full bg-white border-0 rounded-lg px-4 py-2 text-coal-black placeholder-coal-black/50 focus:ring-2 focus:ring-baby-blue'}
    />
  );
}
