export function generateRandomNumber (min, max) {
    return Math.random() * (max - min) + min;
}

export function initializeCharacterMasses (n, maxMass, minMass) {
    return new Array(n)
        .fill(null)
        .map(() => generateRandomNumber(minMass, 1) * maxMass);
}