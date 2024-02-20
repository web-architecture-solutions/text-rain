import { useEffect, useState } from "react";

export default function useMouseCoordinate () {
    const [mouseCoordinates, setMouseCoordinates] = useState({
        mouseX: null,
        mouseY: null,
    });

    const [scrollTop, setScrollTop] = useState(0);
  
    useEffect(() => {
        const updateScrollTop = () => {
            setScrollTop(document.documentElement.scrollTop);
        };
      
        window.addEventListener("scroll", updateScrollTop);
      
        updateScrollTop();
      
        return () => window.removeEventListener("scroll", updateScrollTop);
    }, []);

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