import { useEffect, useContext } from 'react';
import { StoreContext, StoreContextType } from '../utils/store'; 
import { refreshAuthToken } from '../utils/api/authAPI'; 

const useAuthTokenRefresh = () => {
  const { state, dispatch } = useContext(StoreContext) as StoreContextType;

  useEffect(() => {
    const refreshToken = state.tokens?.refresh?.token;

    if (refreshToken) {
      const fetchNewToken = async () => {
        try {
          const refreshedData = await refreshAuthToken(refreshToken);
          dispatch({ type: 'REFRESH_SUCCESS', payload: refreshedData });
        } catch (error) {
          console.error('Failed to refresh token', error);
          dispatch({ type: 'LOGOUT' });
        }
      };

      fetchNewToken();
    }
    console.log(state);
  }, []);

  return; 
};

export default useAuthTokenRefresh;
