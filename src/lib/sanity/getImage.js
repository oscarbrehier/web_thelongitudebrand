export const getImage = (image_url) => {
    
    let image = `https://cdn.sanity.io/images/xgcgiqjg/production/${image_url.slice(6).replace('-png', '.png')}`;
    return image;

};