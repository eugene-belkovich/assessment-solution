export const delay = millis => new Promise((resolve, reject) => {
    setTimeout(_ => resolve(null), millis)
});
