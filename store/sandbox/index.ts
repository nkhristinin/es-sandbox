import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import { Order, Aggregation } from '../../types/index';
// Define a type for the slice state
interface SandboxState {
  query: string,
  loading: 'idle' | 'pending' | 'succeeded' | 'failed',
  data: any,
  error: string | undefined,
  lastSubmitedQuery: string,
  chosenQuery: string,
}

const defaultQuery = `{
  "query": {
    "match_all": {}
  },
  "size": 15
}
`;

// Define the initial state using that type
const initialState: SandboxState = {
  query: (typeof window !== 'undefined' ? window.localStorage.getItem('query') : defaultQuery) || defaultQuery,
  loading: 'idle',
  data: {},
  error: '',
  lastSubmitedQuery: '',
  chosenQuery: '',
};

export const getHits = createSelector(
  (state: RootState) => state.sandbox?.data?.hits?.hits ?? [],
  (hits: { _source: any }[]) => hits.map((hit) => hit._source) as Order[]
);

function findAggregations(obj: Record<string, any>) {
  let aggregations: string[] = [];

  Object.keys(obj).forEach(key => {
    if (key === 'aggs') {
      Object.keys(obj[key]).forEach(aggKey => {
        aggregations.push(aggKey);
        const nestedAggs = findAggregations(obj[key][aggKey]);
        aggregations = aggregations.concat(nestedAggs);
      });
    } else if (typeof obj[key] === 'object') {
      const nestedAggs = findAggregations(obj[key]);
      aggregations = aggregations.concat(nestedAggs);
    }
  });

  return aggregations;
}

function transformAggregation(
  aggregationMap: Record<string, any>,
  allAggregationNames: string[]): Aggregation[] {
  return Object.keys(aggregationMap).map((key) => {
    const agg = aggregationMap[key];
    let type = '';
    if (agg.buckets) {
      type = 'bucket';
    } else if (agg.value !== undefined) {
      type = 'metric';
    } else if (agg.doc_count) {
      type = 'unknown';
    }

    let aggregation: Aggregation = {
      name: key,
      type,
    };
    const aggregationBody: Record<string, any> = {};

    Object.keys(agg).forEach((aggKey: string) => {
      if (!allAggregationNames.includes(aggKey)) {
        aggregationBody[aggKey] = agg[aggKey];
      }
    });

    aggregation = { ...aggregation, ...aggregationBody };

    // const subAggregations: string[] = [];
    // if (aggregration.buckets) {
    //   aggregration.buckets = aggregration.buckets.map((bucket: any) => {
    //     const subAggs = [];
    //     Object.keys(bucket).forEach((aggKey: string) => {
    //       if (allAggregationNames.includes(aggKey)) {
    //         if (!subAggregations.includes(aggKey)) {
    //           subAggregations.push(aggKey);
    //         }
    //         subAggs.push(transformAggregation(bucket, allAggregationNames));
    //       }
    //     });

    //     const copyBucket = { ...bucket };
    //     if (subAggs.length > 0) {
    //       copyBucket.subAggregations = subAggs;
    //     }

    //     return copyBucket;
    //   });
    // }

    // if (subAggregations.length > 0) {
    //   aggregration.subAggregations = subAggregations;
    // }

    return aggregation;
  });
}
export const getAggs = createSelector([
  state => state.sandbox.lastSubmitedQuery,
  state => state.sandbox?.data?.aggregations ?? {},
],
  (lastSubmitedQuery, aggregationsMap) => {
    let query = {};
    try {
      query = JSON.parse(lastSubmitedQuery);
    } catch (e) {
      return [];
    }

    const allAggregationNames = findAggregations(query);

    return transformAggregation(aggregationsMap, allAggregationNames);
  });

export const getBase64Query = createSelector(
  (state: RootState) => state.sandbox.query,
  (query: string) => {
    try {
      return btoa(query);
    } catch (e) {
      return '';
    }
  }
);

export const getResponse = (state: RootState) => state
  .sandbox?.data;

export const getQuery = (state: RootState) => state.sandbox.query;

export const getChosenQuery = (state: RootState) => state.sandbox.chosenQuery;

export const getLoadingStatus = (state: RootState) => state.sandbox.loading;

export const fetchData = createAsyncThunk(
  'sandbox/fetchData',
  // Declare the type your function argument here:
  async (arg, { getState }) => {
    const query = getQuery(getState() as RootState);
    const response = await fetch('/api/search', {
      method: 'POST',
      body: query,
    });

    return (response.json());
  }
);

export const sandboxSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    changeQuery: (state, action) => {
      state.query = action.payload;
      localStorage.setItem('query', action.payload);
    },
    changeChosenQuery: (state, action) => {
      state.query = action.payload;
      state.chosenQuery = action.payload;
      localStorage.setItem('query', action.payload);
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
      state.lastSubmitedQuery = state.query;
      state.loading = 'pending';
      state.error = '';
    });
  },
});

export const { changeQuery, changeChosenQuery } = sandboxSlice.actions;

export default sandboxSlice.reducer;
