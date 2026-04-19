(function () {
  let tsLoaded = false;
  let tsLoading = false;
  const pending = [];

  function loadTS(cb) {
    if (tsLoaded) {
      cb(null);
      return;
    }
    pending.push(cb);
    if (tsLoading) return;
    tsLoading = true;
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/typescript@5.3.3/lib/typescript.js";
    s.onload = () => {
      tsLoaded = true;
      pending.splice(0).forEach((fn) => fn(null));
    };
    s.onerror = () => {
      tsLoading = false;
      const err = new Error("Could not load TypeScript compiler");
      pending.splice(0).forEach((fn) => fn(err));
    };
    document.head.appendChild(s);
  }

  function transpile(code) {
    return ts.transpileModule(code, {
      compilerOptions: {
        target: ts.ScriptTarget.ES2017,
        module: ts.ModuleKind.None,
        removeComments: false,
        strict: false,
      },
    }).outputText;
  }

  function runInSandbox(jsCode, callback) {
    const sandboxHTML = `<!DOCTYPE html><html><body><script>
      var out = [];
      function fmt(a) {
        if (a === null) return 'null';
        if (a === undefined) return 'undefined';
        if (typeof a === 'object') { try { return JSON.stringify(a, null, 2); } catch(_) { return String(a); } }
        return String(a);
      }
      var capture = function(type) {
        return function() { out.push({ type: type, text: Array.prototype.map.call(arguments, fmt).join(' ') }); };
      };
      console.log = capture('log');
      console.info = capture('log');
      console.warn = capture('warn');
      console.error = capture('error');
      window.addEventListener('message', function(e) {
        if (e.data && e.data.type === 'run') {
          var s = document.createElement('script');
          s.textContent = '(function(){try{' + e.data.code + '}catch(e){out.push({type:"error",text:e.toString()});}parent.postMessage({type:"result",lines:out},"*");})();';
          document.body.appendChild(s);
        }
      });
      parent.postMessage({ type: 'ready' }, '*');
    <\/script></body></html>`;

    const iframe = document.createElement("iframe");
    iframe.setAttribute("sandbox", "allow-scripts");
    iframe.style.cssText = "display:none;width:0;height:0;border:0;";
    iframe.srcdoc = sandboxHTML;

    const timeout = setTimeout(() => {
      cleanup();
      callback([{ type: "error", text: "Execution timed out (5s)" }]);
    }, 5000);

    function cleanup() {
      clearTimeout(timeout);
      window.removeEventListener("message", handler);
      if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
    }

    function handler(e) {
      if (e.source !== iframe.contentWindow) return;
      if (e.data && e.data.type === "ready") {
        iframe.contentWindow.postMessage({ type: "run", code: jsCode }, "*");
      } else if (e.data && e.data.type === "result") {
        cleanup();
        callback(e.data.lines);
      }
    }

    window.addEventListener("message", handler);
    document.body.appendChild(iframe);
  }

  function createPlayground(codeEl) {
    const originalCode = codeEl.textContent.trimEnd();
    let compiledJS = null;

    // ── wrapper ──────────────────────────────────────────────────────────
    const wrap = document.createElement("div");
    wrap.className = "ts-playground";

    // ── header ───────────────────────────────────────────────────────────
    const header = document.createElement("div");
    header.className = "ts-playground-header";

    const langIn = document.createElement("span");
    langIn.className = "ts-playground-lang";
    langIn.innerHTML = '<i class="fa-brands fa-js fa-xs"></i> TypeScript';

    const actions = document.createElement("div");
    actions.className = "ts-playground-actions";

    const resetBtn = document.createElement("button");
    resetBtn.className = "ts-btn ts-reset-btn";
    resetBtn.innerHTML = '<i class="fa-solid fa-rotate-left fa-xs"></i> Reset';
    resetBtn.title = "Reset to original code";

    const compileBtn = document.createElement("button");
    compileBtn.className = "ts-btn ts-compile-btn";
    compileBtn.innerHTML = '<i class="fa-solid fa-play fa-xs"></i> Compile';

    const runBtn = document.createElement("button");
    runBtn.className = "ts-btn ts-run-btn";
    runBtn.innerHTML = '<i class="fa-solid fa-terminal fa-xs"></i> Run';
    runBtn.disabled = true;
    runBtn.title = "Click Compile first";

    actions.appendChild(resetBtn);
    actions.appendChild(compileBtn);
    actions.appendChild(runBtn);

    const langOut = document.createElement("span");
    langOut.className = "ts-playground-lang ts-lang-right";
    langOut.innerHTML = '<i class="fa-brands fa-js fa-xs"></i> JavaScript';

    header.appendChild(langIn);
    header.appendChild(actions);
    header.appendChild(langOut);

    // ── editor / output panes ────────────────────────────────────────────
    const panes = document.createElement("div");
    panes.className = "ts-playground-panes";

    const inputPane = document.createElement("div");
    inputPane.className = "ts-pane ts-pane-input";
    const textarea = document.createElement("textarea");
    textarea.className = "ts-editor";
    textarea.spellcheck = false;
    textarea.setAttribute("autocomplete", "off");
    textarea.setAttribute("autocorrect", "off");
    textarea.setAttribute("autocapitalize", "off");
    textarea.value = originalCode;
    inputPane.appendChild(textarea);

    const outputPane = document.createElement("div");
    outputPane.className = "ts-pane ts-pane-output";
    const outputPre = document.createElement("pre");
    outputPre.className = "ts-output";
    const outputCode = document.createElement("code");
    outputCode.className = "ts-output-code";
    outputCode.textContent = "// compiled JavaScript will appear here";
    outputPre.appendChild(outputCode);
    outputPane.appendChild(outputPre);

    const dragHandle = document.createElement("div");
    dragHandle.className = "ts-drag-handle";
    dragHandle.title = "Drag to resize";

    panes.appendChild(inputPane);
    panes.appendChild(dragHandle);
    panes.appendChild(outputPane);

    // ── drag-to-resize ────────────────────────────────────────────────────
    dragHandle.addEventListener("mousedown", startDrag);
    dragHandle.addEventListener("touchstart", startDrag, { passive: false });

    let dragStartX, dragStartW, dragTotalW;

    function startDrag(e) {
      dragStartX = e.touches ? e.touches[0].clientX : e.clientX;
      dragTotalW = panes.getBoundingClientRect().width;
      dragStartW = inputPane.getBoundingClientRect().width;
      dragHandle.classList.add("ts-drag-active");
      document.addEventListener("mousemove", onDrag);
      document.addEventListener("mouseup", stopDrag);
      document.addEventListener("touchmove", onDrag, { passive: false });
      document.addEventListener("touchend", stopDrag);
      e.preventDefault();
    }

    function onDrag(e) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const delta = clientX - dragStartX;
      const handleW = dragHandle.offsetWidth;
      const usable = dragTotalW - handleW;
      const newW = Math.max(80, Math.min(usable - 80, dragStartW + delta));
      const pct = (newW / usable) * 100;
      inputPane.style.flex = `0 0 ${pct}%`;
      outputPane.style.flex = `0 0 ${100 - pct}%`;
      if (e.cancelable) e.preventDefault();
    }

    function stopDrag() {
      dragHandle.classList.remove("ts-drag-active");
      document.removeEventListener("mousemove", onDrag);
      document.removeEventListener("mouseup", stopDrag);
      document.removeEventListener("touchmove", onDrag);
      document.removeEventListener("touchend", stopDrag);
    }

    // ── console pane (full width, hidden until first run) ─────────────────
    const consolePane = document.createElement("div");
    consolePane.className = "ts-console";
    consolePane.style.display = "none";

    const consoleHeader = document.createElement("div");
    consoleHeader.className = "ts-console-header";
    consoleHeader.innerHTML = '<i class="fa-solid fa-terminal fa-xs"></i> Output';

    const consoleBody = document.createElement("div");
    consoleBody.className = "ts-console-body";

    consolePane.appendChild(consoleHeader);
    consolePane.appendChild(consoleBody);

    // ── vertical resize handle ────────────────────────────────────────────
    const vertHandle = document.createElement("div");
    vertHandle.className = "ts-vert-handle";
    vertHandle.title = "Drag to resize";

    wrap.appendChild(header);
    wrap.appendChild(panes);
    wrap.appendChild(vertHandle);
    wrap.appendChild(consolePane);

    let manualHeight = 0;

    // ── auto-resize ───────────────────────────────────────────────────────
    function syncHeight() {
      textarea.style.height = "auto";
      textarea.style.height = Math.max(manualHeight, textarea.scrollHeight) + "px";
      outputPre.style.minHeight = textarea.style.height;
    }

    vertHandle.addEventListener("mousedown", startVertDrag);
    vertHandle.addEventListener("touchstart", startVertDrag, { passive: false });

    let vertStartY, vertStartH;

    function startVertDrag(e) {
      vertStartY = e.touches ? e.touches[0].clientY : e.clientY;
      vertStartH = textarea.getBoundingClientRect().height;
      vertHandle.classList.add("ts-drag-active");
      document.addEventListener("mousemove", onVertDrag);
      document.addEventListener("mouseup", stopVertDrag);
      document.addEventListener("touchmove", onVertDrag, { passive: false });
      document.addEventListener("touchend", stopVertDrag);
      e.preventDefault();
    }

    function onVertDrag(e) {
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      manualHeight = Math.max(80, vertStartH + (clientY - vertStartY));
      syncHeight();
      if (e.cancelable) e.preventDefault();
    }

    function stopVertDrag() {
      vertHandle.classList.remove("ts-drag-active");
      document.removeEventListener("mousemove", onVertDrag);
      document.removeEventListener("mouseup", stopVertDrag);
      document.removeEventListener("touchmove", onVertDrag);
      document.removeEventListener("touchend", stopVertDrag);
    }
    textarea.addEventListener("input", () => {
      compiledJS = null;
      runBtn.disabled = true;
      syncHeight();
    });
    setTimeout(syncHeight, 0);

    // ── tab key ───────────────────────────────────────────────────────────
    textarea.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const s = textarea.selectionStart;
        textarea.value = textarea.value.slice(0, s) + "  " + textarea.value.slice(textarea.selectionEnd);
        textarea.selectionStart = textarea.selectionEnd = s + 2;
      }
    });

    // ── reset ─────────────────────────────────────────────────────────────
    resetBtn.addEventListener("click", () => {
      textarea.value = originalCode;
      outputCode.textContent = "// compiled JavaScript will appear here";
      outputPane.classList.remove("ts-has-output", "ts-has-error");
      consolePane.style.display = "none";
      consoleBody.innerHTML = "";
      compiledJS = null;
      runBtn.disabled = true;
      syncHeight();
    });

    // ── compile ───────────────────────────────────────────────────────────
    compileBtn.addEventListener("click", () => {
      compileBtn.disabled = true;
      compileBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin fa-xs"></i> Loading...';

      loadTS((err) => {
        if (err) {
          outputCode.textContent = "// Error: " + err.message;
          outputPane.classList.add("ts-has-error");
          compileBtn.innerHTML = '<i class="fa-solid fa-play fa-xs"></i> Compile';
          compileBtn.disabled = false;
          return;
        }
        try {
          compiledJS = transpile(textarea.value).trimEnd();
          outputCode.textContent = compiledJS;
          outputPane.classList.add("ts-has-output");
          outputPane.classList.remove("ts-has-error");
          outputPre.style.minHeight = textarea.style.height;
          runBtn.disabled = false;
          runBtn.title = "Run the compiled JavaScript";
          compileBtn.innerHTML = '<i class="fa-solid fa-check fa-xs"></i> Done';
          setTimeout(() => {
            compileBtn.innerHTML = '<i class="fa-solid fa-play fa-xs"></i> Compile';
            compileBtn.disabled = false;
          }, 1500);
        } catch (e) {
          outputCode.textContent = "// Error: " + e.message;
          outputPane.classList.add("ts-has-error");
          outputPane.classList.remove("ts-has-output");
          compiledJS = null;
          runBtn.disabled = true;
          compileBtn.innerHTML = '<i class="fa-solid fa-play fa-xs"></i> Compile';
          compileBtn.disabled = false;
        }
      });
    });

    // ── run ───────────────────────────────────────────────────────────────
    runBtn.addEventListener("click", () => {
      if (!compiledJS) return;

      runBtn.disabled = true;
      runBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin fa-xs"></i> Running...';
      consoleBody.innerHTML = "";
      consolePane.style.display = "block";

      runInSandbox(compiledJS, (lines) => {
        runBtn.innerHTML = '<i class="fa-solid fa-terminal fa-xs"></i> Run';
        runBtn.disabled = false;

        consoleBody.innerHTML = "";
        if (lines.length === 0) {
          const empty = document.createElement("div");
          empty.className = "ts-console-line ts-console-empty";
          empty.textContent = "// no output";
          consoleBody.appendChild(empty);
        } else {
          lines.forEach(({ type, text }) => {
            const line = document.createElement("div");
            line.className = "ts-console-line ts-console-" + type;
            const prefix = document.createElement("span");
            prefix.className = "ts-console-prefix";
            prefix.textContent = type === "error" ? "✖" : type === "warn" ? "⚠" : "›";
            const content = document.createElement("span");
            content.textContent = text;
            line.appendChild(prefix);
            line.appendChild(content);
            consoleBody.appendChild(line);
          });
        }
      });
    });

    // ── inject after code block ───────────────────────────────────────────
    const container =
      codeEl.closest(".language-typescript") || codeEl.closest(".highlighter-rouge") || codeEl.closest("figure.highlight") || codeEl.closest("pre");
    if (container && container.parentNode) {
      container.parentNode.insertBefore(wrap, container.nextSibling);
    }
  }

  function init() {
    document.querySelectorAll(".language-typescript code").forEach(createPlayground);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
