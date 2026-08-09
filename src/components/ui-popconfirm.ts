const STYLE_ID = "ui-popconfirm-styles";

function ensurePopconfirmStyles(): void {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    .ui-popconfirm {
      position: fixed;
      z-index: 500;
      background: var(--pico-card-background-color, #fff);
      border: 1px solid var(--pico-border-color, #ddd);
      border-radius: 0.5rem;
      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
      padding: 0.85rem 1rem;
      min-width: 200px;
      max-width: 260px;
      animation: ui-pop-in 0.12s ease;
    }

    @keyframes ui-pop-in {
      from { opacity: 0; transform: scale(0.95); }
      to   { opacity: 1; transform: scale(1); }
    }

    .ui-popconfirm-message {
      font-size: 0.875rem;
      margin-bottom: 0.65rem;
      color: var(--pico-color, inherit);
    }

    .ui-popconfirm-actions {
      display: flex;
      gap: 0.4rem;
      justify-content: flex-end;
    }

    .ui-popconfirm-btn {
      padding: 0.25rem 0.7rem;
      font-size: 0.8rem;
      border-radius: 0.25rem;
      border: 1px solid transparent;
      cursor: pointer;
      white-space: nowrap;
    }

    .ui-popconfirm-cancel {
      background: transparent;
      border-color: var(--pico-border-color, #ccc);
      color: inherit;
    }

    .ui-popconfirm-confirm {
      background: var(--pico-del-color, #e53e3e);
      color: #fff;
      border-color: transparent;
    }
  `;
  document.head.appendChild(style);
}

interface PopconfirmOptions {
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
}

let _activePopconfirm: HTMLElement | null = null;

function closeActive(): void {
  _activePopconfirm?.remove();
  _activePopconfirm = null;
}

export function showPopconfirm(anchor: HTMLElement, options: PopconfirmOptions): void {
  ensurePopconfirmStyles();
  closeActive();

  const {
    message = "Are you sure?",
    confirmText = "Delete",
    cancelText = "Cancel",
    onConfirm,
  } = options;

  const pop = document.createElement("div");
  pop.className = "ui-popconfirm";
  pop.setAttribute("role", "dialog");
  pop.setAttribute("aria-modal", "false");
  pop.innerHTML = `
    <p class="ui-popconfirm-message">${message}</p>
    <div class="ui-popconfirm-actions">
      <button type="button" class="ui-popconfirm-btn ui-popconfirm-cancel">${cancelText}</button>
      <button type="button" class="ui-popconfirm-btn ui-popconfirm-confirm">${confirmText}</button>
    </div>
  `;

  document.body.appendChild(pop);
  _activePopconfirm = pop;

  // Position anchored to the trigger button
  const rect = anchor.getBoundingClientRect();
  const popH = 100; // estimated height before paint
  const spaceBelow = window.innerHeight - rect.bottom;
  const top = spaceBelow > popH ? rect.bottom + 6 : rect.top - popH - 6;
  const left = Math.min(rect.left, window.innerWidth - 270);
  pop.style.top = `${top}px`;
  pop.style.left = `${Math.max(8, left)}px`;

  pop.querySelector(".ui-popconfirm-confirm")?.addEventListener("click", () => {
    closeActive();
    onConfirm();
  });

  pop.querySelector(".ui-popconfirm-cancel")?.addEventListener("click", closeActive);

  // Close on outside click
  setTimeout(() => {
    document.addEventListener("click", _outsideHandler, { capture: true, once: true });
  }, 0);
}

function _outsideHandler(e: MouseEvent): void {
  if (_activePopconfirm && !_activePopconfirm.contains(e.target as Node)) {
    closeActive();
  }
}

export {};
