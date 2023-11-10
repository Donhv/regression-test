module.exports = async () => {
  const SCROLL_TOP_MAX = 100;

  await new Promise((resolve) => {
    const timer = setInterval(() => {
      if (!window.visualTestScrollingBottom) {
        clearInterval(timer);
        resolve();
        return;
      }
    }, 100);
  });

  await new Promise((resolve) => {
    let counter = 0;
    const timer = setInterval(() => {
      if (window.scrollY === 0 || counter > SCROLL_TOP_MAX) {
        clearInterval(timer);
        resolve();
        return;
      }

      counter++;
      window.scrollTo(0, 0);
    }, 100);
  });
};
