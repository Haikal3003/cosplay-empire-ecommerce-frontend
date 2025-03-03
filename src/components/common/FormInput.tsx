import { useState } from 'react';
import { FormInputProps } from '../../utils/types';

export default function FormInput({ id, label, type, ...props }: FormInputProps) {
  const [isVisible, setIsVisible] = useState(false);

  const inputType = type === 'password' && isVisible ? 'text' : type;

  return (
    <div className="flex flex-col w-full relative">
      {label && (
        <label htmlFor={id} className="text-xs capitalize font-medium mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <input id={id} type={inputType} className="text-xs p-2 border border-gray-300 rounded-lg w-full" {...props} />
        {type === 'password' && <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" onClick={() => setIsVisible(!isVisible)}></button>}
      </div>
    </div>
  );
}
