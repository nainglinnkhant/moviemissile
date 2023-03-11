import React, { useEffect, useRef, useState } from 'react'

import fallback from '../../assets/poster-fallback.jpg'
import styles from './Image.module.css'

interface ImageProps extends React.HTMLProps<HTMLImageElement> {
    width?: number
    height?: number
    skeleton?: boolean
    skeletonClassName?: string
}

const Image = (props: ImageProps) => {
    const [imageLoaded, setImageLoaded] = useState(false)
    const [imageSrc, setImageSrc] = useState(props.src)

    const imageRef = useRef<HTMLImageElement>(null)
    
    const {
        skeleton = true,
        skeletonClassName = '',
        className = '',
        width = '',
        height = '',
        style = {},
        ...imageProps
    } = props

    const imageClass = imageLoaded ? 'd-block' : 'd-none'

    const extractImageDimensions = (style: React.CSSProperties) => {
        const dimensionKeys = ['width', 'height']
        const keys = Object.entries(style)
        const dimensionEntries = keys.filter(key => dimensionKeys.includes(key[0]))

        if (!dimensionEntries.length) return null
        
        return Object.fromEntries(dimensionEntries)
    }

    const skeletonDimensions = extractImageDimensions(style) || { width, height }

    useEffect(() => {
        const handleImageError = () => setImageSrc(fallback)

        const imageElement = imageRef.current
        
        imageElement?.addEventListener('error', handleImageError)

        return () => imageElement?.removeEventListener('error', handleImageError)
    }, [])

    return (
        <>
            <img
                ref={imageRef}
                loading='lazy'
                {...imageProps}
                src={imageSrc}
                alt={imageProps.alt}
                onLoad={() => setImageLoaded(true)}
                className={`${styles.image} ${skeleton ? imageClass : ''} ${className}`}
                style={{ width, height, ...style }}
            />

            {skeleton && !imageLoaded && (
                <div
                    className={`${styles.skeleton} ${skeletonClassName}`}
                    style={skeletonDimensions}
                />
            )}
        </>
    )
}

export default Image