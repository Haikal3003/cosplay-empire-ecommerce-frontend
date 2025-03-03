export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  type: string;
}

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  fullname: string;
  username: string;
  email: string;
  password: string;
};
