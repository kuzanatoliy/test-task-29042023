import { configureStore } from '@reduxjs/toolkit';

import { personReducer, personsReducer } from './slices';

export const store = configureStore({
  reducer: {
    person: personReducer,
    persons: personsReducer,
  },
});

export type TRootState = ReturnType<typeof store.getState>;
export type TDispatch = typeof store.dispatch;
