export const createData = (
    { productName,
        company,
        color,
        inStock,
        price,
        count,
        reviews,
        location,
        productImg, 
    _id }
) => {
    return {
        productName,
        company,
        color,
        inStock,
        price,
        count,
        reviews,
        location,
        productImg,
        additional: 'N/A',
        id: _id
    };
}

