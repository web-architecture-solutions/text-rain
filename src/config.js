import { Direction } from "./enums";

export const isAnimated      = true;
export const direction       = Direction.down; // Either up or down

export const maxSpeed        = 1.2;            // Default: 2
export const minSpeed        = 0.2;            // Default: 0.2
export const bleedMargin     = 3;              // Default: 3
export const framesPerSecond = 66.67;          // Default: 66.67
export const distanceEpsilon = 0.01;           // Default: 0.01