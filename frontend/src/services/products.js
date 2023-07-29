export const getProductList = async (filters = null) => {
    const url = filters ? `/api/products?` + new URLSearchParams(filters) : `/api/products`
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export const getFiltersList = async () => {
    const response = await fetch('/api/products/filters');
    const data = await response.json();
    return data;
}
