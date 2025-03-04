export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  type: string;
  labelClassName?: string;
  inputClassName?: string;
  formClassName?: string;
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

export type AddProductPayload = {
  name: string;
  description: string;
  price: string;
  categories: string[];
  sizes: { size: string; stock: number }[];
  image: File | null;
};
