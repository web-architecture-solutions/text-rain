import { forwardRef } from "react";

import { motionBlur } from "../../config";

import styles from "./Character.module.css";

const Character = forwardRef(({ value, top, mass, maxMass, distance }, ref) => {
    const RBGValue  = (255 * mass / maxMass) * Math.sqrt(distance) < 89 
        ? (255 * mass / maxMass) * Math.sqrt(distance)
        : 89;

    return (
        <span 
            className = {styles.Character}
            style     = {{ 
                filter: `blur(${mass * motionBlur * Math.sqrt(distance)}px)`,
                top: `${top}%`,
                color: `rgb(${[RBGValue, RBGValue, RBGValue]})`
            }}
            ref       = {ref}
        >
            {value}
        </span>
    );
});

export default Character;