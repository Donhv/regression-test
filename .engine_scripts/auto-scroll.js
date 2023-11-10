module.exports = async () => {
  const SCROLL_DISTANCE = 100;

  const scrollToBottom = async () => {
    window.visualTestScrollingBottom = true;
    let counter = 0;
    let lastScrollY = 0;
    await new Promise((resolve) => {
      const timer = setInterval(() => {
        if (window.innerHeight + Math.ceil(window.scrollY) >= document.body.offsetHeight || counter > 10) {
          // you're at the bottom of the page
          clearInterval(timer);
          window.visualTestScrollingBottom = false;
          resolve();
          return;
        }

        if (lastScrollY >= Math.ceil(window.scrollY)) {
          counter++;
        } else {
          lastScrollY = Math.ceil(window.scrollY);
          counter = 0;
        }

        window.scrollBy(0, SCROLL_DISTANCE);
      }, 100);
    });
  };

  const scrollToTop = async () => {
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
        if (window.scrollY === 0 || counter > 5) {
          clearInterval(timer);
          resolve();
          return;
        }

        counter++;
        window.scrollTo(0, 0);
      }, 100);
    });
  };

  await scrollToBottom();
  await scrollToTop();
};
