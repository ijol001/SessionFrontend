import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NetworkStatusHandler = () => {
  const navigate = useNavigate();

  const handleNetworkChange = () => {
    if (!navigator.onLine) {
      navigate('/offline'); // Redirect to the offline page
    }
  };

  useEffect(() => {
    window.addEventListener('offline', handleNetworkChange);
    window.addEventListener('online', handleNetworkChange);

    // Check the initial network status
    handleNetworkChange();

    return () => {
      window.removeEventListener('offline', handleNetworkChange);
      window.removeEventListener('online', handleNetworkChange);
    };
  }, []);

  return null; // This component does not render anything
};

export default NetworkStatusHandler;
