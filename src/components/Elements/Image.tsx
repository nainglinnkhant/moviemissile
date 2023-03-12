import React, { useRef, useState } from 'react'

import FallbackIcon from './FallbackIcon'
import styles from './Image.module.css'

interface ImageProps extends React.HTMLProps<HTMLImageElement> {
    width?: number
    height?: number
    skeleton?: boolean
    skeletonClassName?: string
}

const Image = (props: ImageProps) => {
    const [imageLoaded, setImageLoaded] = useState(false)
    const [error, setError] = useState(false)

    const imageRef = useRef<HTMLImageElement>(null)
    
    const {
        skeleton = true,
        skeletonClassName = '',
        className = '',
        width = '',
        height = '',
        style = {},
        onClick,
        ...imageProps
    } = props

    const imageClass = imageLoaded ? 'd-block' : 'd-none'

    if (error) return (
        <div
            className={styles.fallback}
            onClick={onClick}
            style={{ width, height }}
        >
            <FallbackIcon />
        </div>
    )

    return (
        <>
            <img
                ref={imageRef}
                {...imageProps}
                alt={imageProps.alt}
                onLoad={() => setImageLoaded(true)}
                onError={() => setError(true)}
                className={`${styles.image} ${skeleton ? imageClass : ''} ${className}`}
                style={{ width, height, ...style }}
            />

            {skeleton && !imageLoaded && !error && (
                <div
                    className={`${styles.skeleton} ${skeletonClassName}`}
                    onClick={onClick}
                    style={{ width, height }}
                />
            )}
        </>
    )
}

export default Image