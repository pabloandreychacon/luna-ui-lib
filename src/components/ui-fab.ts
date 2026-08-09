const STYLE_ID = "ui-fab-styles";

function ensureStyles(): void {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    ui-fab {
      position: fixed;
      z-index: 100;
      display: block;
    }

    ui-fab[position="bottom-right"] { bottom: 1.5rem; right: 1.5rem; }
    ui-fab[position="bottom-left"]  { bottom: 1.5rem; left: 1.5rem; }
    ui-fab[position="top-right"]    { top: 1.5rem; right: 1.5rem; }
    ui-fab[position="top-left"]     { top: 1.5rem; left: 1.5rem; }

    .ui-fab-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 3.25rem;
      height: 3.25rem;
      border-radius: 50%;
      border: none;
      cursor: pointer;
      font-size: 1.4rem;
      box-shadow: 0 4px 16px rgba(0,0,0,0.25);
      transition: opacity 0.2s, transform 0.2s, filter 0.15s;
      text-decoration: none;
      background: var(--ui-fab-bg, var(--pico-primary, #2563eb));
      color: var(--ui-fab-color, #fff);
    }

    .ui-fab-btn:hover {
      filter: brightness(1.12);
      box-shadow: 0 8px 24px rgba(0,0,0,0.3);
      color: var(--ui-fab-color, #fff);
    }

    /* scroll-triggered: hidden by default */
    ui-fab[scroll-trigger] .ui-fab-btn {
      opacity: 0;
      transform: translateY(1rem);
      pointer-events: none;
    }

    ui-fab[scroll-trigger] .ui-fab-btn.visible {
      opacity: 1;
      transform: translateY(0);
      pointer-events: all;
    }
  `;
  document.head.appendChild(style);
}

class UiFab extends HTMLElement {
  private _btn: HTMLButtonElement | HTMLAnchorElement | null = null;
  private _onScroll = () => this._handleScroll();

  static get observedAttributes() {
    return ["icon", "label", "href", "color", "bg", "position", "scroll-trigger", "scroll-threshold", "target"];
  }

  connectedCallback(): void {
    ensureStyles();
    // default position
    if (!this.hasAttribute("position")) this.setAttribute("position", "bottom-right");
    this._render();
    if (this.hasAttribute("scroll-trigger")) {
      window.addEventListener("scroll", this._onScroll, { passive: true });
    }
  }

  disconnectedCallback(): void {
    window.removeEventListener("scroll", this._onScroll);
  }

  attributeChangedCallback(): void {
    if (this.isConnected) this._render();
  }

  private _render(): void {
    const icon  = this.getAttribute("icon")  ?? "↑";
    const label = this.getAttribute("label") ?? "Action";
    const href  = this.getAttribute("href");
    const target = this.getAttribute("target");
    const bg    = this.getAttribute("bg");
    const color = this.getAttribute("color");

    const styleAttr = [
      bg    ? `--ui-fab-bg:${bg}`       : "",
      color ? `--ui-fab-color:${color}` : "",
    ].filter(Boolean).join(";");

    const tag = href ? "a" : "button";
    const extra = href
      ? `href="${href}"${target ? ` target="${target}"` : ""}`
      : `type="button"`;

    this.innerHTML = `
      <${tag} class="ui-fab-btn" ${extra} title="${label}" aria-label="${label}"
        ${styleAttr ? `style="${styleAttr}"` : ""}>
        ${icon}
      </${tag}>
    `;

    this._btn = this.querySelector(".ui-fab-btn");

    if (!href) {
      this._btn?.addEventListener("click", () => {
        this.dispatchEvent(new CustomEvent("fab-click", { bubbles: true }));
      });
    }
  }

  private _handleScroll(): void {
    const threshold = parseFloat(this.getAttribute("scroll-threshold") ?? "0.3");
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = total > 0 ? window.scrollY / total : 0;
    this._btn?.classList.toggle("visible", ratio > threshold);
  }
}

customElements.define("ui-fab", UiFab);
export {};
