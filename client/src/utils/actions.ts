// Action Types
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";
export const REFRESH_SUCCESS = "REFRESH_SUCCESS";
// ... add more action types as needed

// Action Creators
export const loginSuccess = (userData: any) => ({ 
    type: LOGIN_SUCCESS, 
    payload: userData 
});

export const logout = () => ({ type: LOGOUT });

export const refreshSuccess = (tokens: any) => ({
    type: REFRESH_SUCCESS,
    payload: tokens
})
