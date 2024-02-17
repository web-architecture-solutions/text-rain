import { useEffect, useState } from "react";

export default function useMouseCoordinate () {
    const [mouseCoordinates, setMouseCoordinates] = useState({
        mouseX: null,
        mouseY: null,
    });

    useEffect(() => {
        const updateMouseCoordinate = (event) => {
            setMouseCoordinates({ 
                mouseX: event.clientX, 
                mouseY: event.clientY 
            });
        };
        
        window.addEventListener("mousemove", updateMouseCoordinate);
        
        return () => {
            window.removeEventListener("mousemove", updateMouseCoordinate);
        };
    }, []);
    return mouseCoordinates;
};