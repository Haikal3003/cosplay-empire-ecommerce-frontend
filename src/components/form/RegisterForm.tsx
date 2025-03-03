import FormInput from '../common/FormInput';
import { Link, useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { AuthContext, AuthContextTypes } from '../../context/AuthProvider';
import { RegisterPayload } from '../../utils/types';

export default function RegisterForm() {
  const { register, loading } = useContext(AuthContext) as AuthContextTypes;
  const [formData, setFormData] = useState<RegisterPayload>({
    fullname: '',
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      register(formData, navigate);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-[350px]">
      <div className="text-center mb-4">
        <h2 className="text-lg font-semibold font-hanken-grotesk ">Create an account</h2>
        <p className="text-gray-500 text-sm">Sign up to get started.</p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <FormInput id="fullname" name="fullname" label="Fullname" type="fullname" placeholder="Enter your fullname..." onChange={handleInputChange} />

        <FormInput id="username" name="username" label="Username" type="username" placeholder="Enter your username..." onChange={handleInputChange} />

        <FormInput id="email" name="email" label="Email" type="email" placeholder="Enter your email..." onChange={handleInputChange} />

        <FormInput id="password" name="password" label="Password" type="password" placeholder="Enter your password..." onChange={handleInputChange} />

        <button type="submit" className="w-full bg-red-500 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-light cursor-pointer disabled:opacity-50" disabled={loading}>
          {loading ? 'Creating account...' : 'Create account'}
        </button>
      </form>

      <div className="text-center mt-4 text-xs">
        <p>
          Already have an account?
          <Link to="/login" className="text-blue-500 font-semibold hover:underline ml-2">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
