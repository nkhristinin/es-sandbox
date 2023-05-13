import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../index';

interface OriginalDataState {
  data: any,
  loading: 'idle' | 'pending' | 'succeeded' | 'failed',
  error: string | undefined,
  sort: null | {
    field: 'string',
    order: 'asc' | 'desc'
  },
  search: string,
  from: number,
  perPage: number,
}

export const getSort = (state: RootState) => state.originalData.sort;
export const getPaginationFrom = (state: RootState) => state.originalData.from;
export const getSearch = (state: RootState) => state.originalData.search;
export const getPerPage = (state: RootState) => state.originalData.perPage;
export const getHits = createSelector(
  (state: RootState) => state.originalData?.data?.hits?.hits ?? [],
  (hits: { _source: any }[]) => hits.map((hit) => hit._source)
);
export const getTotalHits = (state: RootState) => state.originalData?.data?.hits?.total?.value ?? 0;

export const fetchOriginalData = createAsyncThunk(
  'originalData/fetchData',

  async (arg, { getState }) => {
    const state = getState() as RootState;
    const paginationFrom = getPaginationFrom(state);
    const search = getSearch(state);
    const sort = getSort(state);
    const size = getPerPage(state);
    let query = {};
    const body: {
      size: number,
      query: any,
      from: number,
      sort?: {
        [key: string]: {
          order: 'asc' | 'desc'
        }
      }[]
    } = {
      size,
      query,
      from: paginationFrom,
    };
    if (search) {
      query = {
        query_string: { query: search },
      };
    } else {
      query = {
        match_all: {},
      };
    }
    body.query = query;
    if (sort) {
      body.sort = [
        { [sort.field]: { order: sort.order } },
      ];
    }
    const response = await fetch('/api/search', {
      method: 'POST',
      body: JSON.stringify(body),
    });

    return (response.json());
  }
);

// Define the initial state using that type
const initialState: OriginalDataState = {
  data: {},
  loading: 'idle',
  error: '',
  from: 0,
  perPage: 10,
  search: '',
  sort: null,
};

export const originalDataSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    changeSearch: (state, action) => {
      state.search = action.payload;
    },
    changeSort: (state, action) => {
      state.sort = action.payload;
    },
    changePerPage: (state, action) => {
      state.perPage = action.payload;
    },
    changePage: (state, action) => {
      const page = action.payload;
      const { perPage } = state;
      state.from = (page - 1) * perPage;
    },
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

export const { changeSort, changeSearch, changePage, changePerPage } = originalDataSlice.actions;

export const getLoadingStatus = (state: RootState) => state.originalData.loading;

export default originalDataSlice.reducer;
