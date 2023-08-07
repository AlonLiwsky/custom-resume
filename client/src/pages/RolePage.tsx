import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GradientButton from '../components/GradientButton';  // Assuming the path to the GradientButton component

const RolePage: React.FC = () => {
    const navigate = useNavigate();
    const [description, setDescription] = useState('');

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

    const handleProceed = () => {
        // You can add any logic here, for example, sending the data to the backend
        navigate('/download');  // Replace '/next-page' with the appropriate route you want to navigate to
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold mb-6">Describe the Role or Company</h1>
            <textarea 
                className="shadow appearance-none border rounded w-1/2 h-48 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-6"
                value={description} 
                onChange={handleDescriptionChange}
                placeholder="Enter a detailed description..."
            ></textarea>
            <GradientButton label="Proceed" onClick={handleProceed} />
        </div>
    );
};

export default RolePage;
