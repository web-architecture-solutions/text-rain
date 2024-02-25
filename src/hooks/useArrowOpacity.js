import { useEffect, useState } from "react";

export default function useArrowOpacity (gravityDirection) {
    const [arrowOpacity, setArrowOpacity] = useState(0);

    useEffect(() => {
        setArrowOpacity(1);
        
        const arrowOpacityTimer = setTimeout(() => {
            setArrowOpacity(0);
        }, 1000);

        return () => clearTimeout(arrowOpacityTimer);
    }, [gravityDirection]);

    return arrowOpacity;
}