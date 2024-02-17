import { useEffect, useRef, useState } from "react";

import Character from "../Character/Character";

//import useMouseCoordinates from "../../hooks/useMouseCoordinates";
//import useWindowDimensions from "../../hooks/useWindowDimensions";

import styles from "./App.module.css";


const defaultBoundingBox = {
    height: 0,
    width : 0,
    top   : 0,
    right : 0,
    bottom: 0,
    left  : 0,
    x     : 0,
    y     : 0
};
const isAnimated                    = true;
const globalSpeed                   = 0.01; // ?
const string                        = "XY";
const characters                    = string.split("");
const defaultCharacterYCoordinates  = new Array(characters.length).fill(0);
const defaultCharacterBoundingBoxes 
    = new Array(characters.length).fill(defaultBoundingBox);
const localSpeeds               
    = defaultCharacterYCoordinates.map(() => Math.random() * globalSpeed);

function App () {
    const [
        characterYCoordinates, 
        setCharacterYCoordinates
    ] = useState(defaultCharacterYCoordinates);

    const [
        characterBoundingBoxes,
        setCharacterBoundingBoxes
    ] = useState(defaultCharacterBoundingBoxes);

    //const [characterRefs, setCharacterRefs] = useState(new Array(characters.length).fill(null));

    //const mouseCoordinates = useMouseCoordinates();
    //const windowDimensions = useWindowDimensions();
    //const mouseXCoordinate = 100 * mouseCoordinates.x / windowDimensions.width;
    //const mouseYCoordinate = 100 * mouseCoordinates.y / windowDimensions.height;

    useEffect(() => {
        //console.log(characterBoundingBoxes)
        //console.log(characterRefs)
        if (isAnimated) {
            const interval = setInterval(() => {
                const newCharacterYCoordinates = characterYCoordinates
                    .map((characterYCoordinate, index) => {
                        //if (Math.round(characterYCoordinate) === Math.round(mouseYCoordinate)) {
                        //    console.log('foo');
                        //}
                        return characterYCoordinate >= 100
                            ? (characterYCoordinate % 100) - 3
                            : characterYCoordinate + localSpeeds[index];                    
                    });            
                setCharacterYCoordinates(newCharacterYCoordinates);
            }, 1);
            return () => clearInterval(interval);
        }
    });
    
    //function characterBoundingBoxSetterFactory (index) {
    //    return (characterBoundingBox) => {
    //        const newCharacterBoundingBoxes = [...characterBoundingBoxes];
    //        newCharacterBoundingBoxes[index] = characterBoundingBox;
    //        setCharacterBoundingBoxes(newCharacterBoundingBoxes);
    //    }
    //}

    const charactersRef = useRef([]);

    function addToCharactersRef (element) {
        if (!charactersRef.current.includes(element)) {
            charactersRef.current.push(element);
        }
    }

    return (
        <div className={styles.App}>
            <p className={styles.text}>
                {characters.map((character, index) => 
                   <Character 
                        value            = {character}
                        index            = {index}
                        key              = {`${character}_${index}`}
                        top              = {characterYCoordinates[index]}
                        ref              = {addToCharactersRef}
                        //boundingBoxes    = {characterBoundingBoxes}
                        //setBoundingBoxes = {setCharacterBoundingBoxes}
                        //setBoundingBox   = {characterBoundingBoxSetterFactory(index)}
                        //characterRefs    = {characterRefs}
                        //setCharacterRefs = {setCharacterRefs}
                    /> 
                )}
            </p>
        </div>
    );
}

export default App;
