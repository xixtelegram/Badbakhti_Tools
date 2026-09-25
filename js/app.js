const home = document.getElementById("home");
const app = document.getElementById("app");
const homeHeader = document.getElementById("homeHeader");

let tools = [];
let toolsWithCountCache = [];

// لینک Google Apps Script
const COUNTER_API =
    "https://script.google.com/macros/s/AKfycbxwKYiZw0DfLvvp6zcDJZWSDtuYZLXA0eA8KERrYUVX_Sn9Nmwekj-SK10Zv49iGC50iA/exec";

/* =========================
   NEW TOOLS
========================= */

// id واقعی ابزارها (مطابق export هر فایل)
const INITIAL_TOOL_IDS = new Set([
    "age",
    "badbakhti",
    "block",
    "brain",
    "decision",
    "dice",
    "fal",
    "friendquiz",
    "life",
    "certificate",
    "message",
    "migration",
    "money",
    "personality",
    "phone",
    "situationship",
    "sleep",
    "versus",
    "why-single",
    "wheel"
]);

const NEW_TOOLS_STORAGE_KEY = "badbakhti_new_tools";

function getNewTools() {
    try {
        const saved = localStorage.getItem(NEW_TOOLS_STORAGE_KEY);
        if (!saved) return [];
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
        return [];
    }
}

function saveNewTools(ids) {
    try {
        localStorage.setItem(NEW_TOOLS_STORAGE_KEY, JSON.stringify(ids));
    } catch (e) {
        // localStorage در دسترس نباشد — ادامه بدون این قابلیت
    }
}

function updateNewTools(toolsWithCount) {
    let newTools = getNewTools();
    const currentIds = new Set(toolsWithCount.map((tool) => tool.id));

    newTools = newTools.filter((id) => currentIds.has(id));

    toolsWithCount.forEach((tool) => {
        const isInitialTool = INITIAL_TOOL_IDS.has(tool.id);
        const alreadyNew = newTools.includes(tool.id);

        if (!isInitialTool && !alreadyNew && tool.count < 150) {
            newTools.push(tool.id);
        }

        if (alreadyNew && tool.count >= 150) {
            newTools = newTools.filter((id) => id !== tool.id);
        }
    });

    saveNewTools(newTools);
    return newTools;
}

/* =========================
   COUNTER FUNCTIONS
========================= */

async function getCount(key) {
    try {
        const res = await fetch(`${COUNTER_API}?key=${encodeURIComponent(key)}`);
        const data = await res.json();
        return data.value || 0;
    } catch (e) {
        return 0;
    }
}

async function hitCount(key) {
    try {
        const res = await fetch(
            `${COUNTER_API}?action=hit&key=${encodeURIComponent(key)}`
        );
        const data = await res.json();
        return data.value || 0;
    } catch (e) {
        return 0;
    }
}

/* =========================
   LOAD TOOLS
========================= */

async function loadTools() {
    home.innerHTML = `
        <div class="tools-loading">
            <div class="spinner" aria-hidden="true"></div>
            <div>در حال بارگذاری ابزارها...</div>
        </div>
    `;

    try {
        const response = await fetch("tools.json", { cache: "no-store" });

        if (!response.ok) {
            throw new Error("tools.json not found");
        }

        const files = await response.json();

        const modules = await Promise.all(
            files.map((file) => import(`../tools/${file}?v=${Date.now()}`))
        );

        tools = modules
            .map((module) => module.default || module.tool)
            .filter(Boolean);

        await renderHome();
    } catch (error) {
        console.error(error);
        home.innerHTML = `
            <div class="tool" style="cursor:default">
                <div class="emoji">⚠️</div>
                <h2>خطا در بارگذاری ابزارها</h2>
                <p>
                    فایل tools.json پیدا نشد
                    یا ابزارها قابل بارگذاری نیستند.
                    صفحه را رفرش کنید.
                </p>
            </div>
        `;
    }
}

/* =========================
   RENDER HOME
========================= */

async function renderHome() {
    home.innerHTML = `
        <div class="tools-loading">
            <div class="spinner" aria-hidden="true"></div>
            <div>در حال دریافت آمار...</div>
        </div>
    `;

    const toolsWithCount = await Promise.all(
        tools.map(async (tool) => {
            const count = await getCount(tool.id);
            return { ...tool, count: count || 0 };
        })
    );

    toolsWithCountCache = toolsWithCount;

    const newTools = updateNewTools(toolsWithCount);

    toolsWithCount.sort((a, b) => {
        const aIsNew = newTools.includes(a.id);
        const bIsNew = newTools.includes(b.id);
        if (aIsNew && !bIsNew) return -1;
        if (!aIsNew && bIsNew) return 1;
        return b.count - a.count;
    });

    paintHome(toolsWithCount, newTools);
}

function paintHome(list, newTools) {
    const searchHtml = `
        <div class="tools-search-wrap">
            <label for="toolsSearch" class="visually-hidden">جستجوی ابزار</label>
            <input
                type="search"
                id="toolsSearch"
                class="tools-search"
                placeholder="جستجوی ابزار..."
                autocomplete="off"
            >
        </div>
    `;

    if (!list.length) {
        home.innerHTML =
            searchHtml +
            `<div class="tools-empty">ابزاری پیدا نشد.</div>`;
        bindSearch(newTools);
        return;
    }

    home.innerHTML =
        searchHtml +
        list
            .map((tool) => {
                const isNew = newTools.includes(tool.id);
                return `
            <article
                class="tool"
                data-id="${escapeHTML(tool.id)}"
                data-tool="${escapeHTML(tool.id)}"
                tabindex="0"
                role="button"
                aria-label="${escapeHTML(tool.title)}"
            >
                ${isNew ? `<div class="new-tool-badge">ابزار جدید</div>` : ""}

                <div class="emoji" aria-hidden="true">
                    ${tool.icon || "🧰"}
                </div>

                <h2>${escapeHTML(tool.title)}</h2>

                <p>${escapeHTML(tool.description || "")}</p>

                <div class="tool-usage">
                    ${
                        tool.count > 0
                            ? `استفاده شده توسط <b>${tool.count.toLocaleString("fa-IR")}</b> نفر`
                            : `هنوز کسی استفاده نکرده`
                    }
                </div>

                <button
                    type="button"
                    class="open"
                    data-tool="${escapeHTML(tool.id)}"
                    tabindex="-1"
                >
                    ${escapeHTML(tool.buttonText || "باز کردن")}
                </button>
            </article>
        `;
            })
            .join("");

    home.querySelectorAll("[data-tool]").forEach((el) => {
        const open = () => openApp(el.dataset.tool || el.getAttribute("data-tool"));

        if (el.classList.contains("tool")) {
            el.addEventListener("click", (e) => {
                // اگر روی دکمه داخلی کلیک شد، دوبار باز نشود
                if (e.target.closest("button.open")) return;
                open();
            });
            el.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    open();
                }
            });
        } else if (el.classList.contains("open")) {
            el.addEventListener("click", (e) => {
                e.stopPropagation();
                open();
            });
        }
    });

    bindSearch(newTools);
}

function bindSearch(newTools) {
    const input = document.getElementById("toolsSearch");
    if (!input) return;

    input.addEventListener("input", () => {
        const q = input.value.trim().toLowerCase();
        const filtered = !q
            ? toolsWithCountCache
            : toolsWithCountCache.filter(
                  (t) =>
                      (t.title || "").toLowerCase().includes(q) ||
                      (t.description || "").toLowerCase().includes(q) ||
                      (t.id || "").toLowerCase().includes(q)
              );

        // re-sort same way
        const sorted = [...filtered].sort((a, b) => {
            const aIsNew = newTools.includes(a.id);
            const bIsNew = newTools.includes(b.id);
            if (aIsNew && !bIsNew) return -1;
            if (!aIsNew && bIsNew) return 1;
            return b.count - a.count;
        });

        // keep search value
        const currentVal = input.value;
        paintHome(sorted, newTools);
        const again = document.getElementById("toolsSearch");
        if (again) {
            again.value = currentVal;
            again.focus();
            // move cursor to end
            const len = again.value.length;
            again.setSelectionRange(len, len);
        }
    });
}

/* =========================
   OPEN TOOL
========================= */

async function openApp(id) {
    const tool = tools.find((item) => item.id === id);
    if (!tool) return;

    home.style.display = "none";
    homeHeader.style.display = "none";
    app.classList.add("active");

    app.innerHTML = `
        <button type="button" class="back" id="backButton" aria-label="بازگشت به صفحه اصلی">
            ← برگشت
        </button>

        <div class="box">
            ${tool.html}

            <div id="toolCounter" class="tool-counter">
                در حال دریافت تعداد استفاده...
            </div>
        </div>
    `;

    document.getElementById("backButton").addEventListener("click", goHome);

    if (typeof tool.init === "function") {
        tool.init(app);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });

    try {
        const count = await hitCount(tool.id);
        const counterEl = document.getElementById("toolCounter");
        if (counterEl) {
            counterEl.innerHTML = `این ابزار تا حالا توسط <b>${Number(count).toLocaleString("fa-IR")}</b> نفر استفاده شده`;
        }
    } catch (e) {
        const counterEl = document.getElementById("toolCounter");
        if (counterEl) counterEl.style.display = "none";
    }
}

/* =========================
   HOME
========================= */

function goHome() {
    app.classList.remove("active");
    app.innerHTML = "";
    home.style.display = "grid";
    homeHeader.style.display = "block";
    window.scrollTo({ top: 0, behavior: "smooth" });
}

/* =========================
   RESULT
========================= */

export function showResult(id, html) {
    const box = document.getElementById(id);
    if (!box) return;

    box.innerHTML = html;
    box.classList.add("show");

    box.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
}

/* =========================
   FORMAT
========================= */

export function format(number) {
    return Math.round(number).toLocaleString("fa-IR") + " تومان";
}

/* =========================
   ESCAPE HTML
========================= */

export function escapeHTML(text) {
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

/* =========================
   START
========================= */

loadTools();
