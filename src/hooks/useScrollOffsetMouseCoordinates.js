import { useEffect, useState } from "react";

import useScrollTop from "./useScrollTop";

export default function useScrollOffsetMouseCoordinates () {
    const [mouseCoordinates, setMouseCoordinates] = useState({
        mouseX: null,
        mouseY: null,
    });

    const { scrollTop, previousScrollTop } = useScrollTop();

    useEffect(() => {
        function updateMouseCoordinate ({ clientX, clientY }) {
            setMouseCoordinates({ 
                mouseX: clientX, 
                mouseY: clientY + Math.round(scrollTop)
            });
        };

        setMouseCoordinates({ 
            ...mouseCoordinates,
            mouseY: mouseCoordinates.mouseY - previousScrollTop + scrollTop
        });

        document.body.addEventListener("mousemove", updateMouseCoordinate);
        
        return () => document.body.removeEventListener(
            "mousemove", 
            updateMouseCoordinate
        );
    }, [scrollTop]);

    console.log(mouseCoordinates.mouseY);

    return mouseCoordinates;
};