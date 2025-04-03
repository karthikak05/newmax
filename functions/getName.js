export const getNameAndPrice = (url) => {
    const decodedString = decodeURIComponent(url);
    const nameWithPrice = decodedString.substring(decodedString.lastIndexOf('/') + 1);
    const name = nameWithPrice.substring(0, nameWithPrice.lastIndexOf('(')).trim();

    console.log(nameWithPrice);

    // Extract price inside parentheses
    let price = nameWithPrice.substring(nameWithPrice.lastIndexOf('(') + 2, nameWithPrice.lastIndexOf(')'));

    // Use regex to match prices like 18.90 or 999 or 1
    let numericPrice = price.match(/\d+(\.\d+)?/)?.[0] || '';
    
    return { name, numericPrice };
};
