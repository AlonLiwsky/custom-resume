// Action Types
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";
// ... add more action types as needed

// Action Creators
export const loginSuccess = (userData: any) => ({ 
    type: LOGIN_SUCCESS, 
    payload: userData 
});

export const logout = () => ({ type: LOGOUT });
// ... add more action creators as needed
