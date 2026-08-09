const STYLE_ID = "ui-datatable-styles";
import { showPopconfirm } from "./ui-popconfirm.js";

function ensureDatatableStyles(): void {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    .ui-dt-toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      flex-wrap: wrap;
      margin-bottom: 0.75rem;
    }

    .ui-dt-search {
      flex: 1;
      min-width: 180px;
      max-width: 320px;
      padding: 0.35rem 0.65rem;
      border: 1px solid var(--pico-border-color, #ccc);
      border-radius: 0.375rem;
      font-size: 0.875rem;
      background: var(--pico-background-color, #fff);
      color: inherit;
    }

    .ui-dt-info {
      font-size: 0.8rem;
      color: var(--pico-muted-color, #666);
      white-space: nowrap;
    }

    .ui-dt-table-wrap { overflow-x: auto; }

    .ui-dt-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.9rem;
    }

    .ui-dt-table th {
      text-align: left;
      padding: 0.5rem 0.75rem;
      border-bottom: 2px solid var(--pico-border-color, #ddd);
      white-space: nowrap;
      cursor: pointer;
      user-select: none;
    }

    .ui-dt-table th:last-child { cursor: default; }

    .ui-dt-table th .ui-dt-sort { margin-left: 0.3rem; opacity: 0.4; font-size: 0.75rem; }
    .ui-dt-table th.sorted-asc .ui-dt-sort,
    .ui-dt-table th.sorted-desc .ui-dt-sort { opacity: 1; }

    .ui-dt-table td {
      padding: 0.45rem 0.75rem;
      border-bottom: 1px solid var(--pico-border-color, #eee);
      vertical-align: middle;
    }

    .ui-dt-table td.truncate {
      max-width: 160px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .ui-dt-table tr:last-child td { border-bottom: none; }

    .ui-dt-pagination {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 0.4rem;
      margin-top: 0.75rem;
      flex-wrap: wrap;
    }

    .ui-dt-page-btn {
      padding: 0.25rem 0.6rem;
      font-size: 0.8rem;
      border: 1px solid var(--pico-border-color, #ccc);
      border-radius: 0.25rem;
      background: transparent;
      cursor: pointer;
      color: inherit;
    }

    .ui-dt-page-btn:disabled { opacity: 0.4; cursor: default; }
    .ui-dt-page-btn.active {
      background: var(--pico-primary, #2563eb);
      color: #fff;
      border-color: var(--pico-primary, #2563eb);
    }

    .ui-dt-empty {
      padding: 1.5rem;
      text-align: center;
      color: var(--pico-muted-color, #888);
      font-size: 0.9rem;
    }

    .ui-dt-action-btn {
      padding: 0.2rem 0.55rem;
      font-size: 0.78rem;
      border-radius: 0.25rem;
      border: 1px solid transparent;
      cursor: pointer;
      white-space: nowrap;
    }
  `;
  document.head.appendChild(style);
}

export interface DtColumn {
  key: string;
  label: string;
  truncate?: boolean;
  render?: (value: unknown, row: Record<string, unknown>) => string;
}

export interface DtAction {
  label: string;
  className: string;
  confirm?: string;
  dataAttrs?: (row: Record<string, unknown>) => string;
}

export interface DtOptions {
  columns: DtColumn[];
  actions?: DtAction[];
  pageSize?: number;
  searchable?: boolean;
  emptyText?: string;
}

class UiDatatable extends HTMLElement {
  private _data: Record<string, unknown>[] = [];
  private _filtered: Record<string, unknown>[] = [];
  private _page = 1;
  private _pageSize = 10;
  private _sortKey = "";
  private _sortDir: "asc" | "desc" = "asc";
  private _columns: DtColumn[] = [];
  private _actions: DtAction[] = [];
  private _searchable = true;
  private _emptyText = "No records found.";

  connectedCallback(): void {
    ensureDatatableStyles();
  }

  setOptions(options: DtOptions): void {
    this._columns = options.columns;
    this._actions = options.actions ?? [];
    this._pageSize = options.pageSize ?? 10;
    this._searchable = options.searchable ?? true;
    this._emptyText = options.emptyText ?? "No records found.";
  }

  setData(data: Record<string, unknown>[]): void {
    this._data = data;
    this._filtered = [...data];
    this._page = 1;
    this._render();
  }

  private _applySearch(query: string): void {
    const q = query.toLowerCase();
    this._filtered = q
      ? this._data.filter((row) =>
          this._columns.some((col) => String(row[col.key] ?? "").toLowerCase().includes(q))
        )
      : [...this._data];
    this._page = 1;
    this._renderBody();
    this._renderPagination();
    this._renderInfo();
  }

  private _applySort(key: string): void {
    if (this._sortKey === key) {
      this._sortDir = this._sortDir === "asc" ? "desc" : "asc";
    } else {
      this._sortKey = key;
      this._sortDir = "asc";
    }
    this._filtered.sort((a, b) => {
      const av = String(a[key] ?? "").toLowerCase();
      const bv = String(b[key] ?? "").toLowerCase();
      return this._sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
    });
    this._page = 1;
    this._renderBody();
    this._renderPagination();
    this._updateSortHeaders();
  }

  private _pageData(): Record<string, unknown>[] {
    const start = (this._page - 1) * this._pageSize;
    return this._filtered.slice(start, start + this._pageSize);
  }

  private _totalPages(): number {
    return Math.max(1, Math.ceil(this._filtered.length / this._pageSize));
  }

  private _render(): void {
    this.innerHTML = `
      <div class="ui-dt-toolbar">
        ${this._searchable ? `<input class="ui-dt-search" type="search" placeholder="Search…" aria-label="Search" />` : "<span></span>"}
        <span class="ui-dt-info"></span>
      </div>
      <div class="ui-dt-table-wrap">
        <table class="ui-dt-table">
          <thead><tr>${this._renderHeaders()}</tr></thead>
          <tbody class="ui-dt-tbody"></tbody>
        </table>
      </div>
      <div class="ui-dt-pagination"></div>
    `;

    this._renderBody();
    this._renderPagination();
    this._renderInfo();
    this._bindEvents();
  }

  private _renderHeaders(): string {
    const cols = this._columns.map((col) => {
      const isSorted = this._sortKey === col.key;
      const cls = isSorted ? `sorted-${this._sortDir}` : "";
      const arrow = this._sortDir === "asc" ? "▲" : "▼";
      return `<th data-sort="${col.key}" class="${cls}">${col.label}<span class="ui-dt-sort">${arrow}</span></th>`;
    });
    if (this._actions.length) cols.push("<th>Actions</th>");
    return cols.join("");
  }

  private _renderBody(): void {
    const tbody = this.querySelector<HTMLElement>(".ui-dt-tbody");
    if (!tbody) return;

    const rows = this._pageData();
    if (!rows.length) {
      tbody.innerHTML = `<tr><td colspan="${this._columns.length + (this._actions.length ? 1 : 0)}" class="ui-dt-empty">${this._emptyText}</td></tr>`;
      return;
    }

    tbody.innerHTML = rows.map((row) => {
      const cells = this._columns.map((col) => {
        const raw = row[col.key];
        const content = col.render ? col.render(raw, row) : escapeHtml(String(raw ?? "—"));
        const cls = col.truncate ? ` class="truncate" title="${escapeHtml(String(raw ?? ""))}"` : "";
        return `<td${cls}>${content}</td>`;
      });

      if (this._actions.length) {
        const btns = this._actions.map((action) => {
          const attrs = action.dataAttrs ? action.dataAttrs(row) : "";
          const confirmAttr = action.confirm ? ` data-confirm="${action.confirm}"` : "";
          return `<button type="button" class="ui-dt-action-btn ${action.className}"${confirmAttr} ${attrs}>${action.label}</button>`;
        });
        cells.push(`<td><div style="display:flex;gap:0.3rem;flex-wrap:wrap">${btns.join("")}</div></td>`);
      }

      return `<tr>${cells.join("")}</tr>`;
    }).join("");
  }

  private _renderPagination(): void {
    const container = this.querySelector<HTMLElement>(".ui-dt-pagination");
    if (!container) return;

    const total = this._totalPages();
    if (total <= 1) { container.innerHTML = ""; return; }

    const pages = Array.from({ length: total }, (_, i) => i + 1).map((p) =>
      `<button type="button" class="ui-dt-page-btn${p === this._page ? " active" : ""}" data-page="${p}">${p}</button>`
    );

    container.innerHTML = `
      <button type="button" class="ui-dt-page-btn" data-page="${this._page - 1}" ${this._page === 1 ? "disabled" : ""}>‹</button>
      ${pages.join("")}
      <button type="button" class="ui-dt-page-btn" data-page="${this._page + 1}" ${this._page === total ? "disabled" : ""}>›</button>
    `;
  }

  private _renderInfo(): void {
    const el = this.querySelector<HTMLElement>(".ui-dt-info");
    if (!el) return;
    const start = this._filtered.length ? (this._page - 1) * this._pageSize + 1 : 0;
    const end = Math.min(this._page * this._pageSize, this._filtered.length);
    el.textContent = `${start}–${end} of ${this._filtered.length}`;
  }

  private _updateSortHeaders(): void {
    this.querySelectorAll<HTMLElement>("th[data-sort]").forEach((th) => {
      const key = th.dataset.sort ?? "";
      th.className = this._sortKey === key ? `sorted-${this._sortDir}` : "";
      const arrow = th.querySelector(".ui-dt-sort");
      if (arrow) arrow.textContent = this._sortDir === "asc" ? "▲" : "▼";
    });
  }

  private _bindEvents(): void {
    this.querySelector<HTMLInputElement>(".ui-dt-search")?.addEventListener("input", (e) => {
      this._applySearch((e.target as HTMLInputElement).value);
    });

    this.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;

      // Intercept buttons with data-confirm before they bubble to page listeners
      const confirmBtn = target.closest<HTMLButtonElement>("button[data-confirm]");
      if (confirmBtn) {
        e.stopPropagation();
        const message = confirmBtn.dataset.confirm;
        showPopconfirm(confirmBtn, {
          message,
          onConfirm: () => confirmBtn.dispatchEvent(new MouseEvent("click", { bubbles: true })),
        });
        return;
      }

      const th = target.closest<HTMLElement>("th[data-sort]");
      if (th?.dataset.sort) { this._applySort(th.dataset.sort); return; }

      const btn = target.closest<HTMLButtonElement>(".ui-dt-page-btn");
      if (btn && !btn.disabled) {
        const p = parseInt(btn.dataset.page ?? "1", 10);
        if (p >= 1 && p <= this._totalPages()) {
          this._page = p;
          this._renderBody();
          this._renderPagination();
          this._renderInfo();
        }
      }
    });
  }
}

function escapeHtml(value: string): string {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

customElements.define("ui-datatable", UiDatatable);
export { UiDatatable };
export {};
