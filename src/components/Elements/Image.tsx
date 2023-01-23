import React, { useState } from 'react'
import styles from './Image.module.css'

interface ImageProps extends React.HTMLProps<HTMLImageElement> {
    skeleton?: boolean
    skeletonClassName?: string
}

const Image = (props: ImageProps) => {
    const [imageLoaded, setImageLoaded] = useState(false)
    
    const { skeleton = true, skeletonClassName, ...imageProps } = props

    const imageClass = imageLoaded ? 'd-block' : 'd-none'

    return (
        <>
            <img
                {...imageProps}
                alt={imageProps.alt}
                onLoad={() => setImageLoaded(true)}
                className={skeleton ? imageClass : ''}
            />

            {skeleton && !imageLoaded && (
                <div className={`${styles.skeleton} ${skeletonClassName}`} />
            )}
        </>
    )
}

export default Image