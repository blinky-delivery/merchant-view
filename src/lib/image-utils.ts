import { Area } from 'react-easy-crop';

export interface Resolution {
    width: number;
    height: number;
}

export enum Aspect {
    RATIO_1_1 = '1:1',
    RATIO_4_5 = '4:5',
    RATIO_3_4 = '3:4',
    RATIO_9_16 = '9:16',
    RATIO_26_10 = '26:10',
}

export enum CropSource {
    STREAM,
    PROFILE,
    POST,
}

export const createImage = (url: string): Promise<HTMLImageElement | null> =>
    new Promise<HTMLImageElement | null>((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', () => reject(null));
        image.setAttribute('crossOrigin', 'anonymous');
        image.src = url;
    });

/**
 * This function was adapted from the one in the ReadMe of
 * https://github.com/DominicTobias/react-image-crop#what-about-showing-the-crop-on-the-client
 */
export const cropImage = async (
    image: HTMLImageElement,
    pixelCrop: Area,
    resolution: Resolution
) => {
    const { height: outputHeight, width: outputWidth } = resolution;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (ctx) {
        canvas.width = outputWidth;
        canvas.height = outputHeight;

        // scaling context so the image fits inside the outputWidth and outputHeight
        ctx.scale(outputWidth / pixelCrop.width, outputHeight / pixelCrop.height);

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, pixelCrop.width, pixelCrop.height);

        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
        );

        return new Promise<Blob | null>((resolve, reject) => {
            canvas.toBlob(
                blob => {
                    if (!blob) reject(null);
                    resolve(blob);
                },
                'image/jpeg',
                0.75
            );
        });
    }
};

export const getOutputResolution = (aspect: Aspect): Resolution => {
    switch (aspect) {
        case Aspect.RATIO_9_16: {
            return { height: 1922, width: 1080 };
        }
        case Aspect.RATIO_4_5: {
            return { height: 1350, width: 1080 };
        }
        case Aspect.RATIO_3_4: {
            return { height: 1440, width: 1080 };
        }
        case Aspect.RATIO_26_10: {
            return { height: 1080, width: 2808 };
        }
        default:
            return { height: 1080, width: 1080 };
    }
};

export const getAspectValue = (aspect: Aspect): number => {
    console.log('aspect', aspect);
    switch (aspect) {
        case Aspect.RATIO_9_16: {
            return 9 / 16;
        }
        case Aspect.RATIO_4_5: {
            return 4 / 5;
        }
        case Aspect.RATIO_3_4: {
            return 3 / 4;
        }
        case Aspect.RATIO_26_10: {
            return 26 / 10;
        }
        default:
            return 1;
    }
};
