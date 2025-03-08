import { useState } from 'react';
import { FormInputProps } from '../../utils/types';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export default function FormInput({ id, label, type, labelClassName = '', inputClassName = '', formClassName = '', ...props }: FormInputProps) {
  const [isVisible, setIsVisible] = useState(false);
  const inputType = type === 'password' && isVisible ? 'text' : type;

  return (
    <div className={`flex flex-col w-full relative ${formClassName}`}>
      {label && (
        <label htmlFor={id} className={`capitalize text-sm font-medium mb-1 ${labelClassName}`}>
          {label}
        </label>
      )}
      <div className="relative">
        <input id={id} type={inputType} className={`text-sm p-2 border border-gray-300 bg-white rounded-lg w-full ${inputClassName}`} {...props} />
        {type === 'password' && (
          <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" onClick={() => setIsVisible(!isVisible)}>
            {isVisible ? <AiOutlineEyeInvisible size={16} /> : <AiOutlineEye size={16} />}
          </button>
        )}
      </div>
    </div>
  );
}
