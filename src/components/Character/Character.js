import { forwardRef } from "react";

import styles from "./Character.module.css";

const Character = forwardRef(({ value, top, mass, isStopped, maxMass }, ref) => {
    const RBGValue = 255 -  (255 * mass / maxMass);

    return (
        <span 
            className = {styles.Character}
            style     = {{ 
                filter: `blur(${isStopped ? 0 : mass}px)`,
                top: `${top}%`,
                color:  `rgb(${[RBGValue, RBGValue, RBGValue]})`
            }}
            ref       = {ref}
        >
            {value}
        </span>
    );
});

export default Character;