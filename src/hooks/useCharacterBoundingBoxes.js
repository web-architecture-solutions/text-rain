import { useEffect, useState } from "react";

import useMouseCoordinates from "./useMouseCoordinates";

import { initializeLocalSpeeds } from "../util";

import { isAnimated, speedFloor, globalSpeed, EPSILON } from "../config";

import text from '../text.json';

const localSpeeds = initializeLocalSpeeds(text.length, speedFloor, globalSpeed);

export default function useCharacterBoundingBoxes (textRef, charactersRef) {    
    function generateNextBoundingBoxY (boundingBox, index) {
        const normalizedBoundingBoxY     
            = textRef.current?.offsetHeight * boundingBox?.y / 100;
        const offsetBoundingBoxY           
            = normalizedBoundingBoxY + textRef.current?.offsetTop
        const normalizedOffsetBoundingBoxY 
            = offsetBoundingBoxY / document.documentElement.scrollHeight;
        const distance                     
            = Math.abs(normalizedOffsetBoundingBoxY - normalizedMouseY);
        if (distance < EPSILON) {    
            return boundingBox?.y;
        } else if (boundingBox?.y <= 0) {
            return (boundingBox?.y % 100) + 103;
        } else {
            return boundingBox?.y - localSpeeds[index];
        }
    }

    const { mouseY }       = useMouseCoordinates();  
    const normalizedMouseY = mouseY / document.documentElement.scrollHeight;

    const [boundingBoxes, setBoundingBoxes] = useState([]);

    useEffect(() => {
        const newboundingBoxes = charactersRef.current.map((element) => {
            return element?.getBoundingClientRect();
        });
        setBoundingBoxes(newboundingBoxes);
    }, [charactersRef.current]);

    useEffect(() => {
        if (isAnimated) {
            const interval = setInterval(() => {
                setBoundingBoxes(
                    boundingBoxes.map((boundingBox, index) => ({ 
                        y: generateNextBoundingBoxY(boundingBox, index)
                    }))
                );
            }, 1);
            return () => clearInterval(interval);
        }
    });

    return boundingBoxes;
}