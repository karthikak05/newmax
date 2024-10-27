import {storage} from "./config"
import { getDownloadURL, listAll, ref } from 'firebase/storage';

const useStorage = () => {

const fetchImages = async (folderPath) => {
    const folderRef = ref(storage, folderPath);

    try {
        const result = await listAll(folderRef);
        console.log("fetching:"+folderPath);
        
        const imageUrls = await Promise.all(
        result.items.map(async (itemRef) => {
            const url = await getDownloadURL(itemRef);
            return url;
        })
        );
        // console.log(imageUrls)
        return imageUrls;
    } catch (error) {
        console.error("Error fetching images:", error);
    }
};
    return {
      fetchImages
    }
};

export default useStorage;
