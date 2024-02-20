import { useEffect, useState } from "react";

export default function useScrollTop () {
    const [scrollTop, setScrollTop] = useState(0);
  
    useEffect(() => {
        const updateScrollTop = () => setScrollTop(document.documentElement.scrollTop);
      
        window.addEventListener("scroll", updateScrollTop);
      
        updateScrollTop();
      
        return () => window.removeEventListener("scroll", updateScrollTop);
    }, []);
  
    return scrollTop;
}