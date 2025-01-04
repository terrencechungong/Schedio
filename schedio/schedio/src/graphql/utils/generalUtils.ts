export function waitForNSeconds(n) {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, n * 1000);
    });
}