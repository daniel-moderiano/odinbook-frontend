import { createContext, useEffect, useReducer } from 'react';
import { useCurrentUser } from '../hooks/useCurrentUser';

export const AuthContext = createContext();

// Reducer function to handle different auth-related actions. Typically the payload in each case will be a user object
export const authReducer = (state, action) => {
  switch (action.type) {
    // Login action will always contain a payload of user object
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
  const { getCurrentUser } = useCurrentUser();
  // Initialise the state to be controlled by the authReducer function above. The dispatch function is made available to components via the AuthContextProvider below, which wraps the app
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  console.log('AuthContext state: ', state);

  // This hook should only be evaluated once on initial component render. Ensure no extra dependencies are added to the deps array
  useEffect(() => {
    console.log('Running auth context effect');
    // Check auth state here and dispatch AUTH_IS_READY action (use getCurrentUser API call)
    // This is an async function, so use .then/.catch syntax when calling dispatch action
    getCurrentUser()
      .then((user) => {
        dispatch({
          type: 'AUTH_IS_READY',
          payload: user,
        })
      })
      .catch((err) => console.log(err))
  }, [getCurrentUser]);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )
}