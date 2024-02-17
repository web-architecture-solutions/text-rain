import { useEffect, useRef, useState } from "react";

import Character from "../Character/Character";

import useMouseCoordinates from "../../hooks/useMouseCoordinates";
import useWindowDimensions from "../../hooks/useWindowDimensions";

import styles from "./App.module.css";

function generateRandomNumber (min, max) {
    return Math.random() * (max - min) + min;
}

function initializeLocalSpeeds (stringLength, globalSpeed) {
    return new Array(stringLength)
        .fill(null)
        .map(() => generateRandomNumber(0.2, 1) * globalSpeed);
}

const string           = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const globalSpeed      = 0.5;
const stoppingDistance = 2.6;
const isAnimated       = true;
const characters       = string.split("");
const localSpeeds      = initializeLocalSpeeds(string.length, globalSpeed);

function App () {
    function generateNextboundingBoxY (boundingBox, index) {
        const normalizedMouseY  = 100 * mouseY / height;  
        const distance          = boundingBox.y - normalizedMouseY;
            
        if ((distance < 0) && (distance > -stoppingDistance)) {
            return boundingBox.y;
        } else if (boundingBox.y >= 100) {
            return (boundingBox.y % 100) - 3;
        } else {
            return boundingBox.y + localSpeeds[index];
        }
    }

    function addToCharactersRef (element) {
        if (!charactersRef.current.includes(element)) {
            charactersRef.current.push(element);
        }
    }

    const charactersRef = useRef([]);

    const { mouseY } = useMouseCoordinates();  
    const { height } = useWindowDimensions();

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
            }, 10);
            return () => clearInterval(interval);
        }
    });

    return (
        <div className={styles.App}>
            <p className={styles.text}>
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
