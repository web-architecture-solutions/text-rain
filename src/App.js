import { useEffect, useState } from "react";

import styles from "./App.module.css";

const string                    = "Hello World!";
const characters                = string.split("");
const defaultCharacterPositions = new Array(characters.length).fill(0);

function App () {
    const [
        characterPositions, 
        setCharacterPositions
    ] = useState(defaultCharacterPositions);

    useEffect(() => {
        const interval = setInterval(() => {
            const newCharacterPositions = [...characterPositions];
            const newCharacterPosition = newCharacterPositions[0] >= 100
                ? (newCharacterPositions[0] % 100) - 3
                : newCharacterPositions[0] + 0.1;
            newCharacterPositions[0] = newCharacterPosition;
            setCharacterPositions(newCharacterPositions);
        }, 10);
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
