import { useEffect, useState } from "react";

import useMouseCoordinates from "./hooks/useMouseCoordinates";
import useWindowDimensions from "./hooks/useWindowDimensions";

import styles from "./App.module.css";

const isAnimated                = true;
const globalSpeed               = 0.01; // ?
const string                    = "hello_world";
const characters                = string.split("");
const defaultCharacterYCoordinates = new Array(characters.length).fill(0);
const localSpeeds               
    = defaultCharacterYCoordinates.map(() => Math.random() * globalSpeed);

function Character ({ value, top }) {
    return (
        <span 
            className = {styles.character}
            style     = {{
                top: `${top}vh`                        
            }}
        >
            {value}
        </span>
    );
}

function App () {
    const [
        characterYCoordinates, 
        setCharacterYCoordinates
    ] = useState(defaultCharacterYCoordinates);

    const mouseCoordinates = useMouseCoordinates();
    const windowDimensions = useWindowDimensions();
    //const mouseXCoordinate = 100 * mouseCoordinates.x / windowDimensions.width;
    const mouseYCoordinate = 100 * mouseCoordinates.y / windowDimensions.height;

    useEffect(() => {
        if (isAnimated) {
            const interval = setInterval(() => {
                const newCharacterYCoordinates = characterYCoordinates
                    .map((characterYCoordinate, index) => {
                        if (Math.round(characterYCoordinate) === Math.round(mouseYCoordinate)) {
                            console.log('foo');
                        }
                        return characterYCoordinate >= 100
                            ? (characterYCoordinate % 100) - 3
                            : characterYCoordinate + localSpeeds[index];                    
                    });            
                setCharacterYCoordinates(newCharacterYCoordinates);
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
                        top   = {characterYCoordinates[index]}
                    /> 
                )}
            </p>
        </div>
    );
}

export default App;
