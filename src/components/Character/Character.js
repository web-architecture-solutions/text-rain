import { forwardRef } from "react";

import { motionBlur } from "../../config";

import styles from "./Character.module.css";

const Character = forwardRef(({ value, top, mass, maxMass, distance }, ref) => {
    const distanceSquared = Math.sqrt(distance);
    const relativeBlur    = motionBlur * mass * distanceSquared;
    const relativeMass    = mass / maxMass;
    const candidateValue  = 255 * relativeMass * distanceSquared;
    const RBGValue        = candidateValue < 89 ? candidateValue : 89;
    const color           = new Array(3).fill(RBGValue);

    return (
        <span 
            className = {styles.Character}
            style     = {{ 
                filter: `blur(${relativeBlur}px)`,
                top   : `${top}%`,
                color : `rgb(${color})`
            }}
            ref       = {ref}
        >
            {value}
        </span>
    );
});

export default Character;