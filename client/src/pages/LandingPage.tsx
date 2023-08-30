import React, { useState } from 'react';
import GradientButton from '../components/GradientButton';
import { useNavigate } from 'react-router-dom';
import useSendExp from '../hooks/useSendExp';



const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    // const [file, setFile] = useState<File | null>(null);
    const [text, setText] = useState<string>('');

    // const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const uploadedFile = event.target.files ? event.target.files[0] : null;
    //     setFile(uploadedFile);
    // };

    const sendExp = useSendExp();

    const handleProceed = async () => {
        try {
          const data = { experience: text }; 
          const response = await sendExp(data);
          console.log('Experience data sent successfully', response);
          navigate('/questions');
        } catch (error) {
          console.error('Error while sending experience data', error);
        }
      };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {/* Service Explanation */}
            <section className="mb-8 text-center">
                <h1 className="text-3xl font-bold mb-2">Welcome to CV Creator</h1>
                <p className="text-xl">Create unique CVs tailored to different positions you want to apply for.</p>
            </section>

            {/* File Upload Window */}
            {/* <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Upload Your CV</h2>
                <div className="border-2 border-dashed border-gray-300 p-4 w-64">
                    <input className="w-full" type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleFileUpload} />
                </div>
            </section> */}

            {/* Manual Text Field */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Tell Us About Yourself</h2>
                <textarea 
                    rows= {5}
                    cols= {40}
                    placeholder="Type or paste your details here..."
                    className="w-64 p-2 border-2 border-gray-300 rounded"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </section>

            {/* Proceed Button */}
            <section>
              <GradientButton label="Proceed" onClick={handleProceed} />
            </section>
        </div>
    );
};

export default LandingPage;
