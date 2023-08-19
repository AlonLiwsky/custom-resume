import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GradientButton from '../components/GradientButton'; 
import SimpleInput from '../components/SimpleOneLineInput';

const QuestionsPage: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        telephone: '',
        address: ''
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Basic validation
        if (!formData.name || !formData.surname || !formData.telephone) {
            alert("Please fill out all mandatory fields!");
            return;
        }
        navigate('/role');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold mb-6">Answer the Questions</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="mb-4">
            <SimpleInput 
              label="Name*" 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleInputChange} 
              required
          />
          <SimpleInput 
              label="Surname*" 
              type="text" 
              name="surname" 
              value={formData.surname} 
              onChange={handleInputChange} 
              required
          />
          <SimpleInput 
              label="Telephone*" 
              type="tel" 
              name="telephone" 
              value={formData.telephone} 
              onChange={handleInputChange} 
              required
          />
          <SimpleInput 
              label="Address (Optional)" 
              type="text" 
              name="address" 
              value={formData.address} 
              onChange={handleInputChange}
          />

          </div>

                <div className="flex items-center justify-between">
                  <GradientButton label="Proceed" type="submit" />
                </div>
            </form>
        </div>
    );
};

export default QuestionsPage;
