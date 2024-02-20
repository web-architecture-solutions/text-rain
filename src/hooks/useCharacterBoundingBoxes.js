import { useEffect, useState } from "react";

import useScrollOffsetMouseCoordinates from "./useScrollOffsetMouseCoordinates";

import { Direction } from "../enums";

import { initializeLocalSpeeds } from "../util";

import { 
    isAnimated, 
    direction, 
    speedFloor, 
    globalSpeed, 
    distanceEpsilon 
} from "../config";

import text from '../text.json';

import { bleedMargin } from "../config";

const localSpeeds = initializeLocalSpeeds(text.length, speedFloor, globalSpeed);

export default function useCharacterBoundingBoxes (textRef, charactersRef) {    
    function calculateNextBoundingBoxY (boundingBox, index) {
        const normalizedBoundingBoxY 
            = textRef.current?.offsetHeight * boundingBox?.y / 100;
        const offsetBoundingBoxY 
            = normalizedBoundingBoxY + textRef.current?.offsetTop;
        const directionallyOffsetBoundingBoxY = direction === Direction.up 
            ? offsetBoundingBoxY
            : offsetBoundingBoxY + boundingBox?.height;
        const normalizedOffsetBoundingBoxY 
            = directionallyOffsetBoundingBoxY 
            / document.documentElement.scrollHeight;
        const distance 
            = Math.abs(normalizedOffsetBoundingBoxY - normalizedMouseY);
        
        if (distance < distanceEpsilon) return boundingBox?.y;

        switch (direction) {
            case Direction.up:
                return boundingBox?.y <= 0
                    ? (boundingBox?.y % 100) + 100 + bleedMargin
                    : boundingBox?.y - localSpeeds[index];

            case Direction.down:
                return boundingBox?.y >= 100
                    ? (boundingBox?.y % 100) - bleedMargin
                    : boundingBox?.y + localSpeeds[index];
        
            default:
                console.error(
                    `Direction "${direction}" is unsupported. 
                    Please use either "up" or "down"`
                );
                break;
        }

    }

    const { mouseY }       = useScrollOffsetMouseCoordinates();  
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
                        height: boundingBox?.height,
                        y     : calculateNextBoundingBoxY(boundingBox, index)
                    }))
                );
            }, 1);
            return () => clearInterval(interval);
        }
    });

    return boundingBoxes;
}