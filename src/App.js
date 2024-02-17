import { useEffect, useState } from "react";

import useMousePosition from "./hooks/useMousePosition";

import styles from "./App.module.css";

const hitboxSize                = 100; // px
const globalSpeed               = 0.01;
const string                    = "Hello World!";
const characters                = string.split("");
const defaultCharacterPositions = new Array(characters.length).fill(0);
const localSpeeds               
    = defaultCharacterPositions.map(() => Math.random() * globalSpeed);

function App () {
    const [
        characterPositions, 
        setCharacterPositions
    ] = useState(defaultCharacterPositions);

    const mousePosition = useMousePosition();

    useEffect(() => {
        const interval = setInterval(() => {
            const newCharacterPositions = characterPositions
                .map((characterPosition, index) => {
                    return characterPosition >= 100
                        ? (characterPosition % 100) - 3
                        : characterPosition + localSpeeds[index];
                });            
            setCharacterPositions(newCharacterPositions);
        }, 1);
        return () => clearInterval(interval);
    });
    
    return (
        <div className={styles.App}>
            {characters.map((character, index) => 
                <span 
                    key       = {`${character}_${index}`}
                    className = {styles.character}
                    style     = {{
                        top: `${characterPositions[index]}vh`                        
                    }}
                >
                    {character}
                </span>
            )}

            <div 
                className = {styles.hitbox}
                style     = {{
                    height: hitboxSize,
                    width : hitboxSize,
                    top   : mousePosition.y - (hitboxSize / 2),
                    left  : mousePosition.x - (hitboxSize / 2)
                }}
            ></div>
        </div>
    );
}

export default App;
