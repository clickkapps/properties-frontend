import { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import LazyLoad from "react-lazyload";

interface LazyImageProps {
    src: string
    alt?: string
    className?: string
}

export function LazyImage({ src, alt = "", className }: LazyImageProps) {
    const [loaded, setLoaded] = useState(false)

    return (
        <LazyLoad height={200} offset={100} once>
            <div className="relative w-full h-full">
                {!loaded && <Skeleton className="w-full h-48 rounded-md" />}
                <img
                    src={src}
                    alt={alt}
                    onLoad={() => setLoaded(true)}
                    className={`w-full h-auto rounded-md transition-opacity duration-500 ${
                        loaded ? "opacity-100" : "opacity-0 absolute top-0 left-0"
                    } ${className}`}
                />
            </div>
        </LazyLoad>
    )
}