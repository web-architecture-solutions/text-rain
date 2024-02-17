import { useEffect, useState } from "react";

export default function useMousePosition () {
    const [mousePosition, setMousePosition] = useState({
        x: null,
        y: null,
    });

    useEffect(() => {
        const updateMousePosition = (event) => {
            setMousePosition({ x: event.clientX, y: event.clientY });
        };
        
        window.addEventListener("mousemove", updateMousePosition);
        
        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
        };
    }, []);
    return mousePosition;
};