import { useEffect, useRef, useState } from "react";

import Character from "../Character/Character";

import useMouseCoordinates from "../../hooks/useMouseCoordinates";
import useWindowDimensions from "../../hooks/useWindowDimensions";

import styles from "./App.module.css";

function initializeLocalSpeeds (stringLength, globalSpeed) {
    return new Array(stringLength)
        .fill(null)
        .map(() => Math.random() * globalSpeed);
}

const string            = "X";
const globalSpeed       = 0.01;
const crosshairDiameter = 100;
const isAnimated        = true;
const characters        = string.split("");
const localSpeeds       = initializeLocalSpeeds(string.length, globalSpeed);

function euclideanDistance (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

function App () {
    const charactersRef = useRef([]);

    function addToCharactersRef (element) {
        if (!charactersRef.current.includes(element)) {
            charactersRef.current.push(element);
        }
    }

    const [
        characterBoundingBoxes,
        setCharacterBoundingBoxes
    ] = useState([]);

    useEffect(() => {
        const newCharacterBoundingBoxes 
            = charactersRef.current.map((element) => {
                return element?.getBoundingClientRect();
            });
        setCharacterBoundingBoxes(newCharacterBoundingBoxes);
    }, [charactersRef.current]);

    const { mouseX, mouseY } = useMouseCoordinates();  
    const { height, width } = useWindowDimensions();
    
    const normalizedMouseX = 100 * mouseX / width;
    const normalizedMouseY = 100 * mouseY / height;  

    //const crosshairY           = mouseY - (crosshairDiameter / 2);
    //const normalizedCrosshairY = 100 * crosshairY / height; 

    useEffect(() => {
        if (isAnimated) {
            const interval = setInterval(() => {
                const newCharacterBoundingBoxes = characterBoundingBoxes
                    .map((characterBoundingBox, index) => {
                        /*
                        console.log(
                            Math.round(euclideanDistance(
                                characterBoundingBox.x / width, 
                                characterBoundingBox.y,
                                mouseX / width,
                                normalizedMouseY
                            ))
                        );
                        */
                        return { 
                            x: characterBoundingBox.x, 
                            y: characterBoundingBox.y >= 100
                                ? (characterBoundingBox.y % 100) - 3
                                : characterBoundingBox.y + localSpeeds[index] 
                        };                    
                    });
                    setCharacterBoundingBoxes(newCharacterBoundingBoxes);
                }, 1);
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
                        top   = {characterBoundingBoxes[index]?.y}
                        ref   = {addToCharactersRef}
                    /> 
                )}
            </p>

            <div 
                className = {styles.crosshair}
                style     = {{
                    height: crosshairDiameter,
                    width : crosshairDiameter,
                    top   : mouseY - (crosshairDiameter / 2),
                    left  : mouseX - (crosshairDiameter / 2)
                }}
            ></div>
        </div>
    );
}

export default App;
