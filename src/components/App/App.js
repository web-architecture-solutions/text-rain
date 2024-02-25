import { useRef } from "react";

import GravityArrow from "../GravityArrow/GravityArrow";
import Character    from "../Character/Character";

import useCharacterBoundingBoxes from "../../hooks/useCharacterBoundingBoxes";

import { initializeCharacterMasses } from "../../util";

import { maxMass, minMass } from "../../config";

import text from '../../text.json';

import styles from "./App.module.css"

const characters = text.split("");
const masses     = initializeCharacterMasses(text.length, maxMass, minMass);

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
    } = useCharacterBoundingBoxes(textRef, charactersRef, masses);

    const maxGeneratedMass = Math.max(
        ...boundingBoxes.map((boundingBox) => boundingBox?.mass)
    );

    return (
        <div className={styles.App}>
            <section className={styles.cover}>
                As above, so below &#129107;
            </section>

            <section>
                <GravityArrow gravityDirection={gravityDirection} />

                <p className={styles.text} ref={textRef}>
                    {characters.map((character, index) => 
                        <Character 
                            value     = {character}
                            key       = {`${character}_${index}`}
                            top       = {boundingBoxes[index]?.y}
                            mass      = {boundingBoxes[index]?.mass}
                            maxMass   = {maxGeneratedMass}
                            distance  = {boundingBoxes[index]?.distance}
                            ref       = {addToCharactersRef}
                        /> 
                    )}
                </p>
            </section>

            <section className={styles.cover}>
                As below, so above &#129105;   
            </section>
        </div>
    );
}

export default App;
