import React from 'react';
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  FormHelperText,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import Select from './Select';

interface FormFieldProps {
  name: string;
  label: string;
  control: any;
  type?: 'text' | 'email' | 'password' | 'number' | 'select' | 'checkbox' | 'radio' | 'textarea';
  options?: { value: string | number; label: string }[];
  multiline?: boolean;
  rows?: number;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  helperText?: string;
  placeholder?: string;
  defaultValue?: any;
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  control,
  type = 'text',
  options = [],
  multiline = false,
  rows = 4,
  required = false,
  disabled = false,
  fullWidth = true,
  helperText,
  placeholder,
  defaultValue,
}) => {
  const renderField = (field: any, fieldState: any) => {
    const { onChange, value, ref } = field;
    const { error: fieldError } = fieldState;

    switch (type) {
      case 'select':
        return (
          <Select
            label={label}
            options={options}
            value={value || ''}
            onChange={onChange}
            error={!!fieldError}
            helperText={fieldError?.message || helperText}
            disabled={disabled}
            required={required}
            fullWidth={fullWidth}
          />
        );

      case 'checkbox':
        return (
          <FormControlLabel
            control={
              <Checkbox
                checked={value || false}
                onChange={(e) => onChange(e.target.checked)}
                inputRef={ref}
                disabled={disabled}
              />
            }
            label={label}
          />
        );

      case 'radio':
        return (
          <div>
            <FormLabel component="legend">{label}</FormLabel>
            <RadioGroup
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
            >
              {options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio inputRef={ref} disabled={disabled} />}
                  label={option.label}
                />
              ))}
            </RadioGroup>
            {(fieldError || helperText) && (
              <FormHelperText error={!!fieldError}>
                {fieldError?.message || helperText}
              </FormHelperText>
            )}
          </div>
        );

      default:
        return (
          <TextField
            {...field}
            label={label}
            type={type}
            multiline={multiline}
            rows={rows}
            required={required}
            disabled={disabled}
            fullWidth={fullWidth}
            error={!!fieldError}
            helperText={fieldError?.message || helperText}
            placeholder={placeholder}
            inputRef={ref}
          />
        );
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => renderField(field, fieldState)}
    />
  );
};

export default FormField;
