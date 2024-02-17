import { useEffect, useRef, useState } from "react";

import Character from "../Character/Character";

import useMouseCoordinates from "../../hooks/useMouseCoordinates";
import useWindowDimensions from "../../hooks/useWindowDimensions";

import styles from "./App.module.css";

const crosshairSize                 = 100;
const isAnimated                    = true;
const globalSpeed                   = 0.01;
const string                        = "XY";
const characters                    = string.split("");
const defaultCharacterYCoordinates  = new Array(characters.length).fill(0);
const localSpeeds               
    = defaultCharacterYCoordinates.map(() => Math.random() * globalSpeed);

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
    const { height /*, width*/ } = useWindowDimensions();
    //const normalizedMouseX = 100 * mouseX / width;
    //const normalizedMouseY = 100 * mouseY / height;  

    useEffect(() => {
        if (isAnimated) {
            const interval = setInterval(() => {
                const newCharacterBoundingBoxes = characterBoundingBoxes.map((characterBoundingBox, index) => {
                    if (Math.round(characterBoundingBox.y) === Math.round(100 * (mouseY - (crosshairSize / 2)) / height)) {
                        //console.log('foo');
                    }
                    const newBoundingBoxY = characterBoundingBox.y >= 100
                        ? (characterBoundingBox.y % 100) - 3
                        : characterBoundingBox.y + localSpeeds[index];
                    return { ...characterBoundingBox, y: newBoundingBoxY };                    
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
                    height: crosshairSize,
                    width : crosshairSize,
                    top   : mouseY - (crosshairSize / 2),
                    left  : mouseX - (crosshairSize / 2)
                }}
            ></div>
        </div>
    );
}

export default App;
