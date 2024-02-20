import { useEffect, useState } from "react";

export default function useMouseCoordinate () {
    const [mouseCoordinates, setMouseCoordinates] = useState({
        mouseX: null,
        mouseY: null,
    });

    const [scrollTop, setScrollTop] = useState(0);
  
    useEffect(() => {
        const updateScrollTop = () => setScrollTop(document.documentElement.scrollTop);
      
        window.addEventListener("scroll", updateScrollTop);
      
        updateScrollTop();
      
        return () => window.removeEventListener("scroll", updateScrollTop);
    }, []);

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