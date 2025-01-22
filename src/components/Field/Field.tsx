import cn from 'classnames';
import React from 'react';

import get from '@utils/get';
import { FormContext } from '@components/Context/FormContext';

import s from './Field.module.css';

interface Props {
  children: any; // React.ReactChild;
  className?: string;
  id: string;
  fakeId?: string;
  label: string;
  labelHidden?: boolean;
  labelOptional?: React.ReactNode;
  propertyPath?: string;
  readonly?: boolean;
  required?: boolean;
}

const getErrors = (
  propertiesMap: any,
  propertyPath?: string,
): string[] | undefined => {
  if (typeof propertyPath !== 'string') {
    return undefined;
  }

  const path = propertyPath.split('.');

  if (path.length === 0) {
    return undefined;
  }

  const [root, ..._path] = path;

  const errorSchema = propertiesMap?.[root]?.content?.props?.errorSchema;

  if (errorSchema == null) {
    return undefined;
  }

  const __errors =
    _path.length === 0
      ? errorSchema?.__errors
      : get(errorSchema, _path.join('.'))?.__errors;

  return __errors;
};

export const Field = React.memo(
  React.forwardRef((props: Props, ref: any) => {
    const {
      children: child,
      className,
      id: originId,
      fakeId,
      label,
      labelHidden = false,
      labelOptional,
      propertyPath = originId,
      readonly = false,
      required = false,
    } = props;

    const id = fakeId ?? originId;

    const { propertiesMap } = React.useContext(FormContext);

    if (!React.isValidElement(child)) {
      return <>-</>;
    }

    const errors = getErrors(propertiesMap, propertyPath) ?? [];

    const hasErrors = errors.length > 0;

    return (
      <div className={cn(s.root, className)} ref={ref}>
        <label
          className={cn(s.label, {
            [s.labelRequired]: required,
            [s.labelReadonly]: readonly,
            [s.labelHidden]: labelHidden,
            [s.error]: hasErrors,
          })}
          htmlFor={id}
        >
          {label}
          {required && (
            <span className={s.required} aria-hidden>
              *
            </span>
          )}
          {Boolean(labelOptional) && <> {labelOptional}</>}
        </label>
        {React.cloneElement<any>(child, {
          id,
          required,
          readonly,
          inside: true,
          invalid: hasErrors,
          'aria-describedby': `${id}-errors`,
        })}
        {hasErrors && (
          <ul className={s.errorDetail} id={`${id}-errors`}>
            {errors.map((textError, index) => (
              <li key={index} className={s.message}>
                {textError}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }),
);
