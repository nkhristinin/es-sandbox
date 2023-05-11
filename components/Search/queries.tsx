const matchAllQuery = `{
  "query": {
    "match_all": {}
  },
  "size": 15
}`;

const matchQuery = `{
  "query": {
    "match": {
      "customer_full_name": "Jackson Shaw"
    }
  },
  "size": 15
}`;

const multiMatchQuery = `{
  "query": {
    "multi_match": {
      "query": "jackson",
      "fields": ["customer_full_name", "customer_last_name"]
    }
  },
  "size": 15
}`;

const boolQuery = `{
  "query": {
    "bool": {
      "must": [
        { "match": { "customer_first_name": "Jackson" } },
        { "match": { "customer_last_name": "Shaw" } }
      ]
    }
  },
  "size": 15
}`;

const termQuery = `{
  "query": {
    "term": {
      "customer_gender": {
        "value": "MALE"
      }
    }
  },
  "size": 15
}`;

const rangeQuery = `{
  "query": {
    "range": {
      "order_date": {
        "gte": "now-7d/d",
        "lte": "now/d"
      }
    }
  },
  "size": 15
}`;

const existsQuery = `{
  "query": {
    "exists": {
      "field": "customer_phone"
    }
  },
  "size": 15
}`;

const prefixQuery = `{
  "query": {
    "prefix": {
      "email": {
        "value": "jack"
      }
    }
  },
  "size": 15
}`;

const matchPhraseQuery = `{
  "query": {
    "match_phrase": {
      "customer_full_name": {
        "query": "Jackson Shaw",
        "slop": 1
      }
    }
  },
  "size": 15
}`;

const wildcardQuery = `{
  "query": {
    "wildcard": {
      "email": {
        "value": "jack*"
      }
    }
  },
  "size": 15
}`;

const matchPhrasePrefixQuery = `{
  "query": {
    "match_phrase_prefix": {
      "email": {
        "query": "jack",
        "slop": 1
      }
    }
  },
  "size": 15
}`;

const regexpQuery = `{
  "query": {
    "regexp": {
      "email": {
        "value": "jack.*"
      }
    }
  },
  "size": 15
}`;

const paginationQuery = `{
  "query": {
    "match_all": {}
  },
  "from": 0,
  "size": 10
}`;

const sortingQuery = `{
  "query": {
    "match_all": {}
  },
  "sort": [
    { "order_date": "desc" }
  ]
}`;

const termAggregationQuery = `{
  "aggs": {
    "unique_customers": {
      "terms": {
        "field": "customer_id"
      }
    }
  },
  "size": 0
}`;

// Aggregations
const topCategoriesAggQuery = `
{
  "size": 0,
  "aggs": {
    "top_categories": {
      "terms": {
        "field": "category.keyword",
        "size": 10
      }
    }
  }
}`;
const priceStatsAggQuery = `
{
  "size": 0,
  "aggs": {
    "price_stats": {
      "stats": {
        "field": "products.price"
      }
    }
  }
}
`;

const nestedAggQuery = `
{
  "size": 0,
  "aggs": {
    "orders": {
      "nested": {
        "path": "products"
      },
      "aggs": {
        "categories": {
          "terms": {
            "field": "products.category.keyword"
          },
          "aggs": {
            "price_stats": {
              "stats": {
                "field": "products.price"
              }
            }
          }
        }
      }
    }
  }
}
`;

// Query
const sortByPriceQuery = `
{
  "sort": [
    {
      "products.price": {
        "order": "asc"
      }
    }
  ]
}
`;

const fullTextQuery = `{
  "query": {
    "match": {
      "description": {
        "query": "full text search"
      }
    }
  },
  "size": 15
}`;

const dateRangeAggQuery = `{
  "aggs": {
    "sales_by_date_range": {
      "date_range": {
        "field": "order_date",
        "ranges": [
          {
            "to": "now-10M/M"
          },
          {
            "from": "now-10M/M"
          }
        ]
      }
    }
  },
  "size": 0
}`;

const rangeAggQuery = `{
  "aggs": {
    "sales_by_price_range": {
      "range": {
        "field": "price",
        "ranges": [
          {
            "to": 50
          },
          {
            "from": 50,
            "to": 100
          },
          {
            "from": 100
          }
        ]
      }
    }
  },
  "size": 0
}`;

const histogramAggQuery = `{
  "aggs": {
    "price_histogram": {
      "histogram": {
        "field": "price",
        "interval": 50
      }
    }
  },
  "size": 0
}`;

const termsAggQuery = `{
  "aggs": {
    "unique_customers": {
      "terms": {
        "field": "customer_id"
      }
    }
  },
  "size": 0
}`;

const fuzzyQuery = `{
  "query": {
    "fuzzy": {
      "product_name": {
        "value": "jaket",
        "fuzziness": "AUTO"
      }
    }
  }
}`;

// Combine all queries into a single object
export const queries = {
  data: [
    {
      category: 'Query',
      name: 'Match All',
      description: 'Return all documents',
      query: matchAllQuery,
    },
    {
      category: 'Query',
      name: 'Match',
      description: 'Return documents that match a specific query',
      query: matchQuery,
    },
    {
      category: 'Query',
      name: 'Range',
      description: 'Return documents with a field value within a specified range',
      query: rangeQuery,
    },
    {
      category: 'Aggregation',
      name: 'Price Stats',
      description: 'Return the minimum, maximum, average, and sum of product prices',
      query: priceStatsAggQuery,
    },
    {
      category: 'Aggregation',
      name: 'Nested Aggregation',
      description: 'Return the top categories and their price stats for each order',
      query: nestedAggQuery,
    },
    {
      category: 'Query',
      name: 'Sort by Price',
      description: 'Sort documents by product price in ascending order',
      query: sortByPriceQuery,
    },
    {
      category: 'Query',
      name: 'Multi Match',
      description: 'Return documents that match a query across multiple fields',
      query: multiMatchQuery,
    },
    {
      category: 'Query',
      name: 'Bool Query',
      description: 'Combine multiple queries into a boolean expression',
      query: boolQuery,
    },
    {
      category: 'Query',
      name: 'Term Query',
      description: 'Return documents that match a specific term',
      query: termQuery,
    },
    {
      category: 'Aggregation',
      name: 'Top Categories',
      description: 'Return the top 10 categories by count',
      query: topCategoriesAggQuery,
    },
    {
      category: 'Query',
      name: 'Sort by Price',
      description: 'Sort documents by product price in ascending order',
      query: sortByPriceQuery,
    },
    {
      category: 'Query',
      name: 'Pagination',
      description: 'Return documents with pagination and a specific match query',
      query: paginationQuery,
    },
    {
      category: 'Query',
      name: 'Full Text Search',
      description: 'Return documents that match a full text search query',
      query: fullTextQuery,
    },
    {
      category: 'Aggregation',
      name: 'Date Range Aggregation',
      description: 'Return the count of documents within specific date ranges',
      query: dateRangeAggQuery,
    },
    {
      category: 'Aggregation',
      name: 'Range Aggregation',
      description: 'Return the count of documents within specific price ranges',
      query: rangeAggQuery,
    },
    {
      category: 'Aggregation',
      name: 'Histogram Aggregation',
      description: 'Return the count of documents within specified price ranges using a histogram',
      query: histogramAggQuery,
    },
    {
      category: 'Aggregation',
      name: 'Terms Aggregation',
      description: 'Return the count of documents for each value of a specified field',
      query: termsAggQuery,
    },
    {
      category: 'Query',
      name: 'Wildcard Query',
      description: 'Return documents that match a specific pattern',
      query: wildcardQuery,
    },
    {
      category: 'Query',
      name: 'Fuzzy Query',
      description: 'Return documents that match a query with fuzzy matching',
      query: fuzzyQuery,
    },
    {
      category: 'Query',
      name: 'Match Phrase Query',
      description: 'Return documents that match a specific phrase',
      query: matchPhraseQuery,
    },
    {
      category: 'Query',
      name: 'Exists',
      description: 'Return documents that have a value in the specified field',
      query: existsQuery,
    },
    {
      category: 'Query',
      name: 'Prefix',
      description: 'Return documents that have a field value with a specified prefix',
      query: prefixQuery,
    },
    {
      category: 'Query',
      name: 'Match Phrase Prefix',
      description: 'Return documents that match a prefix of a phrase',
      query: matchPhrasePrefixQuery,
    },
    {
      category: 'Query',
      name: 'Regexp',
      description: 'Return documents that match a regular expression',
      query: regexpQuery,
    },
    {
      category: 'Query',
      name: 'Sorting',
      description: 'Return documents sorted by order date in descending order',
      query: sortingQuery,
    },
    {
      category: 'Aggregation',
      name: 'Term Aggregation',
      description: 'Return unique customers based on customer ID',
      query: termAggregationQuery,
    },
  ],
};

export const getActions = (onTrigger: (query: string) => void) => queries.data.map(query => ({
  title: query.name,
  description: query.description,
  onTrigger: () => onTrigger(query.query),
}));
