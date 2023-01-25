import React, { useState } from 'react'
import styles from './Image.module.css'

interface ImageProps extends React.HTMLProps<HTMLImageElement> {
    width?: number
    height?: number
    skeleton?: boolean
    skeletonClassName?: string
}

const Image = (props: ImageProps) => {
    const [imageLoaded, setImageLoaded] = useState(false)
    
    const { skeleton = true, skeletonClassName, width, height, ...imageProps } = props

    const imageClass = imageLoaded ? 'd-block' : 'd-none'

    return (
        <>
            <img
                {...imageProps}
                alt={imageProps.alt}
                onLoad={() => setImageLoaded(true)}
                className={`${styles.image} ${skeleton ? imageClass : ''}`}
                style={{ width, height }}
            />

            {skeleton && !imageLoaded && (
                <div
                    className={`${styles.skeleton} ${skeletonClassName}`}
                    style={{ width, height }}
                />
            )}
        </>
    )
}

export default Image