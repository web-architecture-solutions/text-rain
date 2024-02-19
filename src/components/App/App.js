import { useEffect, useRef, useState } from "react";

import Character from "../Character/Character";

import useMouseCoordinates from "../../hooks/useMouseCoordinates";

import text from '../../text.json';

import styles from "./App.module.css";

function generateRandomNumber (min, max) {
    return Math.random() * (max - min) + min;
}

function initializeSpeeds (stringLength, globalSpeed) {
    return new Array(stringLength)
        .fill(null)
        .map(() => generateRandomNumber(0.2, 1) * globalSpeed);
}

const isAnimated       = true;
const globalSpeed      = 0.5;
const stoppingDistance = 16;
const characters       = text.split("");
const localSpeeds      = initializeSpeeds(text.length, globalSpeed);

function App () {
    function generateNextboundingBoxY (boundingBox, index) {
        const normalizedMouseY  = 100 * mouseY / textRef?.current.clientHeight;  
        const distance          = boundingBox?.y - normalizedMouseY;
            
        if ((distance < 0) && (distance > -stoppingDistance)) {
            return boundingBox?.y;
        } else if (boundingBox?.y >= 100) {
            return (boundingBox?.y % 100) - 3;
        } else {
            return boundingBox?.y + localSpeeds[index];
        }
    }

    function addToCharactersRef (element) {
        if (!charactersRef.current.includes(element)) {
            charactersRef.current.push(element);
        }
    }

    const textRef       = useRef(null);
    const charactersRef = useRef([]);

    const { mouseY } = useMouseCoordinates();  

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
                        y: generateNextboundingBoxY(boundingBox, index)
                    }))
                );
            }, 1);
            return () => clearInterval(interval);
        }
    });

    return (
        <div className={styles.App}>
            <p className={styles.text} ref={textRef}>
                {characters.map((character, index) => 
                   <Character 
                        value = {character}
                        key   = {`${character}_${index}`}
                        top   = {boundingBoxes[index]?.y}
                        ref   = {addToCharactersRef}
                    /> 
                )}
            </p>
        </div>
    );
}

export default App;
