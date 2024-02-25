import { forwardRef } from "react";

import styles from "./Character.module.css";

const Character = forwardRef(({ value, top, speed, isStopped }, ref) => {
    return (
        <span 
            className = {styles.Character}
            style     = {{ 
                filter: `blur(${isStopped ? 0 : speed}px)`,
                top: `${top}%` 
            }}
            ref       = {ref}
        >
            {value}
        </span>
    );
});

export default Character;