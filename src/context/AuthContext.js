import { createContext, useEffect, useReducer } from 'react';

export const AuthContext = createContext();

// Reducer function to handle different auth-related actions. Typically the payload in each case will be a user object
export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload }

    // Remove user object on logout action dispatch
    case 'LOGOUT':
      return { ...state, user: null }

    // Used to set the authIsReady property before initial rendering of any components. This allows conditional rendering
    case 'AUTH_IS_READY':
      return { ...state, user: action.payload, authIsReady: true }

    default:
      return state;
  }
}

export const AuthContextProvider = ({ children }) => {
  // Initialise the state to be controlled by the authReducer function above. The dispatch function is made available to components via the AuthContextProvider below, which wraps the app
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  // Ensure an empty dependency array is maintained. This hook should only be evaluated once on initial component render
  useEffect(() => {
    // Check auth state here and dispatch AUTH_IS_READY action (use getCurrentUser API call)
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )
}