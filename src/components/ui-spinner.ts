const STYLE_ID = "ui-spinner-styles";

function ensureSpinnerStyles(): void {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    ui-spinner {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 200;
      align-items: center;
      justify-content: center;
      background: var(--ui-spinner-bg, rgba(0, 0, 0, 0.55));
    }

    ui-spinner[visible] {
      display: flex;
    }

    .ui-spinner-ring {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      border: 4px solid rgba(255, 255, 255, 0.25);
      border-top-color: var(--ui-spinner-color, var(--pico-primary, #2563eb));
      animation: ui-spinner-spin 0.75s linear infinite;
    }

    @keyframes ui-spinner-spin {
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}

class UiSpinner extends HTMLElement {
  private _shownAt = 0;

  static get observedAttributes() {
    return ["bg", "color"];
  }

  connectedCallback(): void {
    ensureSpinnerStyles();
    if (!this.querySelector(".ui-spinner-ring")) {
      this.innerHTML = `<div class="ui-spinner-ring" role="status" aria-label="Loading"></div>`;
    }
    this._applyVars();
  }

  attributeChangedCallback(): void {
    if (this.isConnected) this._applyVars();
  }

  private _applyVars(): void {
    const bg = this.getAttribute("bg");
    const color = this.getAttribute("color");
    if (bg) this.style.setProperty("--ui-spinner-bg", bg);
    if (color) this.style.setProperty("--ui-spinner-color", color);
  }

  show(): void {
    this._shownAt = Date.now();
    this.setAttribute("visible", "");
  }

  hide(): void {
    const duration = parseInt(this.getAttribute("duration") ?? "1000", 10);
    const elapsed = Date.now() - this._shownAt;
    const remaining = duration - elapsed;
    if (remaining > 0) {
      setTimeout(() => this.removeAttribute("visible"), remaining);
    } else {
      this.removeAttribute("visible");
    }
  }
}

customElements.define("ui-spinner", UiSpinner);
export {};
