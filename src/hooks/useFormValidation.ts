
import { useState, useCallback } from 'react';

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | null;
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}

export interface ValidationErrors {
  [key: string]: string;
}

export const useFormValidation = (rules: ValidationRules) => {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const validateField = useCallback((name: string, value: string): string | null => {
    const rule = rules[name];
    if (!rule) return null;

    if (rule.required && (!value || value.trim() === '')) {
      return 'This field is required';
    }

    if (rule.minLength && value.length < rule.minLength) {
      return `Must be at least ${rule.minLength} characters`;
    }

    if (rule.maxLength && value.length > rule.maxLength) {
      return `Must be no more than ${rule.maxLength} characters`;
    }

    if (rule.pattern && !rule.pattern.test(value)) {
      if (name === 'email') {
        return 'Please enter a valid email address';
      }
      if (name === 'phone') {
        return 'Please enter a valid phone number';
      }
      return 'Invalid format';
    }

    if (rule.custom) {
      return rule.custom(value);
    }

    return null;
  }, [rules]);

  const validateAllFields = useCallback((formData: { [key: string]: string }) => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    Object.keys(rules).forEach(fieldName => {
      const error = validateField(fieldName, formData[fieldName] || '');
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [validateField, rules]);

  const handleFieldChange = useCallback((name: string, value: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error || ''
    }));
  }, [validateField]);

  const handleFieldBlur = useCallback((name: string, value: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error || ''
    }));
  }, [validateField]);

  const clearErrors = useCallback(() => {
    setErrors({});
    setTouched({});
  }, []);

  return {
    errors,
    touched,
    validateField,
    validateAllFields,
    handleFieldChange,
    handleFieldBlur,
    clearErrors
  };
};
