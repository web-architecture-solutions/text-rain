import { useEffect, useState } from "react";

import styles from "./App.module.css";

const speed                     = 0.01;
const string                    = "Hello World!";
const characters                = string.split("");
const defaultCharacterPositions = new Array(characters.length).fill(0);
const speeds                    = defaultCharacterPositions.map(() => Math.random() * speed);

function App () {
    const [
        characterPositions, 
        setCharacterPositions
    ] = useState(defaultCharacterPositions);

    useEffect(() => {
        const interval = setInterval(() => {
            const newCharacterPositions = characterPositions
                .map((characterPosition, index) => {
                    return characterPosition >= 100
                        ? (characterPosition % 100) - 3
                        : characterPosition + speeds[index];
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
        </div>
    );
}

export default App;
