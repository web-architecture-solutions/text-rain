import { useRef } from "react";

import Character from "../Character/Character";

import useCharacterBoundingBoxes from "../../hooks/useCharacterBoundingBoxes";

import { Direction } from "../../enums";

import { initializeLocalSpeeds } from "../../util";

import { maxSpeed, minSpeed } from "../../config";

import text from '../../text.json';

import styles from "./App.module.css"

const characters  = text.split("");
const localSpeeds = initializeLocalSpeeds(text.length, maxSpeed, minSpeed);

function App () {
    function addToCharactersRef (element) {
        if (!charactersRef.current.includes(element)) {
            charactersRef.current.push(element);
        }
    }

    const textRef       = useRef("");
    const charactersRef = useRef([]);

    const { 
        boundingBoxes, 
        gravityDirection 
    } = useCharacterBoundingBoxes(textRef, charactersRef, localSpeeds);

    return (
        <div className={styles.App}>
            <section className={styles.cover}>
                Scroll Down
            </section>

            <section>
                {gravityDirection === Direction.DOWN ? (
                    <span className={styles.arrow}>&#129095;</span>
                ) : (
                    <span className={styles.arrow}>&#129093;</span>
                )}

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

            <section className={styles.cover}>
                Scroll Up
            </section>
        </div>
    );
}

export default App;
