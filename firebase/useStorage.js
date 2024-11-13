import {storage} from "./config"
import { getDownloadURL, listAll, ref } from 'firebase/storage';

const useStorage = () => {
    const fetchDropDown = async (folderPath) => {
        const folderRef = ref(storage, folderPath); // Reference to the folder
      
        try {
          const result = await listAll(folderRef); // Fetch all items in the folder
          const folders = result.prefixes.map((folderRef) => folderRef._location.path); // List folders
            return folders;
        } catch (error) {
          console.error("Error listing files and folders:", error);
          return null;
        }
      };
      
const fetchImages = async (folderPath) => {
    const folderRef = ref(storage, folderPath);

    try {
        const result = await listAll(folderRef);
        console.log(result);
        
        const imageUrls = await Promise.all(
        result.items.map(async (itemRef) => {
            const url = await getDownloadURL(itemRef);
            // console.log(url)
            return url;
        })
        );
        return imageUrls;
    } catch (error) {
        console.error("Error fetching images:", error);
    }
};
    return {
      fetchImages,
      fetchDropDown
    }
};

export default useStorage;
