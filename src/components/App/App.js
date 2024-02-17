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

const string      = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const globalSpeed = 0.01;
const isAnimated  = true;
const characters  = string.split("");
const localSpeeds = initializeLocalSpeeds(string.length, globalSpeed);

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

    const { mouseY } = useMouseCoordinates();  
    const { height } = useWindowDimensions();
    
    const normalizedMouseY = 100 * mouseY / height;  

    useEffect(() => {
        if (isAnimated) {
            const interval = setInterval(() => {
                const newCharacterBoundingBoxes = characterBoundingBoxes
                    .map((characterBoundingBox, index) => {
                        return { 
                            x: characterBoundingBox.x, 
                            y: characterBoundingBox.y >= 100
                                ? (characterBoundingBox.y % 100) - 3
                                : (characterBoundingBox.y - normalizedMouseY < 0.1) 
                                    && (characterBoundingBox.y - normalizedMouseY > -0.1)
                                ? characterBoundingBox.y
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
        </div>
    );
}

export default App;
