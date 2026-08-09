type ToastVariant = "success" | "error" | "warning" | "info";

const STYLE_ID = "ui-toast-styles";

function ensureStyles(): void {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    ui-toast {
      position: fixed;
      bottom: 1.5rem;
      right: 1.5rem;
      z-index: 1000;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      pointer-events: none;
    }

    .ui-toast-item {
      pointer-events: all;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;
      min-width: 220px;
      max-width: 360px;
      font-size: 0.9rem;
      box-shadow: 0 4px 16px rgba(0,0,0,0.18);
      animation: toast-in 0.2s ease;
      color: #fff;
    }

    .ui-toast-item.success { background: #16a34a; }
    .ui-toast-item.error   { background: #dc2626; }
    .ui-toast-item.warning { background: #d97706; }
    .ui-toast-item.info    { background: #2563eb; }

    .ui-toast-item.toast-out {
      animation: toast-out 0.2s ease forwards;
    }

    .ui-toast-close {
      margin-left: auto;
      background: none;
      border: none;
      color: inherit;
      cursor: pointer;
      font-size: 1rem;
      padding: 0;
      line-height: 1;
      box-shadow: none;
    }

    @keyframes toast-in {
      from { opacity: 0; transform: translateY(1rem); }
      to   { opacity: 1; transform: translateY(0); }
    }

    @keyframes toast-out {
      from { opacity: 1; transform: translateY(0); }
      to   { opacity: 0; transform: translateY(1rem); }
    }
  `;
  document.head.appendChild(style);
}

const ICONS: Record<ToastVariant, string> = {
  success: "✓",
  error: "✕",
  warning: "⚠",
  info: "ℹ",
};

class UiToast extends HTMLElement {
  connectedCallback(): void {
    ensureStyles();
  }

  show(message: string, variant: ToastVariant = "info", duration = 3500): void {
    const item = document.createElement("div");
    item.className = `ui-toast-item ${variant}`;
    item.innerHTML = `
      <span>${ICONS[variant]}</span>
      <span>${message}</span>
      <button class="ui-toast-close" aria-label="Close">✕</button>
    `;

    const close = () => {
      item.classList.add("toast-out");
      item.addEventListener("animationend", () => item.remove(), { once: true });
    };

    item.querySelector(".ui-toast-close")!.addEventListener("click", close);
    this.appendChild(item);

    if (duration > 0) setTimeout(close, duration);
  }
}

customElements.define("ui-toast", UiToast);

export type { UiToast };
