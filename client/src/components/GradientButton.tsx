import React from 'react';

type GradientButtonProps = {
    label: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
};

const GradientButton: React.FC<GradientButtonProps> = ({ label, onClick }) => {
    return (
        <button 
            onClick={onClick} 
            className="w-48 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-bold text-xl"
        >
            {label}
        </button>
    );
};

export default GradientButton;
