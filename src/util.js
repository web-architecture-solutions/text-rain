export function generateRandomNumber (min, max) {
    return Math.random() * (max - min) + min;
}

export function initializeLocalSpeeds (n, maxSpeed, minSpeed) {
    return new Array(n)
        .fill(null)
        .map(() => generateRandomNumber(minSpeed, 1) * maxSpeed);
}