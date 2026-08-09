const STYLE_ID = "ui-multiselect-styles";

function ensureStyles(): void {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    ui-multiselect {
      display: block;
      position: relative;
    }

    .ums-control {
      display: flex;
      flex-wrap: wrap;
      gap: 0.35rem;
      align-items: center;
      min-height: 2.5rem;
      padding: 0.35rem 0.75rem;
      border: var(--pico-border-width, 1px) solid var(--pico-border-color, #e5e7eb);
      border-radius: var(--pico-border-radius, 0.375rem);
      background: var(--pico-background-color, #fff);
      cursor: text;
    }

    .ums-control:focus-within {
      border-color: var(--pico-primary, #2563eb);
      box-shadow: 0 0 0 2px rgba(37,99,235,0.15);
    }

    .ums-chip {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.15rem 0.5rem;
      border-radius: 999px;
      background: var(--pico-primary, #2563eb);
      color: #fff;
      font-size: 0.8rem;
    }

    .ums-chip-remove {
      background: none;
      border: none;
      color: inherit;
      cursor: pointer;
      padding: 0;
      font-size: 0.75rem;
      line-height: 1;
      box-shadow: none;
      margin: 0;
    }

    .ums-input {
      border: none !important;
      outline: none !important;
      background: transparent !important;
      padding: 0 !important;
      margin: 0 !important;
      min-width: 80px;
      flex: 1;
      box-shadow: none !important;
    }

    .ums-dropdown {
      display: none;
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      right: 0;
      background: var(--pico-card-background-color, #fff);
      border: 1px solid var(--pico-border-color, #e5e7eb);
      border-radius: 0.375rem;
      box-shadow: 0 8px 24px rgba(0,0,0,0.1);
      z-index: 50;
      max-height: 200px;
      overflow-y: auto;
    }

    .ums-dropdown.is-open { display: block; }

    .ums-option {
      padding: 0.5rem 0.75rem;
      cursor: pointer;
      font-size: 0.9rem;
    }

    .ums-option:hover { background: rgba(0,0,0,0.05); }
    .ums-option.selected { font-weight: 600; color: var(--pico-primary, #2563eb); }
    .ums-option.hidden { display: none; }

    .ums-empty {
      padding: 0.5rem 0.75rem;
      color: var(--pico-muted-color, #6b7280);
      font-size: 0.85rem;
    }
  `;
  document.head.appendChild(style);
}

class UiMultiselect extends HTMLElement {
  private _selected: string[] = [];

  static get observedAttributes() {
    return ["options", "value", "placeholder"];
  }

  get value(): string[] { return [...this._selected]; }

  connectedCallback(): void {
    ensureStyles();
    this.render();
  }

  private getOptions(): string[] {
    try { return JSON.parse(this.getAttribute("options") ?? "[]"); }
    catch { return []; }
  }

  private render(): void {
    const placeholder = this.getAttribute("placeholder") ?? "Select...";
    const name = this.getAttribute("name") ?? "";

    this.innerHTML = `
      <div class="ums-control">
        <span class="ums-chips"></span>
        <input class="ums-input" type="text" placeholder="${placeholder}" autocomplete="off" />
      </div>
      <div class="ums-dropdown"></div>
      <input type="hidden" name="${name}" class="ums-hidden" />
    `;

    this.renderChips();
    this.renderDropdown();
    this.bindEvents();
  }

  private renderChips(): void {
    const chips = this.querySelector(".ums-chips")!;
    chips.innerHTML = this._selected.map(v => `
      <span class="ums-chip">
        ${v}
        <button type="button" class="ums-chip-remove" data-value="${v}" aria-label="Remove ${v}">✕</button>
      </span>
    `).join("");

    chips.querySelectorAll(".ums-chip-remove").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.deselect((btn as HTMLElement).dataset.value!);
      });
    });
  }

  private renderDropdown(filter = ""): void {
    const dropdown = this.querySelector(".ums-dropdown")!;
    const options = this.getOptions().filter(o =>
      o.toLowerCase().includes(filter.toLowerCase())
    );

    if (options.length === 0) {
      dropdown.innerHTML = `<div class="ums-empty">No options</div>`;
      return;
    }

    dropdown.innerHTML = options.map(o => `
      <div class="ums-option ${this._selected.includes(o) ? "selected" : ""}" data-value="${o}">${o}</div>
    `).join("");

    dropdown.querySelectorAll(".ums-option").forEach(opt => {
      opt.addEventListener("click", () => {
        const val = (opt as HTMLElement).dataset.value!;
        this._selected.includes(val) ? this.deselect(val) : this.select(val);
      });
    });
  }

  private bindEvents(): void {
    const input = this.querySelector<HTMLInputElement>(".ums-input")!;
    const dropdown = this.querySelector(".ums-dropdown")!;

    input.addEventListener("focus", () => {
      dropdown.classList.add("is-open");
      this.renderDropdown(input.value);
    });

    input.addEventListener("input", () => this.renderDropdown(input.value));

    document.addEventListener("click", (e) => {
      if (!this.contains(e.target as Node)) dropdown.classList.remove("is-open");
    });
  }

  private select(value: string): void {
    if (!this._selected.includes(value)) {
      this._selected.push(value);
      this.syncHidden();
      this.renderChips();
      this.renderDropdown((this.querySelector<HTMLInputElement>(".ums-input")?.value ?? ""));
      this.dispatchEvent(new CustomEvent("change", { detail: this._selected }));
    }
  }

  private deselect(value: string): void {
    this._selected = this._selected.filter(v => v !== value);
    this.syncHidden();
    this.renderChips();
    this.renderDropdown((this.querySelector<HTMLInputElement>(".ums-input")?.value ?? ""));
    this.dispatchEvent(new CustomEvent("change", { detail: this._selected }));
  }

  private syncHidden(): void {
    const hidden = this.querySelector<HTMLInputElement>(".ums-hidden");
    if (hidden) hidden.value = this._selected.join(",");
  }
}

customElements.define("ui-multiselect", UiMultiselect);

export type { UiMultiselect };
