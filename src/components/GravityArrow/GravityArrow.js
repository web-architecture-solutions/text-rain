import useArrowOpacity from "../../hooks/useArrowOpacity";

import { Direction } from "../../enums";

import styles from "./GravityArrow.module.css";

export default function GravityArrow ({ gravityDirection }) {
    const arrowOpacity = useArrowOpacity(gravityDirection);
    
    return (
        <span 
            className = {styles.GravityArrow}
            style     = {{
                opacity  : arrowOpacity,
                transform: gravityDirection === Direction.DOWN
                    ? "translate(-50%, -50%) rotate(0)"
                    : "translate(-50%, -50%) rotate(180deg)"
            }}
        >
            &#129095;
        </span>
    );
}