import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import type { RootState } from '../index';

// Define a type for the slice state
interface OriginalDataState {
  data: any,
  loading: 'idle' | 'pending' | 'succeeded' | 'failed',
  error: string | undefined,
}

export const fetchOriginalData = createAsyncThunk(
  'originalData/fetchData',
  // Declare the type your function argument here:
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

    // Inferred return type: Promise<MyData>
    return (await response.json()) as MyData;
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

interface MyData {
  // ...
}

// export const { increment, decrement, incrementByAmount } = originalDataSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getHits = (state: RootState) => state
  .originalData?.data?.hits?.hits?.map((hit:any) => hit._source) ?? [];

export const getLoadingStatus = (state: RootState) => state.originalData.loading;

export default originalDataSlice.reducer;
