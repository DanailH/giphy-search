import { useLocation } from 'react-router-dom';

// Custom hook get the query params
export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};