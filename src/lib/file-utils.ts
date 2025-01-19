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

export interface ImageDimensions {
    width: number;
    height: number;
}

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
