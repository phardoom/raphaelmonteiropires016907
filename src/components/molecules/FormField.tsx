import type { ReactNode } from "react";

type FormFieldProps = {
  label: string;
  error?: string;
  children: ReactNode;
};

export const FormField = ({ label, error, children }: FormFieldProps) => {
  return (
    <label>
      {label}
      {children}
      {error ? <span className="form-error">{error}</span> : null}
    </label>
  );
};
