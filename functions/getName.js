export const getNameAndPrice=(url)=> {
    const decodedString = decodeURIComponent(url);
    const nameWithPrice = decodedString.substring(decodedString.lastIndexOf('/') + 1);
    const name = nameWithPrice.substring(0, nameWithPrice.lastIndexOf('(')).trim();
    
    let price = nameWithPrice.substring(nameWithPrice.lastIndexOf('(')+2,nameWithPrice.lastIndexOf(')'));
    let numericPrice = '';
    for (let ch of price) {
        if (!isNaN(ch) && ch !== ' ') { 
            numericPrice += ch;
        }
    }   
    return { name, numericPrice };
  }