import { useEffect, useState } from "react";

import useScrollTop from "./useScrollTop";

export default function useScrollOffsetMouseCoordinates () {
    const [mouseCoordinates, setMouseCoordinates] = useState({
        mouseX: null,
        mouseY: null,
    });

    const scrollTop = useScrollTop();

    useEffect(() => {
      const updateMouseCoordinate = (event) => {
            setMouseCoordinates({ 
                mouseX: event.clientX, 
                mouseY: event.clientY + Math.round(scrollTop)
            });
        };

        document.body.addEventListener("mousemove", updateMouseCoordinate);
        
        return () => document.body.removeEventListener(
            "mousemove", 
            updateMouseCoordinate
        );
    }, [scrollTop]);

    return mouseCoordinates;
};