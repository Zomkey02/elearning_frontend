export type AuthFormData = {
  username?: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type AuthFormProps = {
  legend: string;
  buttonText: string;
  endpoint: string;
  onSuccess: () => void;
  includeUsername?: boolean;
  includePasswordConfirmation?: boolean;
};

export interface ErrorResponse {
  response?: {
    data?: {
      errors?: Record<string, string[]>;
    };
  };
}