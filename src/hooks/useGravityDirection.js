import { useEffect, useState } from "react";

import { Direction } from "../enums";

import useScrollTop from "./useScrollTop";

export default function useGravityDirection () {
    const { scrollDirection } = useScrollTop();

    const [gravityDirection, setGravityDirection] = useState(Direction.DOWN);

    useEffect(() => {
        setGravityDirection((gravityDirection) => {
            return scrollDirection === 1 
                ? Direction.UP 
                : scrollDirection === -1 
                ? Direction.DOWN 
                : gravityDirection
        });
    }, [scrollDirection]);

    return gravityDirection;
}