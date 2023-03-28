export const delay = millis => new Promise((resolve) => {
    setTimeout(_ => resolve(null), millis)
});
