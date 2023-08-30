import { LOGIN_SUCCESS, LOGOUT, REFRESH_SUCCESS } from './actions';

type StateType = {
  isAuthenticated: boolean;
  user: {
    role: string;
    isEmailVerified: boolean;
    name: string;
    email: string;
    id: string;
  } | null;
  tokens: {
    access: { token: string; expires: string } | null;
    refresh: { token: string; expires: string } | null;
  } | null;
  error: string | null;
};

type ActionType = {
  type: string;
  payload?: any;
};

export const initialState: StateType = {
  isAuthenticated: false,
  user: null,
  tokens: null,
  error: null,
};

export const reducer = (state: StateType, action: ActionType): StateType => {
  let newState;
  switch (action.type) {
    case LOGIN_SUCCESS:
      newState = {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        tokens: action.payload.tokens,
      };
      localStorage.setItem('appState', JSON.stringify(newState));
      return newState;
    case LOGOUT:
      newState = {
        ...state,
        isAuthenticated: false,
        user: null,
        tokens: null,
      }
      localStorage.removeItem('appState');
      return newState;
    case REFRESH_SUCCESS:
      newState = {
        ...state,
        tokens: action.payload,
      }
      localStorage.setItem('appState', JSON.stringify(newState));
      return newState;
    // ... handle other actions
    default:
      return state;
  }
};

