export const getProducts = async () => {

    let res = await fetch('/api/store/products', { method: 'GET' });
    res = await res.json();
    return res;

};