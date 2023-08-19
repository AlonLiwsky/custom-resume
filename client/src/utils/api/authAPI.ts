import api from '../apiConfig';

export const registerUser = async (name: string, email: string, password: string) => {
  try {
    const response = await api.post('auth/register', { name, email, password });
    return response.data;
  } catch (error) {
    console.error('Registration error', error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post('auth/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Login error', error);
    throw error;
  }
};

export const logoutUser = async ( refreshToken: string) => {
  try {
    const response = await api.post('auth/logout', { refreshToken });
    if(response.status === 204){
      console.log("Logout successful");
    }
    return response.data;
  } catch (error) {
    console.error('Logout error', error);
    throw error;
  }
}

export const refreshAuthToken = async (refreshToken: string) => {
  try {
    const response = await api.post('auth/refresh-tokens', { refreshToken });
    return response.data;
  } catch (error) {
    console.error('Refresh error', error);
    throw error;
  }
}
