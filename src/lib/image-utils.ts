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
export const getCroppedImage = async (
    image: HTMLImageElement,
    pixelCrop: Area,
) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    const maxSize = Math.max(image.width, image.height)
    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2))

    // set each dimensions to double largest dimension to allow for a safe area for the
    // image to rotate in without being clipped by canvas context
    canvas.width = safeArea
    canvas.height = safeArea

    if (ctx) {
        // translate canvas context to a central location on image to allow rotating around the center.
        ctx.translate(safeArea / 2, safeArea / 2)
        ctx.translate(-safeArea / 2, -safeArea / 2)

        // draw rotated image and store data.
        ctx.drawImage(
            image,
            safeArea / 2 - image.width * 0.5,
            safeArea / 2 - image.height * 0.5
        )
        const data = ctx.getImageData(0, 0, safeArea, safeArea)

        // set canvas width to final desired crop size - this will clear existing context
        canvas.width = pixelCrop.width
        canvas.height = pixelCrop.height

        // paste generated rotate image with correct offsets for x,y crop values.
        ctx.putImageData(
            data,
            Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
            Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
        )

        return new Promise<Blob | null>((resolve, reject) => {
            canvas.toBlob(
                blob => {
                    if (!blob) reject(null);
                    resolve(blob);
                },
                'image/jpeg',
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
