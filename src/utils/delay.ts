export const delay = (millis) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(null), millis);
  });
