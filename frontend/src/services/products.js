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

export const updateProduct = async (product) => {
    const response = await fetch(`/api/products/${product.id}`,{
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({product}),
    })
    const data = await response.json();
    return data;
}

