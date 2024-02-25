import { forwardRef } from "react";

import styles from "./Character.module.css";

const Character = forwardRef(({ value, top, mass, isStopped }, ref) => {
    return (
        <span 
            className = {styles.Character}
            style     = {{ 
                filter: `blur(${isStopped ? 0 : mass}px)`,
                top: `${top}%` 
            }}
            ref       = {ref}
        >
            {value}
        </span>
    );
});

export default Character;