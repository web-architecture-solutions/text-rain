import { useEffect, useState } from "react";

import useScrollOffsetMouseCoordinates from "./useScrollOffsetMouseCoordinates";
import useGravityDirection             from "./useGravityDirection";

import { Direction } from "../enums";

import { isAnimated, framesPerSecond, distanceEpsilon } from "../config";

function getBoundingBoxes (charactersRef) {
    return charactersRef.current.map((element) => {
        return element?.getBoundingClientRect();
    });
}

export default function useCharacterBoundingBoxes (
    textRef, 
    charactersRef,
    characterMasses
) {    
    function calculateDistance (boundingBox) {
        const normalizedBoundingBoxY 
            = textRef.current?.offsetHeight * boundingBox?.y / 100;
        const positionallyOffsetBoundingBoxY 
            = normalizedBoundingBoxY + textRef.current?.offsetTop;
        const directionallyOffsetBoundingBoxY 
            = gravityDirection === Direction.UP 
            ? positionallyOffsetBoundingBoxY
            : positionallyOffsetBoundingBoxY + boundingBox?.height / 2;
        const normalizedOffsetBoundingBoxY 
            = directionallyOffsetBoundingBoxY 
            / document.documentElement.scrollHeight;
        const distance 
            = Math.abs(normalizedOffsetBoundingBoxY - normalizedMouseY);
        return distance;
    }

    function calculateNextBoundingBoxY (boundingBox, index) {
        const distance = calculateDistance(boundingBox);
        if (distance < distanceEpsilon) return boundingBox?.y;
        const bleedMargin 
            = 100 * boundingBox?.height / document.documentElement.scrollHeight;
        switch (gravityDirection) {
            case Direction.UP:
                return boundingBox?.y < 0
                    ? (boundingBox?.y % 100) + 100 + bleedMargin
                    : boundingBox?.y - characterMasses[index] / Math.sqrt(distance);
            case Direction.DOWN:
                return boundingBox?.y >= 100
                    ? (boundingBox?.y % 100) - bleedMargin
                    : boundingBox?.y + characterMasses[index] / Math.sqrt(distance);
            default:
                console.error(
                    `Direction "${gravityDirection}" is unsupported. 
                    Please use either UP or DOWN`
                );
                break;
        }
    }

    const { mouseY }       = useScrollOffsetMouseCoordinates();  
    const normalizedMouseY = mouseY / document.documentElement.scrollHeight;

    const gravityDirection = useGravityDirection();

    const initialBoundingBoxes = getBoundingBoxes(charactersRef);

    const [boundingBoxes, setBoundingBoxes] = useState(initialBoundingBoxes);

    useEffect(() => {
        if (isAnimated) {
            const interval = setInterval(() => {
                setBoundingBoxes(
                    boundingBoxes.map((boundingBox, index) => { 
                        const nextBoundingBoxY 
                            = calculateNextBoundingBoxY(boundingBox, index);
                        return {
                            height   : boundingBox?.height,
                            width    : boundingBox?.width,
                            x        : boundingBox?.x,
                            y        : nextBoundingBoxY,
                            mass     : characterMasses[index],
                            isStopped: boundingBox?.y === nextBoundingBoxY
                        };
                    })
                );
            }, 1000 / framesPerSecond);
            return () => clearInterval(interval);
        }
    });

    useEffect(() => {
        const newBoundingBoxes = getBoundingBoxes(charactersRef);
        setBoundingBoxes(newBoundingBoxes);
    }, [charactersRef]);

    return { boundingBoxes, gravityDirection };
}