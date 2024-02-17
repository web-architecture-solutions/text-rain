import { forwardRef, useEffect, useRef } from "react";

import styles from "./Character.module.css";

const Character = forwardRef(({ 
    value, 
    //index,
    top, 
    //setBoundingBox
    //boundingBoxes,
    //setBoundingBoxes
    //characterRefs,
    //setCharacterRefs
}, ref) => {
    //const ref = useRef(null);

    //useEffect(() => {
        //const newCharacterRefs = [...characterRefs];
        //newCharacterRefs[index] = ref;
        //setCharacterRefs(newCharacterRefs);
        //characterRefs[index] = ref;
    //}, []);
    
    //useEffect(() => {
    //    const newBoundingBoxes = [...boundingBoxes];
    //    newBoundingBoxes[index] = ref.current.getBoundingClientRect();
    //    setBoundingBoxes(newBoundingBoxes);
    //    
    //    //setBoundingBox(ref.current.getBoundingClientRect());
    //}, [top]);

    return (
        <span 
            className = {styles.Character}
            style     = {{ top: `${top}vh` }}
            ref       = {ref}
        >
            {value}
        </span>
    );
});

export default Character;