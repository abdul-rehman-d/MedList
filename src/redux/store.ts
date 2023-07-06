import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user';
import medicineListReducer from './slices/medicineList';
import onBoardingReducer from './slices/onBoarding';

const persistConfig = {
  key: 'medlist-app-storage',
  storage: AsyncStorage,
}

const rootReducer = combineReducers({
  user: userReducer,
  medicineList: medicineListReducer,
  onBoarding: onBoardingReducer,
})


const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
})

export const persistor = persistStore(store);

// TYPES
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
