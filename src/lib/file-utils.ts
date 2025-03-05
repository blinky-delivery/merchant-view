const DirectusUrl = import.meta.env.VITE_DIRECTUS_URL

export const getImageSrcFromFileId = (fileId: string) => `${DirectusUrl}/assets/${fileId}`

export interface ImageDimensions {
    width: number;
    height: number;
}

const readFileAsDataURL = async (file: File | Blob): Promise<string | null> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.result) {
                resolve(reader.result as string);
            }
        };
        reader.onerror = () => {
            reject(null);
        };
        reader.readAsDataURL(file);
    });
};


const getImageDimensions = async (file: File | Blob): Promise<ImageDimensions | null> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.result) {
                const img = new Image();
                img.src = reader.result.toString();
                img.onload = () => {
                    resolve({
                        width: img.width,
                        height: img.height,
                    });
                };
            }
        };
        reader.onerror = () => {
            reject(null);
        };
        reader.readAsDataURL(file);
    });
};

export { readFileAsDataURL, getImageDimensions };
