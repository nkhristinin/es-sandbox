import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../index';

interface OriginalDataState {
  data: any,
  loading: 'idle' | 'pending' | 'succeeded' | 'failed',
  error: string | undefined,
}

export const fetchOriginalData = createAsyncThunk(
  'originalData/fetchData',

  async () => {
    const response = await fetch('/api/search', {
      method: 'POST',
      body: JSON.stringify({
        size: 50,
        query: {
          match_all: {

          },
        },
      }),
    });

    return (response.json());
  }
);

// Define the initial state using that type
const initialState: OriginalDataState = {
  data: {},
  loading: 'idle',
  error: '',
};

export const originalDataSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchOriginalData.fulfilled, (state, action) => {
      // Add user to the state array
      state.data = action.payload;
      state.loading = 'succeeded';
      state.error = '';
    });
    builder.addCase(fetchOriginalData.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.error.message;
    });
    builder.addCase(fetchOriginalData.pending, (state) => {
      state.loading = 'pending';
      state.error = '';
    });
  },
});

export const getHits = createSelector(
  (state: RootState) => state.originalData?.data?.hits?.hits ?? [],
  (hits: { _source: any }[]) => hits.map((hit) => hit._source)
);

export const getLoadingStatus = (state: RootState) => state.originalData.loading;

export default originalDataSlice.reducer;
