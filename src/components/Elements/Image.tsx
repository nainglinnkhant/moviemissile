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
    
    const { skeleton = true, skeletonClassName, width, height, ...imageProps } = props

    const imageClass = imageLoaded ? 'd-block' : 'd-none'

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
                {...imageProps}
                src={imageSrc}
                alt={imageProps.alt}
                onLoad={() => setImageLoaded(true)}
                className={`${styles.image} ${skeleton ? imageClass : ''} ${imageProps.className}`}
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