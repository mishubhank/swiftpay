import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Redirect = ({ to }) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(to);
  }, [navigate, to]);

  // This component doesn't render anything, as it immediately redirects.
  return null;
};

export default Redirect;
