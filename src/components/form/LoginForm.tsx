import { FcGoogle } from 'react-icons/fc';
import Divider from '../common/Divider';
import FormInput from '../common/FormInput';
import { Link } from 'react-router-dom';
import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { AuthContext, AuthContextTypes } from '../../context/AuthProvider';
import { LoginPayload } from '../../utils/types';

export default function LoginForm() {
  const { login, loading } = useContext(AuthContext) as AuthContextTypes;
  const [formData, setFormData] = useState<LoginPayload>({
    email: '',
    password: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className='className="bg-white p-6 rounded-lg shadow-md w-[350px] font-space-grotesk"'>
      <div className=" text-center ">
        <h2 className="text-lg font-semibold font-hanken-grotesk">Welcome Back!</h2>
        <p className="text-gray-500 text-sm">Please sign in to continue.</p>

        <button className="rounded-lg px-4 py-2 mt-4 w-full flex justify-center items-center text-xs border border-gray-300 font-semibold cursor-pointer hover:bg-gray-100">
          <FcGoogle className="mr-2 text-xl" />
          Sign in with Google
        </button>
      </div>
      <Divider />

      <form action="" className="space-y-4">
        <FormInput id="email" name="email" label="Email" type="email" placeholder="Enter your email..." onChange={handleInputChange} />
        <FormInput id="password" name="password" label="Password" type="password" placeholder="Enter your password..." onChange={handleInputChange} />

        <div className="flex justify-between text-xs">
          <label className="flex items-center">
            <input type="checkbox" className="mr-1" />
            Remember me
          </label>
          <a href="#" className="text-blue-500 hover:underline">
            Forgot password?
          </a>
        </div>

        <button type="submit" className="w-full bg-red-500 hover:bg-red-700 text-white py-2 rounded-lg  text-sm font-light cursor-pointer" onClick={handleSubmit} disabled={loading}>
          Sign in
        </button>
      </form>

      <div className="text-center mt-4 text-xs ">
        <p>
          Don't have an account?
          <Link to="/register" className="text-blue-500 font-semibold hover:underline ml-2">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
