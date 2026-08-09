//#region src/components/ui-popconfirm.ts
var e = "ui-popconfirm-styles";
function t() {
	if (document.getElementById(e)) return;
	let t = document.createElement("style");
	t.id = e, t.textContent = "\n    .ui-popconfirm {\n      position: fixed;\n      z-index: 500;\n      background: var(--pico-card-background-color, #fff);\n      border: 1px solid var(--pico-border-color, #ddd);\n      border-radius: 0.5rem;\n      box-shadow: 0 8px 24px rgba(0,0,0,0.15);\n      padding: 0.85rem 1rem;\n      min-width: 200px;\n      max-width: 260px;\n      animation: ui-pop-in 0.12s ease;\n    }\n\n    @keyframes ui-pop-in {\n      from { opacity: 0; transform: scale(0.95); }\n      to   { opacity: 1; transform: scale(1); }\n    }\n\n    .ui-popconfirm-message {\n      font-size: 0.875rem;\n      margin-bottom: 0.65rem;\n      color: var(--pico-color, inherit);\n    }\n\n    .ui-popconfirm-actions {\n      display: flex;\n      gap: 0.4rem;\n      justify-content: flex-end;\n    }\n\n    .ui-popconfirm-btn {\n      padding: 0.25rem 0.7rem;\n      font-size: 0.8rem;\n      border-radius: 0.25rem;\n      border: 1px solid transparent;\n      cursor: pointer;\n      white-space: nowrap;\n    }\n\n    .ui-popconfirm-cancel {\n      background: transparent;\n      border-color: var(--pico-border-color, #ccc);\n      color: inherit;\n    }\n\n    .ui-popconfirm-confirm {\n      background: var(--pico-del-color, #e53e3e);\n      color: #fff;\n      border-color: transparent;\n    }\n  ", document.head.appendChild(t);
}
var n = null;
function r() {
	n?.remove(), n = null;
}
function i(e, i) {
	t(), r();
	let { message: o = "Are you sure?", confirmText: s = "Delete", cancelText: c = "Cancel", onConfirm: l } = i, u = document.createElement("div");
	u.className = "ui-popconfirm", u.setAttribute("role", "dialog"), u.setAttribute("aria-modal", "false"), u.innerHTML = `
    <p class="ui-popconfirm-message">${o}</p>
    <div class="ui-popconfirm-actions">
      <button type="button" class="ui-popconfirm-btn ui-popconfirm-cancel">${c}</button>
      <button type="button" class="ui-popconfirm-btn ui-popconfirm-confirm">${s}</button>
    </div>
  `, document.body.appendChild(u), n = u;
	let d = e.getBoundingClientRect(), f = window.innerHeight - d.bottom > 100 ? d.bottom + 6 : d.top - 100 - 6, p = Math.min(d.left, window.innerWidth - 270);
	u.style.top = `${f}px`, u.style.left = `${Math.max(8, p)}px`, u.querySelector(".ui-popconfirm-confirm")?.addEventListener("click", () => {
		r(), l();
	}), u.querySelector(".ui-popconfirm-cancel")?.addEventListener("click", r), setTimeout(() => {
		document.addEventListener("click", a, {
			capture: !0,
			once: !0
		});
	}, 0);
}
function a(e) {
	n && !n.contains(e.target) && r();
}
//#endregion
//#region src/components/ui-datatable.ts
var o = "ui-datatable-styles";
function s() {
	if (document.getElementById(o)) return;
	let e = document.createElement("style");
	e.id = o, e.textContent = "\n    .ui-dt-toolbar {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      gap: 0.75rem;\n      flex-wrap: wrap;\n      margin-bottom: 0.75rem;\n    }\n\n    .ui-dt-search {\n      flex: 1;\n      min-width: 180px;\n      max-width: 320px;\n      padding: 0.35rem 0.65rem;\n      border: 1px solid var(--pico-border-color, #ccc);\n      border-radius: 0.375rem;\n      font-size: 0.875rem;\n      background: var(--pico-background-color, #fff);\n      color: inherit;\n    }\n\n    .ui-dt-info {\n      font-size: 0.8rem;\n      color: var(--pico-muted-color, #666);\n      white-space: nowrap;\n    }\n\n    .ui-dt-table-wrap { overflow-x: auto; }\n\n    .ui-dt-table {\n      width: 100%;\n      border-collapse: collapse;\n      font-size: 0.9rem;\n    }\n\n    .ui-dt-table th {\n      text-align: left;\n      padding: 0.5rem 0.75rem;\n      border-bottom: 2px solid var(--pico-border-color, #ddd);\n      white-space: nowrap;\n      cursor: pointer;\n      user-select: none;\n    }\n\n    .ui-dt-table th:last-child { cursor: default; }\n\n    .ui-dt-table th .ui-dt-sort { margin-left: 0.3rem; opacity: 0.4; font-size: 0.75rem; }\n    .ui-dt-table th.sorted-asc .ui-dt-sort,\n    .ui-dt-table th.sorted-desc .ui-dt-sort { opacity: 1; }\n\n    .ui-dt-table td {\n      padding: 0.45rem 0.75rem;\n      border-bottom: 1px solid var(--pico-border-color, #eee);\n      vertical-align: middle;\n    }\n\n    .ui-dt-table td.truncate {\n      max-width: 160px;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n    }\n\n    .ui-dt-table tr:last-child td { border-bottom: none; }\n\n    .ui-dt-pagination {\n      display: flex;\n      align-items: center;\n      justify-content: flex-end;\n      gap: 0.4rem;\n      margin-top: 0.75rem;\n      flex-wrap: wrap;\n    }\n\n    .ui-dt-page-btn {\n      padding: 0.25rem 0.6rem;\n      font-size: 0.8rem;\n      border: 1px solid var(--pico-border-color, #ccc);\n      border-radius: 0.25rem;\n      background: transparent;\n      cursor: pointer;\n      color: inherit;\n    }\n\n    .ui-dt-page-btn:disabled { opacity: 0.4; cursor: default; }\n    .ui-dt-page-btn.active {\n      background: var(--pico-primary, #2563eb);\n      color: #fff;\n      border-color: var(--pico-primary, #2563eb);\n    }\n\n    .ui-dt-empty {\n      padding: 1.5rem;\n      text-align: center;\n      color: var(--pico-muted-color, #888);\n      font-size: 0.9rem;\n    }\n\n    .ui-dt-action-btn {\n      padding: 0.2rem 0.55rem;\n      font-size: 0.78rem;\n      border-radius: 0.25rem;\n      border: 1px solid transparent;\n      cursor: pointer;\n      white-space: nowrap;\n    }\n  ", document.head.appendChild(e);
}
var c = class extends HTMLElement {
	_data = [];
	_filtered = [];
	_page = 1;
	_pageSize = 10;
	_sortKey = "";
	_sortDir = "asc";
	_columns = [];
	_actions = [];
	_searchable = !0;
	_emptyText = "No records found.";
	connectedCallback() {
		s();
	}
	setOptions(e) {
		this._columns = e.columns, this._actions = e.actions ?? [], this._pageSize = e.pageSize ?? 10, this._searchable = e.searchable ?? !0, this._emptyText = e.emptyText ?? "No records found.";
	}
	setData(e) {
		this._data = e, this._filtered = [...e], this._page = 1, this._render();
	}
	_applySearch(e) {
		let t = e.toLowerCase();
		this._filtered = t ? this._data.filter((e) => this._columns.some((n) => String(e[n.key] ?? "").toLowerCase().includes(t))) : [...this._data], this._page = 1, this._renderBody(), this._renderPagination(), this._renderInfo();
	}
	_applySort(e) {
		this._sortKey === e ? this._sortDir = this._sortDir === "asc" ? "desc" : "asc" : (this._sortKey = e, this._sortDir = "asc"), this._filtered.sort((t, n) => {
			let r = String(t[e] ?? "").toLowerCase(), i = String(n[e] ?? "").toLowerCase();
			return this._sortDir === "asc" ? r.localeCompare(i) : i.localeCompare(r);
		}), this._page = 1, this._renderBody(), this._renderPagination(), this._updateSortHeaders();
	}
	_pageData() {
		let e = (this._page - 1) * this._pageSize;
		return this._filtered.slice(e, e + this._pageSize);
	}
	_totalPages() {
		return Math.max(1, Math.ceil(this._filtered.length / this._pageSize));
	}
	_render() {
		this.innerHTML = `
      <div class="ui-dt-toolbar">
        ${this._searchable ? "<input class=\"ui-dt-search\" type=\"search\" placeholder=\"Search…\" aria-label=\"Search\" />" : "<span></span>"}
        <span class="ui-dt-info"></span>
      </div>
      <div class="ui-dt-table-wrap">
        <table class="ui-dt-table">
          <thead><tr>${this._renderHeaders()}</tr></thead>
          <tbody class="ui-dt-tbody"></tbody>
        </table>
      </div>
      <div class="ui-dt-pagination"></div>
    `, this._renderBody(), this._renderPagination(), this._renderInfo(), this._bindEvents();
	}
	_renderHeaders() {
		let e = this._columns.map((e) => {
			let t = this._sortKey === e.key ? `sorted-${this._sortDir}` : "", n = this._sortDir === "asc" ? "▲" : "▼";
			return `<th data-sort="${e.key}" class="${t}">${e.label}<span class="ui-dt-sort">${n}</span></th>`;
		});
		return this._actions.length && e.push("<th>Actions</th>"), e.join("");
	}
	_renderBody() {
		let e = this.querySelector(".ui-dt-tbody");
		if (!e) return;
		let t = this._pageData();
		if (!t.length) {
			e.innerHTML = `<tr><td colspan="${this._columns.length + +!!this._actions.length}" class="ui-dt-empty">${this._emptyText}</td></tr>`;
			return;
		}
		e.innerHTML = t.map((e) => {
			let t = this._columns.map((t) => {
				let n = e[t.key], r = t.render ? t.render(n, e) : l(String(n ?? "—"));
				return `<td${t.truncate ? ` class="truncate" title="${l(String(n ?? ""))}"` : ""}>${r}</td>`;
			});
			if (this._actions.length) {
				let n = this._actions.map((t) => {
					let n = t.dataAttrs ? t.dataAttrs(e) : "", r = t.confirm ? ` data-confirm="${t.confirm}"` : "";
					return `<button type="button" class="ui-dt-action-btn ${t.className}"${r} ${n}>${t.label}</button>`;
				});
				t.push(`<td><div style="display:flex;gap:0.3rem;flex-wrap:wrap">${n.join("")}</div></td>`);
			}
			return `<tr>${t.join("")}</tr>`;
		}).join("");
	}
	_renderPagination() {
		let e = this.querySelector(".ui-dt-pagination");
		if (!e) return;
		let t = this._totalPages();
		if (t <= 1) {
			e.innerHTML = "";
			return;
		}
		let n = Array.from({ length: t }, (e, t) => t + 1).map((e) => `<button type="button" class="ui-dt-page-btn${e === this._page ? " active" : ""}" data-page="${e}">${e}</button>`);
		e.innerHTML = `
      <button type="button" class="ui-dt-page-btn" data-page="${this._page - 1}" ${this._page === 1 ? "disabled" : ""}>‹</button>
      ${n.join("")}
      <button type="button" class="ui-dt-page-btn" data-page="${this._page + 1}" ${this._page === t ? "disabled" : ""}>›</button>
    `;
	}
	_renderInfo() {
		let e = this.querySelector(".ui-dt-info");
		e && (e.textContent = `${this._filtered.length ? (this._page - 1) * this._pageSize + 1 : 0}–${Math.min(this._page * this._pageSize, this._filtered.length)} of ${this._filtered.length}`);
	}
	_updateSortHeaders() {
		this.querySelectorAll("th[data-sort]").forEach((e) => {
			let t = e.dataset.sort ?? "";
			e.className = this._sortKey === t ? `sorted-${this._sortDir}` : "";
			let n = e.querySelector(".ui-dt-sort");
			n && (n.textContent = this._sortDir === "asc" ? "▲" : "▼");
		});
	}
	_bindEvents() {
		this.querySelector(".ui-dt-search")?.addEventListener("input", (e) => {
			this._applySearch(e.target.value);
		}), this.addEventListener("click", (e) => {
			let t = e.target, n = t.closest("button[data-confirm]");
			if (n) {
				e.stopPropagation();
				let t = n.dataset.confirm;
				i(n, {
					message: t,
					onConfirm: () => n.dispatchEvent(new MouseEvent("click", { bubbles: !0 }))
				});
				return;
			}
			let r = t.closest("th[data-sort]");
			if (r?.dataset.sort) {
				this._applySort(r.dataset.sort);
				return;
			}
			let a = t.closest(".ui-dt-page-btn");
			if (a && !a.disabled) {
				let e = parseInt(a.dataset.page ?? "1", 10);
				e >= 1 && e <= this._totalPages() && (this._page = e, this._renderBody(), this._renderPagination(), this._renderInfo());
			}
		});
	}
};
function l(e) {
	return String(e ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;").replaceAll("'", "&#39;");
}
customElements.define("ui-datatable", c);
//#endregion
//#region src/components/ui-fab.ts
var u = "ui-fab-styles";
function d() {
	if (document.getElementById(u)) return;
	let e = document.createElement("style");
	e.id = u, e.textContent = "\n    ui-fab {\n      position: fixed;\n      z-index: 100;\n      display: block;\n    }\n\n    ui-fab[position=\"bottom-right\"] { bottom: 1.5rem; right: 1.5rem; }\n    ui-fab[position=\"bottom-left\"]  { bottom: 1.5rem; left: 1.5rem; }\n    ui-fab[position=\"top-right\"]    { top: 1.5rem; right: 1.5rem; }\n    ui-fab[position=\"top-left\"]     { top: 1.5rem; left: 1.5rem; }\n\n    .ui-fab-btn {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      width: 3.25rem;\n      height: 3.25rem;\n      border-radius: 50%;\n      border: none;\n      cursor: pointer;\n      font-size: 1.4rem;\n      box-shadow: 0 4px 16px rgba(0,0,0,0.25);\n      transition: opacity 0.2s, transform 0.2s, filter 0.15s;\n      text-decoration: none;\n      background: var(--ui-fab-bg, var(--pico-primary, #2563eb));\n      color: var(--ui-fab-color, #fff);\n    }\n\n    .ui-fab-btn:hover {\n      filter: brightness(1.12);\n      box-shadow: 0 8px 24px rgba(0,0,0,0.3);\n      color: var(--ui-fab-color, #fff);\n    }\n\n    /* scroll-triggered: hidden by default */\n    ui-fab[scroll-trigger] .ui-fab-btn {\n      opacity: 0;\n      transform: translateY(1rem);\n      pointer-events: none;\n    }\n\n    ui-fab[scroll-trigger] .ui-fab-btn.visible {\n      opacity: 1;\n      transform: translateY(0);\n      pointer-events: all;\n    }\n  ", document.head.appendChild(e);
}
var f = class extends HTMLElement {
	_btn = null;
	_onScroll = () => this._handleScroll();
	static get observedAttributes() {
		return [
			"icon",
			"label",
			"href",
			"color",
			"bg",
			"position",
			"scroll-trigger",
			"scroll-threshold",
			"target"
		];
	}
	connectedCallback() {
		d(), this.hasAttribute("position") || this.setAttribute("position", "bottom-right"), this._render(), this.hasAttribute("scroll-trigger") && window.addEventListener("scroll", this._onScroll, { passive: !0 });
	}
	disconnectedCallback() {
		window.removeEventListener("scroll", this._onScroll);
	}
	attributeChangedCallback() {
		this.isConnected && this._render();
	}
	_render() {
		let e = this.getAttribute("icon") ?? "↑", t = this.getAttribute("label") ?? "Action", n = this.getAttribute("href"), r = this.getAttribute("target"), i = this.getAttribute("bg"), a = this.getAttribute("color"), o = [i ? `--ui-fab-bg:${i}` : "", a ? `--ui-fab-color:${a}` : ""].filter(Boolean).join(";"), s = n ? "a" : "button", c = n ? `href="${n}"${r ? ` target="${r}"` : ""}` : "type=\"button\"";
		this.innerHTML = `
      <${s} class="ui-fab-btn" ${c} title="${t}" aria-label="${t}"
        ${o ? `style="${o}"` : ""}>
        ${e}
      </${s}>
    `, this._btn = this.querySelector(".ui-fab-btn"), n || this._btn?.addEventListener("click", () => {
			this.dispatchEvent(new CustomEvent("fab-click", { bubbles: !0 }));
		});
	}
	_handleScroll() {
		let e = parseFloat(this.getAttribute("scroll-threshold") ?? "0.3"), t = document.documentElement.scrollHeight - window.innerHeight, n = t > 0 ? window.scrollY / t : 0;
		this._btn?.classList.toggle("visible", n > e);
	}
};
customElements.define("ui-fab", f);
//#endregion
//#region src/components/ui-multiselect.ts
var p = "ui-multiselect-styles";
function m() {
	if (document.getElementById(p)) return;
	let e = document.createElement("style");
	e.id = p, e.textContent = "\n    ui-multiselect {\n      display: block;\n      position: relative;\n    }\n\n    .ums-control {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 0.35rem;\n      align-items: center;\n      min-height: 2.5rem;\n      padding: 0.35rem 0.75rem;\n      border: var(--pico-border-width, 1px) solid var(--pico-border-color, #e5e7eb);\n      border-radius: var(--pico-border-radius, 0.375rem);\n      background: var(--pico-background-color, #fff);\n      cursor: text;\n    }\n\n    .ums-control:focus-within {\n      border-color: var(--pico-primary, #2563eb);\n      box-shadow: 0 0 0 2px rgba(37,99,235,0.15);\n    }\n\n    .ums-chip {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.25rem;\n      padding: 0.15rem 0.5rem;\n      border-radius: 999px;\n      background: var(--pico-primary, #2563eb);\n      color: #fff;\n      font-size: 0.8rem;\n    }\n\n    .ums-chip-remove {\n      background: none;\n      border: none;\n      color: inherit;\n      cursor: pointer;\n      padding: 0;\n      font-size: 0.75rem;\n      line-height: 1;\n      box-shadow: none;\n      margin: 0;\n    }\n\n    .ums-input {\n      border: none !important;\n      outline: none !important;\n      background: transparent !important;\n      padding: 0 !important;\n      margin: 0 !important;\n      min-width: 80px;\n      flex: 1;\n      box-shadow: none !important;\n    }\n\n    .ums-dropdown {\n      display: none;\n      position: absolute;\n      top: calc(100% + 4px);\n      left: 0;\n      right: 0;\n      background: var(--pico-card-background-color, #fff);\n      border: 1px solid var(--pico-border-color, #e5e7eb);\n      border-radius: 0.375rem;\n      box-shadow: 0 8px 24px rgba(0,0,0,0.1);\n      z-index: 50;\n      max-height: 200px;\n      overflow-y: auto;\n    }\n\n    .ums-dropdown.is-open { display: block; }\n\n    .ums-option {\n      padding: 0.5rem 0.75rem;\n      cursor: pointer;\n      font-size: 0.9rem;\n    }\n\n    .ums-option:hover { background: rgba(0,0,0,0.05); }\n    .ums-option.selected { font-weight: 600; color: var(--pico-primary, #2563eb); }\n    .ums-option.hidden { display: none; }\n\n    .ums-empty {\n      padding: 0.5rem 0.75rem;\n      color: var(--pico-muted-color, #6b7280);\n      font-size: 0.85rem;\n    }\n  ", document.head.appendChild(e);
}
var h = class extends HTMLElement {
	_selected = [];
	static get observedAttributes() {
		return [
			"options",
			"value",
			"placeholder"
		];
	}
	get value() {
		return [...this._selected];
	}
	connectedCallback() {
		m(), this.render();
	}
	getOptions() {
		try {
			return JSON.parse(this.getAttribute("options") ?? "[]");
		} catch {
			return [];
		}
	}
	render() {
		let e = this.getAttribute("placeholder") ?? "Select...", t = this.getAttribute("name") ?? "";
		this.innerHTML = `
      <div class="ums-control">
        <span class="ums-chips"></span>
        <input class="ums-input" type="text" placeholder="${e}" autocomplete="off" />
      </div>
      <div class="ums-dropdown"></div>
      <input type="hidden" name="${t}" class="ums-hidden" />
    `, this.renderChips(), this.renderDropdown(), this.bindEvents();
	}
	renderChips() {
		let e = this.querySelector(".ums-chips");
		e.innerHTML = this._selected.map((e) => `
      <span class="ums-chip">
        ${e}
        <button type="button" class="ums-chip-remove" data-value="${e}" aria-label="Remove ${e}">✕</button>
      </span>
    `).join(""), e.querySelectorAll(".ums-chip-remove").forEach((e) => {
			e.addEventListener("click", (t) => {
				t.stopPropagation(), this.deselect(e.dataset.value);
			});
		});
	}
	renderDropdown(e = "") {
		let t = this.querySelector(".ums-dropdown"), n = this.getOptions().filter((t) => t.toLowerCase().includes(e.toLowerCase()));
		if (n.length === 0) {
			t.innerHTML = "<div class=\"ums-empty\">No options</div>";
			return;
		}
		t.innerHTML = n.map((e) => `
      <div class="ums-option ${this._selected.includes(e) ? "selected" : ""}" data-value="${e}">${e}</div>
    `).join(""), t.querySelectorAll(".ums-option").forEach((e) => {
			e.addEventListener("click", () => {
				let t = e.dataset.value;
				this._selected.includes(t) ? this.deselect(t) : this.select(t);
			});
		});
	}
	bindEvents() {
		let e = this.querySelector(".ums-input"), t = this.querySelector(".ums-dropdown");
		e.addEventListener("focus", () => {
			t.classList.add("is-open"), this.renderDropdown(e.value);
		}), e.addEventListener("input", () => this.renderDropdown(e.value)), document.addEventListener("click", (e) => {
			this.contains(e.target) || t.classList.remove("is-open");
		});
	}
	select(e) {
		this._selected.includes(e) || (this._selected.push(e), this.syncHidden(), this.renderChips(), this.renderDropdown(this.querySelector(".ums-input")?.value ?? ""), this.dispatchEvent(new CustomEvent("change", { detail: this._selected })));
	}
	deselect(e) {
		this._selected = this._selected.filter((t) => t !== e), this.syncHidden(), this.renderChips(), this.renderDropdown(this.querySelector(".ums-input")?.value ?? ""), this.dispatchEvent(new CustomEvent("change", { detail: this._selected }));
	}
	syncHidden() {
		let e = this.querySelector(".ums-hidden");
		e && (e.value = this._selected.join(","));
	}
};
customElements.define("ui-multiselect", h);
//#endregion
//#region src/components/ui-spinner.ts
var g = "ui-spinner-styles";
function _() {
	if (document.getElementById(g)) return;
	let e = document.createElement("style");
	e.id = g, e.textContent = "\n    ui-spinner {\n      display: none;\n      position: fixed;\n      inset: 0;\n      z-index: 200;\n      align-items: center;\n      justify-content: center;\n      background: var(--ui-spinner-bg, rgba(0, 0, 0, 0.55));\n    }\n\n    ui-spinner[visible] {\n      display: flex;\n    }\n\n    .ui-spinner-ring {\n      width: 3rem;\n      height: 3rem;\n      border-radius: 50%;\n      border: 4px solid rgba(255, 255, 255, 0.25);\n      border-top-color: var(--ui-spinner-color, var(--pico-primary, #2563eb));\n      animation: ui-spinner-spin 0.75s linear infinite;\n    }\n\n    @keyframes ui-spinner-spin {\n      to { transform: rotate(360deg); }\n    }\n  ", document.head.appendChild(e);
}
var v = class extends HTMLElement {
	_shownAt = 0;
	static get observedAttributes() {
		return ["bg", "color"];
	}
	connectedCallback() {
		_(), this.querySelector(".ui-spinner-ring") || (this.innerHTML = "<div class=\"ui-spinner-ring\" role=\"status\" aria-label=\"Loading\"></div>"), this._applyVars();
	}
	attributeChangedCallback() {
		this.isConnected && this._applyVars();
	}
	_applyVars() {
		let e = this.getAttribute("bg"), t = this.getAttribute("color");
		e && this.style.setProperty("--ui-spinner-bg", e), t && this.style.setProperty("--ui-spinner-color", t);
	}
	show() {
		this._shownAt = Date.now(), this.setAttribute("visible", "");
	}
	hide() {
		let e = parseInt(this.getAttribute("duration") ?? "1000", 10) - (Date.now() - this._shownAt);
		e > 0 ? setTimeout(() => this.removeAttribute("visible"), e) : this.removeAttribute("visible");
	}
};
customElements.define("ui-spinner", v);
//#endregion
//#region src/components/ui-toast.ts
var y = "ui-toast-styles";
function b() {
	if (document.getElementById(y)) return;
	let e = document.createElement("style");
	e.id = y, e.textContent = "\n    ui-toast {\n      position: fixed;\n      bottom: 1.5rem;\n      right: 1.5rem;\n      z-index: 1000;\n      display: flex;\n      flex-direction: column;\n      gap: 0.5rem;\n      pointer-events: none;\n    }\n\n    .ui-toast-item {\n      pointer-events: all;\n      display: flex;\n      align-items: center;\n      gap: 0.75rem;\n      padding: 0.75rem 1rem;\n      border-radius: 0.5rem;\n      min-width: 220px;\n      max-width: 360px;\n      font-size: 0.9rem;\n      box-shadow: 0 4px 16px rgba(0,0,0,0.18);\n      animation: toast-in 0.2s ease;\n      color: #fff;\n    }\n\n    .ui-toast-item.success { background: #16a34a; }\n    .ui-toast-item.error   { background: #dc2626; }\n    .ui-toast-item.warning { background: #d97706; }\n    .ui-toast-item.info    { background: #2563eb; }\n\n    .ui-toast-item.toast-out {\n      animation: toast-out 0.2s ease forwards;\n    }\n\n    .ui-toast-close {\n      margin-left: auto;\n      background: none;\n      border: none;\n      color: inherit;\n      cursor: pointer;\n      font-size: 1rem;\n      padding: 0;\n      line-height: 1;\n      box-shadow: none;\n    }\n\n    @keyframes toast-in {\n      from { opacity: 0; transform: translateY(1rem); }\n      to   { opacity: 1; transform: translateY(0); }\n    }\n\n    @keyframes toast-out {\n      from { opacity: 1; transform: translateY(0); }\n      to   { opacity: 0; transform: translateY(1rem); }\n    }\n  ", document.head.appendChild(e);
}
var x = {
	success: "✓",
	error: "✕",
	warning: "⚠",
	info: "ℹ"
}, S = class extends HTMLElement {
	connectedCallback() {
		b();
	}
	show(e, t = "info", n = 3500) {
		let r = document.createElement("div");
		r.className = `ui-toast-item ${t}`, r.innerHTML = `
      <span>${x[t]}</span>
      <span>${e}</span>
      <button class="ui-toast-close" aria-label="Close">✕</button>
    `;
		let i = () => {
			r.classList.add("toast-out"), r.addEventListener("animationend", () => r.remove(), { once: !0 });
		};
		r.querySelector(".ui-toast-close").addEventListener("click", i), this.appendChild(r), n > 0 && setTimeout(i, n);
	}
};
customElements.define("ui-toast", S);
//#endregion
export { c as UiDatatable, i as showPopconfirm };
