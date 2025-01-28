// store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './Reducers/index'; // Import your root reducer

// Save state to localStorage
const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('authState', serializedState);
  } catch (e) {
    console.error('Error saving state to localStorage:', e);
  }
};

// Load state from localStorage
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('authState');
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.error('Error loading state from localStorage:', e);
    return undefined;
  }
};

// Load persisted state
const persistedState = loadFromLocalStorage();

const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    auth: persistedState || undefined, // Use persisted state or fallback to initial state
  },
});

// Subscribe to store changes to save state
store.subscribe(() => {
  saveToLocalStorage(store.getState().auth); // Save only the auth state
});

export default store;
