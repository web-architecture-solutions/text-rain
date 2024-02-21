import { useEffect, useRef, useState } from "react";

export default function useScrollTop () {
    const [scrollTop, setScrollTop] = useState(0);
  
    const previousScrollTopRef = useRef(scrollTop);

    useEffect(() => {
        const updateScrollTop = () => setScrollTop(document.documentElement.scrollTop);
      
        window.addEventListener("scroll", updateScrollTop);
      
        updateScrollTop();
      
        return () => window.removeEventListener("scroll", updateScrollTop);
    }, []);

    useEffect(() => {
        previousScrollTopRef.current = scrollTop;
    }, [scrollTop]);
  
    return { 
        scrollTop, 
        previousScrollTop: previousScrollTopRef.current,
        scrollDirection  : Math.sign(scrollTop - previousScrollTopRef.current)
    };
}