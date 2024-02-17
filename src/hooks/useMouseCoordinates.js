import { useEffect, useState } from "react";

export default function useMouseCoordinate () {
    const [mouseCoordinates, setMouseCoordinates] = useState({
        x: null,
        y: null,
    });

    useEffect(() => {
        const updateMouseCoordinate = (event) => {
            setMouseCoordinates({ x: event.clientX, y: event.clientY });
        };
        
        window.addEventListener("mousemove", updateMouseCoordinate);
        
        return () => {
            window.removeEventListener("mousemove", updateMouseCoordinate);
        };
    }, []);
    return mouseCoordinates;
};