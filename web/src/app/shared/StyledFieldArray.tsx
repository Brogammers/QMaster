import React from 'react';
import { FieldArray, FieldArrayRenderProps } from 'formik';

import { StyledFieldArrayProps } from '../../../types';

export default function StyledFieldArray({ name, render }: StyledFieldArrayProps) {
  return (
    <FieldArray name={name}>
      {(arrayHelpers: FieldArrayRenderProps) => (
        <div className="border-2 rounded-2 p-2">
          {render(arrayHelpers)}
        </div>
      )}
    </FieldArray>
  );
}
