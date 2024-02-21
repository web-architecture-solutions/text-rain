import { useRef } from "react";

import Character from "../Character/Character";

import useCharacterBoundingBoxes from "../../hooks/useCharacterBoundingBoxes";

import text from '../../text.json';

import styles from "./App.module.css";

const characters  = text.split("");

function App () {
    function addToCharactersRef (element) {
        if (!charactersRef.current.includes(element)) {
            charactersRef.current.push(element);
        }
    }

    const textRef       = useRef("");
    const charactersRef = useRef([]);
    const boundingBoxes = useCharacterBoundingBoxes(textRef, charactersRef);

    return (
        <div className={styles.App}>
            <section></section>

            <section>
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
            </section>

            <section></section>
        </div>
    );
}

export default App;
