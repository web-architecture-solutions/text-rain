import { useEffect, useState } from "react";

import useScrollTop                    from "./useScrollTop";
import useScrollOffsetMouseCoordinates from "./useScrollOffsetMouseCoordinates";

import { Direction } from "../enums";

import { initializeLocalSpeeds } from "../util";

import { 
    isAnimated, 
    framesPerSecond,
    maxSpeed,
    minSpeed,
    distanceEpsilon 
} from "../config";

import text from '../text.json';

const localSpeeds = initializeLocalSpeeds(text.length, maxSpeed, minSpeed);

export default function useCharacterBoundingBoxes (textRef, charactersRef) {    
    function calculateDistance (boundingBox) {
        const normalizedBoundingBoxY 
            = textRef.current?.offsetHeight * boundingBox?.y / 100;
        const positionallyOffsetBoundingBoxY 
            = normalizedBoundingBoxY + textRef.current?.offsetTop;
        const directionallyOffsetBoundingBoxY = direction === Direction.UP 
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
        switch (direction) {
            case Direction.UP:
                return boundingBox?.y <= 0
                    ? (boundingBox?.y % 100) + 100 + bleedMargin
                    : boundingBox?.y - localSpeeds[index];
            case Direction.DOWN:
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

    const { scrollDirection } = useScrollTop();

    const [direction, setDirection] = useState(Direction.UP);

    useEffect(() => {
        setDirection(
            scrollDirection === 1 
                ? Direction.UP 
                : scrollDirection === -1 
                ? Direction.DOWN 
                : direction
        );
    }, [scrollDirection]);

    const [boundingBoxes, setBoundingBoxes] = useState([]);

    useEffect(() => {
        if (isAnimated) {
            const interval = setInterval(() => {
                setBoundingBoxes(
                    boundingBoxes.map((boundingBox, index) => ({ 
                        height: boundingBox?.height,
                        width : boundingBox?.width,
                        x     : boundingBox?.x,
                        y     : calculateNextBoundingBoxY(boundingBox, index)
                    }))
                );
            }, 1000 / framesPerSecond);
            return () => clearInterval(interval);
        }
    });

    useEffect(() => {
        const newboundingBoxes = charactersRef.current.map((element) => {
            return element?.getBoundingClientRect();
        });
        setBoundingBoxes(newboundingBoxes);
    }, [charactersRef.current]);

    return boundingBoxes;
}