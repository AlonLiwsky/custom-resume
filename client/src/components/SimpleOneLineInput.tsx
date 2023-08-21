import React from 'react';

type SimpleInputProps = {
    label: string;
    type: 'text' | 'tel' | 'password' | 'email';
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    id?: string;
    placeholder?: string;
};

const SimpleInput: React.FC<SimpleInputProps> = ({ label, type, name, value, onChange, required, id, placeholder }) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id || name}>{label}</label>
            <input 
                type={type} 
                id={id || name}
                name={name} 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={value} 
                onChange={onChange}
                required={required}
                placeholder={placeholder}
            />
        </div>
    );
};

export default SimpleInput;
