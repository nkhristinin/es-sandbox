export interface Order {
    category: string[];
    currency: string;
    customer_first_name: string;
    customer_full_name: string;
    customer_gender: string;
    customer_id: number;
    customer_last_name: string;
    customer_phone: string;
    day_of_week: string;
    day_of_week_i: number;
    email: string;
    manufacturer: string[];
    order_date: string;
    order_id: number;
    products: Product[];
    sku: string[];
    taxful_total_price: number;
    taxless_total_price: number;
    total_quantity: number;
    total_unique_products: number;
    type: string;
    user: string;
    geoip: GeoIP;
    event: Event;
}

export interface Product {
    base_price: number;
    discount_percentage: number;
    quantity: number;
    manufacturer: string;
    tax_amount: number;
    product_id: number;
    category: string;
    sku: string;
    taxless_price: number;
    unit_discount_amount: number;
    min_price: number;
    _id: string;
    discount_amount: number;
    created_on: string;
    product_name: string;
    price: number;
    taxful_price: number;
    base_unit_price: number;
}

export interface GeoIP {
    country_iso_code: string;
    location: {
        lon: number;
        lat: number;
    };
    region_name: string;
    continent_name: string;
    city_name: string;
}

export interface Event {
    dataset: string;
}
