import { configureStore } from '@reduxjs/toolkit';
import sandboxReducer from './sandbox';
import originalDataReducer from './originalData';

export const store = configureStore({
  reducer: {
    sandbox: sandboxReducer,
    originalData: originalDataReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
