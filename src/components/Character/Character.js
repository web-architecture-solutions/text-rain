import { forwardRef } from "react";

import { motionBlur } from "../../config";

import styles from "./Character.module.css";

const Character = forwardRef(({ value, top, mass, isStopped, maxMass }, ref) => {
    const RBGValue = 255 - (255 * mass / maxMass) < 89 
        ? 255 - (255 * mass / maxMass)
        : 89;

    return (
        <span 
            className = {styles.Character}
            style     = {{ 
                filter: `blur(${isStopped ? 0 : mass * motionBlur}px)`,
                top: `${top}%`,
                color:  isStopped 
                    ? "black" 
                    : `rgb(${[RBGValue, RBGValue, RBGValue]})`
            }}
            ref       = {ref}
        >
            {value}
        </span>
    );
});

export default Character;