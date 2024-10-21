import Image from "next/image";
import { urlFor } from "@/lib/sanity/client";
import { getImageDimensions } from '@sanity/asset-utils';

export default function SanityImage({
    source,
    alt,
    quality = 75,
    objectFit = false,
    ...props
}) {

    const { width, height } = getImageDimensions(source);

    const imageUrl = urlFor(source)
        .width(width)
        .height(height)
        .quality(quality)
        .url();

    const blurUrl = urlFor(source)
        .width(20)
        .height(20)
        .blur(10)
        .quality(10)
        .url();

    return (

        <Image
            src={imageUrl}
            alt={alt}
            quality={quality}
            placeholder="blur"
            blurDataURL={blurUrl}
            // {
            //     objectFit
            //     ? layout = "fill"
            //     objectFit="contain"
            // : width={width}
            //     height={height}
            // }
            {
            ...(objectFit
                ? { layout: "fill", objectFit: "contain" }
                : { width, height }
            )
            }
            {...props}
        />

    );

};