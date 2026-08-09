(function(e,t){typeof exports==`object`&&typeof module<`u`?t(exports):typeof define==`function`&&define.amd?define([`exports`],t):(e=typeof globalThis<`u`?globalThis:e||self,t(e.LunaUILib={}))})(this,function(e){Object.defineProperty(e,Symbol.toStringTag,{value:`Module`});var t=`ui-popconfirm-styles`;function n(){if(document.getElementById(t))return;let e=document.createElement(`style`);e.id=t,e.textContent=`
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
  `,document.head.appendChild(e)}var r=null;function i(){r?.remove(),r=null}function a(e,t){n(),i();let{message:a=`Are you sure?`,confirmText:s=`Delete`,cancelText:c=`Cancel`,onConfirm:l}=t,u=document.createElement(`div`);u.className=`ui-popconfirm`,u.setAttribute(`role`,`dialog`),u.setAttribute(`aria-modal`,`false`),u.innerHTML=`
    <p class="ui-popconfirm-message">${a}</p>
    <div class="ui-popconfirm-actions">
      <button type="button" class="ui-popconfirm-btn ui-popconfirm-cancel">${c}</button>
      <button type="button" class="ui-popconfirm-btn ui-popconfirm-confirm">${s}</button>
    </div>
  `,document.body.appendChild(u),r=u;let d=e.getBoundingClientRect(),f=window.innerHeight-d.bottom>100?d.bottom+6:d.top-100-6,p=Math.min(d.left,window.innerWidth-270);u.style.top=`${f}px`,u.style.left=`${Math.max(8,p)}px`,u.querySelector(`.ui-popconfirm-confirm`)?.addEventListener(`click`,()=>{i(),l()}),u.querySelector(`.ui-popconfirm-cancel`)?.addEventListener(`click`,i),setTimeout(()=>{document.addEventListener(`click`,o,{capture:!0,once:!0})},0)}function o(e){r&&!r.contains(e.target)&&i()}var s=`ui-datatable-styles`;function c(){if(document.getElementById(s))return;let e=document.createElement(`style`);e.id=s,e.textContent=`
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
  `,document.head.appendChild(e)}var l=class extends HTMLElement{_data=[];_filtered=[];_page=1;_pageSize=10;_sortKey=``;_sortDir=`asc`;_columns=[];_actions=[];_searchable=!0;_emptyText=`No records found.`;connectedCallback(){c()}setOptions(e){this._columns=e.columns,this._actions=e.actions??[],this._pageSize=e.pageSize??10,this._searchable=e.searchable??!0,this._emptyText=e.emptyText??`No records found.`}setData(e){this._data=e,this._filtered=[...e],this._page=1,this._render()}_applySearch(e){let t=e.toLowerCase();this._filtered=t?this._data.filter(e=>this._columns.some(n=>String(e[n.key]??``).toLowerCase().includes(t))):[...this._data],this._page=1,this._renderBody(),this._renderPagination(),this._renderInfo()}_applySort(e){this._sortKey===e?this._sortDir=this._sortDir===`asc`?`desc`:`asc`:(this._sortKey=e,this._sortDir=`asc`),this._filtered.sort((t,n)=>{let r=String(t[e]??``).toLowerCase(),i=String(n[e]??``).toLowerCase();return this._sortDir===`asc`?r.localeCompare(i):i.localeCompare(r)}),this._page=1,this._renderBody(),this._renderPagination(),this._updateSortHeaders()}_pageData(){let e=(this._page-1)*this._pageSize;return this._filtered.slice(e,e+this._pageSize)}_totalPages(){return Math.max(1,Math.ceil(this._filtered.length/this._pageSize))}_render(){this.innerHTML=`
      <div class="ui-dt-toolbar">
        ${this._searchable?`<input class="ui-dt-search" type="search" placeholder="Search…" aria-label="Search" />`:`<span></span>`}
        <span class="ui-dt-info"></span>
      </div>
      <div class="ui-dt-table-wrap">
        <table class="ui-dt-table">
          <thead><tr>${this._renderHeaders()}</tr></thead>
          <tbody class="ui-dt-tbody"></tbody>
        </table>
      </div>
      <div class="ui-dt-pagination"></div>
    `,this._renderBody(),this._renderPagination(),this._renderInfo(),this._bindEvents()}_renderHeaders(){let e=this._columns.map(e=>{let t=this._sortKey===e.key?`sorted-${this._sortDir}`:``,n=this._sortDir===`asc`?`▲`:`▼`;return`<th data-sort="${e.key}" class="${t}">${e.label}<span class="ui-dt-sort">${n}</span></th>`});return this._actions.length&&e.push(`<th>Actions</th>`),e.join(``)}_renderBody(){let e=this.querySelector(`.ui-dt-tbody`);if(!e)return;let t=this._pageData();if(!t.length){e.innerHTML=`<tr><td colspan="${this._columns.length+ +!!this._actions.length}" class="ui-dt-empty">${this._emptyText}</td></tr>`;return}e.innerHTML=t.map(e=>{let t=this._columns.map(t=>{let n=e[t.key],r=t.render?t.render(n,e):u(String(n??`—`));return`<td${t.truncate?` class="truncate" title="${u(String(n??``))}"`:``}>${r}</td>`});if(this._actions.length){let n=this._actions.map(t=>{let n=t.dataAttrs?t.dataAttrs(e):``,r=t.confirm?` data-confirm="${t.confirm}"`:``;return`<button type="button" class="ui-dt-action-btn ${t.className}"${r} ${n}>${t.label}</button>`});t.push(`<td><div style="display:flex;gap:0.3rem;flex-wrap:wrap">${n.join(``)}</div></td>`)}return`<tr>${t.join(``)}</tr>`}).join(``)}_renderPagination(){let e=this.querySelector(`.ui-dt-pagination`);if(!e)return;let t=this._totalPages();if(t<=1){e.innerHTML=``;return}let n=Array.from({length:t},(e,t)=>t+1).map(e=>`<button type="button" class="ui-dt-page-btn${e===this._page?` active`:``}" data-page="${e}">${e}</button>`);e.innerHTML=`
      <button type="button" class="ui-dt-page-btn" data-page="${this._page-1}" ${this._page===1?`disabled`:``}>‹</button>
      ${n.join(``)}
      <button type="button" class="ui-dt-page-btn" data-page="${this._page+1}" ${this._page===t?`disabled`:``}>›</button>
    `}_renderInfo(){let e=this.querySelector(`.ui-dt-info`);e&&(e.textContent=`${this._filtered.length?(this._page-1)*this._pageSize+1:0}–${Math.min(this._page*this._pageSize,this._filtered.length)} of ${this._filtered.length}`)}_updateSortHeaders(){this.querySelectorAll(`th[data-sort]`).forEach(e=>{let t=e.dataset.sort??``;e.className=this._sortKey===t?`sorted-${this._sortDir}`:``;let n=e.querySelector(`.ui-dt-sort`);n&&(n.textContent=this._sortDir===`asc`?`▲`:`▼`)})}_bindEvents(){this.querySelector(`.ui-dt-search`)?.addEventListener(`input`,e=>{this._applySearch(e.target.value)}),this.addEventListener(`click`,e=>{let t=e.target,n=t.closest(`button[data-confirm]`);if(n){e.stopPropagation();let t=n.dataset.confirm;a(n,{message:t,onConfirm:()=>n.dispatchEvent(new MouseEvent(`click`,{bubbles:!0}))});return}let r=t.closest(`th[data-sort]`);if(r?.dataset.sort){this._applySort(r.dataset.sort);return}let i=t.closest(`.ui-dt-page-btn`);if(i&&!i.disabled){let e=parseInt(i.dataset.page??`1`,10);e>=1&&e<=this._totalPages()&&(this._page=e,this._renderBody(),this._renderPagination(),this._renderInfo())}})}};function u(e){return String(e??``).replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`).replaceAll(`'`,`&#39;`)}customElements.define(`ui-datatable`,l);var d=`ui-fab-styles`;function f(){if(document.getElementById(d))return;let e=document.createElement(`style`);e.id=d,e.textContent=`
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
  `,document.head.appendChild(e)}var p=class extends HTMLElement{_btn=null;_onScroll=()=>this._handleScroll();static get observedAttributes(){return[`icon`,`label`,`href`,`color`,`bg`,`position`,`scroll-trigger`,`scroll-threshold`,`target`]}connectedCallback(){f(),this.hasAttribute(`position`)||this.setAttribute(`position`,`bottom-right`),this._render(),this.hasAttribute(`scroll-trigger`)&&window.addEventListener(`scroll`,this._onScroll,{passive:!0})}disconnectedCallback(){window.removeEventListener(`scroll`,this._onScroll)}attributeChangedCallback(){this.isConnected&&this._render()}_render(){let e=this.getAttribute(`icon`)??`↑`,t=this.getAttribute(`label`)??`Action`,n=this.getAttribute(`href`),r=this.getAttribute(`target`),i=this.getAttribute(`bg`),a=this.getAttribute(`color`),o=[i?`--ui-fab-bg:${i}`:``,a?`--ui-fab-color:${a}`:``].filter(Boolean).join(`;`),s=n?`a`:`button`,c=n?`href="${n}"${r?` target="${r}"`:``}`:`type="button"`;this.innerHTML=`
      <${s} class="ui-fab-btn" ${c} title="${t}" aria-label="${t}"
        ${o?`style="${o}"`:``}>
        ${e}
      </${s}>
    `,this._btn=this.querySelector(`.ui-fab-btn`),n||this._btn?.addEventListener(`click`,()=>{this.dispatchEvent(new CustomEvent(`fab-click`,{bubbles:!0}))})}_handleScroll(){let e=parseFloat(this.getAttribute(`scroll-threshold`)??`0.3`),t=document.documentElement.scrollHeight-window.innerHeight,n=t>0?window.scrollY/t:0;this._btn?.classList.toggle(`visible`,n>e)}};customElements.define(`ui-fab`,p);var m=`ui-multiselect-styles`;function h(){if(document.getElementById(m))return;let e=document.createElement(`style`);e.id=m,e.textContent=`
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
  `,document.head.appendChild(e)}var g=class extends HTMLElement{_selected=[];static get observedAttributes(){return[`options`,`value`,`placeholder`]}get value(){return[...this._selected]}connectedCallback(){h(),this.render()}getOptions(){try{return JSON.parse(this.getAttribute(`options`)??`[]`)}catch{return[]}}render(){let e=this.getAttribute(`placeholder`)??`Select...`,t=this.getAttribute(`name`)??``;this.innerHTML=`
      <div class="ums-control">
        <span class="ums-chips"></span>
        <input class="ums-input" type="text" placeholder="${e}" autocomplete="off" />
      </div>
      <div class="ums-dropdown"></div>
      <input type="hidden" name="${t}" class="ums-hidden" />
    `,this.renderChips(),this.renderDropdown(),this.bindEvents()}renderChips(){let e=this.querySelector(`.ums-chips`);e.innerHTML=this._selected.map(e=>`
      <span class="ums-chip">
        ${e}
        <button type="button" class="ums-chip-remove" data-value="${e}" aria-label="Remove ${e}">✕</button>
      </span>
    `).join(``),e.querySelectorAll(`.ums-chip-remove`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation(),this.deselect(e.dataset.value)})})}renderDropdown(e=``){let t=this.querySelector(`.ums-dropdown`),n=this.getOptions().filter(t=>t.toLowerCase().includes(e.toLowerCase()));if(n.length===0){t.innerHTML=`<div class="ums-empty">No options</div>`;return}t.innerHTML=n.map(e=>`
      <div class="ums-option ${this._selected.includes(e)?`selected`:``}" data-value="${e}">${e}</div>
    `).join(``),t.querySelectorAll(`.ums-option`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.value;this._selected.includes(t)?this.deselect(t):this.select(t)})})}bindEvents(){let e=this.querySelector(`.ums-input`),t=this.querySelector(`.ums-dropdown`);e.addEventListener(`focus`,()=>{t.classList.add(`is-open`),this.renderDropdown(e.value)}),e.addEventListener(`input`,()=>this.renderDropdown(e.value)),document.addEventListener(`click`,e=>{this.contains(e.target)||t.classList.remove(`is-open`)})}select(e){this._selected.includes(e)||(this._selected.push(e),this.syncHidden(),this.renderChips(),this.renderDropdown(this.querySelector(`.ums-input`)?.value??``),this.dispatchEvent(new CustomEvent(`change`,{detail:this._selected})))}deselect(e){this._selected=this._selected.filter(t=>t!==e),this.syncHidden(),this.renderChips(),this.renderDropdown(this.querySelector(`.ums-input`)?.value??``),this.dispatchEvent(new CustomEvent(`change`,{detail:this._selected}))}syncHidden(){let e=this.querySelector(`.ums-hidden`);e&&(e.value=this._selected.join(`,`))}};customElements.define(`ui-multiselect`,g);var _=`ui-spinner-styles`;function v(){if(document.getElementById(_))return;let e=document.createElement(`style`);e.id=_,e.textContent=`
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
  `,document.head.appendChild(e)}var y=class extends HTMLElement{_shownAt=0;static get observedAttributes(){return[`bg`,`color`]}connectedCallback(){v(),this.querySelector(`.ui-spinner-ring`)||(this.innerHTML=`<div class="ui-spinner-ring" role="status" aria-label="Loading"></div>`),this._applyVars()}attributeChangedCallback(){this.isConnected&&this._applyVars()}_applyVars(){let e=this.getAttribute(`bg`),t=this.getAttribute(`color`);e&&this.style.setProperty(`--ui-spinner-bg`,e),t&&this.style.setProperty(`--ui-spinner-color`,t)}show(){this._shownAt=Date.now(),this.setAttribute(`visible`,``)}hide(){let e=parseInt(this.getAttribute(`duration`)??`1000`,10)-(Date.now()-this._shownAt);e>0?setTimeout(()=>this.removeAttribute(`visible`),e):this.removeAttribute(`visible`)}};customElements.define(`ui-spinner`,y);var b=`ui-toast-styles`;function x(){if(document.getElementById(b))return;let e=document.createElement(`style`);e.id=b,e.textContent=`
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
  `,document.head.appendChild(e)}var S={success:`✓`,error:`✕`,warning:`⚠`,info:`ℹ`},C=class extends HTMLElement{connectedCallback(){x()}show(e,t=`info`,n=3500){let r=document.createElement(`div`);r.className=`ui-toast-item ${t}`,r.innerHTML=`
      <span>${S[t]}</span>
      <span>${e}</span>
      <button class="ui-toast-close" aria-label="Close">✕</button>
    `;let i=()=>{r.classList.add(`toast-out`),r.addEventListener(`animationend`,()=>r.remove(),{once:!0})};r.querySelector(`.ui-toast-close`).addEventListener(`click`,i),this.appendChild(r),n>0&&setTimeout(i,n)}};customElements.define(`ui-toast`,C),e.UiDatatable=l,e.showPopconfirm=a});