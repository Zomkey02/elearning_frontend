export type AuthFormData = {
  username?: string; // Name field is optional for login
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

// Navbar Link 
export type ListItemProps = {
  children: React.ReactNode;
  NavLink: string;
};
