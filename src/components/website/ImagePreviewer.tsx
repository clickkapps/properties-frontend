import {useRef, useEffect, ReactNode} from "react";

import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import {OptionsType} from "@fancyapps/ui/types/Fancybox/options";

function ImagePreviewer({ options, children }: { options?: Partial<OptionsType>, children?: ReactNode }) {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;

        const delegate = "[data-fancybox]";
        const opts = options || {};

        NativeFancybox.bind(container, delegate, opts);

        return () => {
            NativeFancybox.unbind(container);
            NativeFancybox.close();
        };
    });

    return <div ref={containerRef}>{children}</div>;
}

export default ImagePreviewer;
