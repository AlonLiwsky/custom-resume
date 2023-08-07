import { LOGIN_SUCCESS, LOGOUT } from './actions';

type StateType = {
    isAuthenticated: boolean;
    user: any | null;
    token: string | null;
    error: string | null;
};

type ActionType = {
    type: string;
    payload?: any;
};

export const initialState: StateType = {
    isAuthenticated: false,
    user: null,
    token: null,
    error: null,
};

export const reducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token,
            };
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                token: null,
            };
        // ... handle other actions
        default:
            return state;
    }
};
