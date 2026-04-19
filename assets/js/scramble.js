(function () {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>[]{}|\\/-_:.;";
  const FRAME_MS = 35;

  function scrambleNode(textNode) {
    const original = textNode.textContent;
    if (!original.trim()) return;
    const len = original.length;
    const totalFrames = Math.max(16, len * 2);
    let frame = 0;

    const tick = setInterval(() => {
      frame++;
      const resolved = Math.floor((frame / totalFrames) * len);
      let out = "";
      for (let i = 0; i < len; i++) {
        const c = original[i];
        if (/\s/.test(c)) {
          out += c;
        } else if (i < resolved) {
          out += c;
        } else {
          out += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      textNode.textContent = out;
      if (frame >= totalFrames) {
        clearInterval(tick);
        textNode.textContent = original;
      }
    }, FRAME_MS);
  }

  function scrambleElement(el) {
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const nodes = [];
    let n;
    while ((n = walker.nextNode())) {
      if (n.textContent.trim()) nodes.push(n);
    }
    nodes.forEach(scrambleNode);
  }

  function init() {
    const targets = document.querySelectorAll("h1, h2, h3");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            scrambleElement(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    targets.forEach((el) => observer.observe(el));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
