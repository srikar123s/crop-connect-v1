const importImages = (require.context('./components/images', false, /\.(png|jpe?g|svg)$/));

const Images = importImages.keys().reduce((accumulator, current) => {
    const key = current.replace('./', '').split('.')[0]; // Use filename without extension as key
    accumulator[key] = importImages(current);
    return accumulator;
}, {});

export default Images;
