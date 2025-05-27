export const parseSanityImage = (imageRef) => {
    const image = `https://cdn.sanity.io/images/xgcgiqjg/production/${imageRef.slice(6).replace('-png', '.png')}`;
    return image;
};