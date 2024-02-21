import { useEffect, useState } from "react";

import { Direction } from "../enums";

import useScrollTop from "./useScrollTop";

export default function useGravityDirection () {
    const { scrollDirection } = useScrollTop();

    const [gravityDirection, setGravityDirection] = useState(Direction.UP);

    useEffect(() => {
        setGravityDirection(
            scrollDirection === 1 
                ? Direction.UP 
                : scrollDirection === -1 
                ? Direction.DOWN 
                : gravityDirection
        );
    }, [scrollDirection]);

    return gravityDirection;
}