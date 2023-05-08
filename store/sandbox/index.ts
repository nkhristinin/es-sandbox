import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../index';

// Define a type for the slice state
interface SandboxState {
  query: string,
  loading: 'idle' | 'pending' | 'succeeded' | 'failed',
  data: any,
  error: string | undefined,
}

const defaultQuery = `
{
 "aggs": {
    "price_ranges": {
        "range": {
          "field": "price",
          "ranges": [
            { "to": 100.0 },
            { "from": 100.0, "to": 200.0 },
            { "from": 200.0 }
          ]
        }
      }
    }
}
`;

// Define the initial state using that type
const initialState: SandboxState = {
  query: defaultQuery,
  loading: 'idle',
  data: {},
  error: '',
};

// Other code such as selectors can use the imported `RootState` type
export const getHits = (state: RootState) => state
  .sandbox?.data?.hits?.hits?.map((hit:any) => hit._source) ?? [];

  // Other code such as selectors can use the imported `RootState` type
export const getQuery = (state: RootState) => state.sandbox.query;

export const getLoadingStatus = (state: RootState) => state.sandbox.loading;

export const fetchData = createAsyncThunk(
  'sandbox/fetchData',
  // Declare the type your function argument here:
  async (query, { getState }) => {
    const response = await fetch('/api/search', {
      method: 'POST',
      body: getQuery(getState()),
    });

    // Inferred return type: Promise<MyData>
    return (await response.json()) as MyData;
  }
);

export const sandboxSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    changeQuery: (state, action) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchData.fulfilled, (state, action) => {
      // Add user to the state array
      state.data = action.payload;
      state.loading = 'succeeded';
      state.error = '';
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.error.message;
    });
    builder.addCase(fetchData.pending, (state) => {
      state.loading = 'pending';
      state.error = '';
    });
  },
});

export const { changeQuery } = sandboxSlice.actions;

export default sandboxSlice.reducer;
