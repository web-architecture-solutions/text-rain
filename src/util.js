export function generateRandomNumber (min, max) {
    return Math.random() * (max - min) + min;
}

export function initializeLocalSpeeds (length, speedFloor, globalSpeed) {
    return new Array(length)
        .fill(null)
        .map(() => generateRandomNumber(speedFloor, 1) * globalSpeed);
}