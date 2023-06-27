import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user';
import medicineListReducer from './slices/medicineList';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const rootReducer = combineReducers({ 
  user: userReducer,
  medicineList: medicineListReducer,
})


const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
})

export const persistor = persistStore(store);

// TYPES
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
