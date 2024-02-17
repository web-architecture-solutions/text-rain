import { forwardRef } from "react";

import styles from "./Character.module.css";

const Character = forwardRef(({ value, top }, ref) => {
    return (
        <span 
            className = {styles.Character}
            style     = {{ top: `${top}%` }}
            ref       = {ref}
        >
            {value}
        </span>
    );
});

export default Character;