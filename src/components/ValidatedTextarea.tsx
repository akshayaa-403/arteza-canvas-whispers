
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Check, X, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ValidatedTextareaProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  touched?: boolean;
  required?: boolean;
  placeholder?: string;
  maxLength?: number;
  rows?: number;
  helpText?: string;
  className?: string;
}

export const ValidatedTextarea: React.FC<ValidatedTextareaProps> = ({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  touched,
  required,
  placeholder,
  maxLength,
  rows = 4,
  helpText,
  className
}) => {
  const hasError = touched && error;
  const isValid = touched && !error && value.length > 0;

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <Label htmlFor={id} className="text-sm font-medium">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        {maxLength && (
          <span className={cn(
            "text-xs",
            value.length > maxLength * 0.8 ? "text-orange-500" : "text-muted-foreground",
            value.length >= maxLength ? "text-red-500" : ""
          )}>
            {value.length}/{maxLength}
          </span>
        )}
      </div>
      
      <div className="relative">
        <Textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          maxLength={maxLength}
          rows={rows}
          className={cn(
            "resize-none transition-colors",
            hasError && "border-red-500 focus:border-red-500 focus:ring-red-500",
            isValid && "border-green-500 focus:border-green-500 focus:ring-green-500"
          )}
        />
        
        {/* Status icon */}
        <div className="absolute right-3 top-3">
          {hasError && (
            <X className="h-4 w-4 text-red-500" />
          )}
          {isValid && (
            <Check className="h-4 w-4 text-green-500" />
          )}
        </div>
      </div>

      {/* Help text */}
      {helpText && !hasError && (
        <div className="flex items-start gap-1">
          <AlertCircle className="h-3 w-3 text-muted-foreground mt-0.5 flex-shrink-0" />
          <p className="text-xs text-muted-foreground">{helpText}</p>
        </div>
      )}

      {/* Error message */}
      {hasError && (
        <div className="flex items-start gap-1">
          <X className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-red-500">{error}</p>
        </div>
      )}
    </div>
  );
};
