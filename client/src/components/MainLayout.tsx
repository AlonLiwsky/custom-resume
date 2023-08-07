import React, { useState, ReactNode } from 'react';
import NavBar from './NavBar';
import AuthModal from './AuthModal';  
import { Outlet } from 'react-router-dom';

interface MainLayoutProps {
    children?: ReactNode;
}



const MainLayout: React.FC<MainLayoutProps> = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
        <NavBar onAuthClick={() => setShowModal(true)} />
        {showModal &&  
            <AuthModal onAuthClose={() => setShowModal(false)} />
        }
        <main>
            <Outlet />
        </main>
        {/* You can include a <Footer /> or other components here in the future */}
    </div>
  );
};

export default MainLayout;


