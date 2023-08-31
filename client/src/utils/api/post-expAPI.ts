import { useContext } from 'react';
import { StoreContext, StoreContextType } from '../store';
import api from '../apiConfig';

const PostExpAPI = () => {
    const { state } = useContext(StoreContext) as StoreContextType;
    const token = state.tokens?.access?.token;

  const sendExp = async ( data: any) => {
    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      const response = await api.post('resumes/experience', data, { headers });
      return response.data;
    } catch (error) {
      console.error('Error sending data', error);
      throw error;
    }
  };

  return sendExp;
};

export default PostExpAPI;
