export const mappings: Record<string, any> = {
    category: {
        type: 'text',
        fields: {
            keyword: {
                type: 'keyword',
            },
        },
    },
    currency: {
        type: 'keyword',
    },
    customer_birth_date: {
        type: 'date',
    },
    customer_first_name: {
        type: 'text',
        fields: {
            keyword: {
                type: 'keyword',
                ignore_above: 256,
            },
        },
    },
    customer_full_name: {
        type: 'text',
        fields: {
            keyword: {
                type: 'keyword',
                ignore_above: 256,
            },
        },
    },
    customer_gender: {
        type: 'keyword',
    },
    customer_id: {
        type: 'keyword',
    },
    customer_last_name: {
        type: 'text',
        fields: {
            keyword: {
                type: 'keyword',
                ignore_above: 256,
            },
        },
    },
    customer_phone: {
        type: 'keyword',
    },
    day_of_week: {
        type: 'keyword',
    },
    day_of_week_i: {
        type: 'integer',
    },
    email: {
        type: 'keyword',
    },
    event: {
        properties: {
            dataset: {
                type: 'keyword',
            },
        },
    },
    geoip: {
        properties: {
            city_name: {
                type: 'keyword',
            },
            continent_name: {
                type: 'keyword',
            },
            country_iso_code: {
                type: 'keyword',
            },
            location: {
                type: 'geo_point',
            },
            region_name: {
                type: 'keyword',
            },
        },
    },
    manufacturer: {
        type: 'text',
        fields: {
            keyword: {
                type: 'keyword',
            },
        },
    },
    order_date: {
        type: 'date',
    },
    order_id: {
        type: 'keyword',
    },
    products: {
        properties: {
            _id: {
                type: 'text',
                fields: {
                    keyword: {
                        type: 'keyword',
                        ignore_above: 256,
                    },
                },
            },
            base_price: {
                type: 'half_float',
            },
            base_unit_price: {
                type: 'half_float',
            },
            category: {
                type: 'text',
                fields: {
                    keyword: {
                        type: 'keyword',
                    },
                },
            },
            created_on: {
                type: 'date',
            },
            discount_amount: {
                type: 'half_float',
            },
            discount_percentage: {
                type: 'half_float',
            },
            manufacturer: {
                type: 'text',
                fields: {
                    keyword: {
                        type: 'keyword',
                    },
                },
            },
            min_price: {
                type: 'half_float',
            },
            price: {
                type: 'half_float',
            },
            product_id: {
                type: 'long',
            },
            product_name: {
                type: 'text',
                fields: {
                    keyword: {
                        type: 'keyword',
                    },
                },
                analyzer: 'english',
            },
            quantity: {
                type: 'integer',
            },
            sku: {
                type: 'keyword',
            },
            tax_amount: {
                type: 'half_float',
            },
            taxful_price: {
                type: 'half_float',
            },
            taxless_price: {
                type: 'half_float',
            },
            unit_discount_amount: {
                type: 'half_float',
            },
        },
    },
    sku: {
        type: 'keyword',
    },
    taxful_total_price: {
        type: 'half_float',
    },
    taxless_total_price: {
        type: 'half_float',
    },
    total_quantity: {
        type: 'integer',
    },
    total_unique_products: {
        type: 'integer',
    },
    type: {
        type: 'keyword',
    },
    user: {
        type: 'keyword',
    },
};

export const getSortableField = (field: string): string | null => {
    if (!mappings[field]) return null;

    const fieldType = mappings[field]?.type ?? '';

    const allowedTypes = ['keyword', 'date', 'integer', 'long', 'half_float'];
    if (allowedTypes.includes(fieldType)) {
        return field;
    }

    if (fieldType === 'text') {
        if (mappings[field].fields && mappings[field].fields.keyword) {
            return `${field}.keyword`;
        }
    }
    return null;
};
