const home =
    document.getElementById("home");

const app =
    document.getElementById("app");

const homeHeader =
    document.getElementById("homeHeader");

let tools = [];

// لینک Google Apps Script
const COUNTER_API = "https://script.google.com/macros/s/AKfycbxwKYiZw0DfLvvp6zcDJZWSDtuYZLXA0eA8KERrYUVX_Sn9Nmwekj-SK10Zv49iGC50iA/exec";


/* =========================
   NEW TOOLS
========================= */

// ابزارهایی که در حال حاضر قدیمی هستند
const INITIAL_TOOL_IDS = new Set([
    "age",
    "badbakhti",
    "block",
    "brain",
    "decision",
    "dice",
    "fal",
    "friend",
    "life",
    "madrak",
    "message",
    "migration",
    "money",
    "personality",
    "phone",
    "situationship",
    "sleep",
    "versus",
    "why-single"
]);

const NEW_TOOLS_STORAGE_KEY = "badbakhti_new_tools";


// دریافت لیست ابزارهایی که به عنوان جدید شناخته شده‌اند
function getNewTools() {

    try {

        const saved =
            localStorage.getItem(
                NEW_TOOLS_STORAGE_KEY
            );

        if (!saved) {
            return [];
        }

        const parsed = JSON.parse(saved);

        return Array.isArray(parsed)
            ? parsed
            : [];

    } catch (e) {

        return [];

    }

}


// ذخیره لیست ابزارهای جدید
function saveNewTools(ids) {

    try {

        localStorage.setItem(
            NEW_TOOLS_STORAGE_KEY,
            JSON.stringify(ids)
        );

    } catch (e) {

        // اگر localStorage در دسترس نبود،
        // پروژه بدون این قابلیت هم به کار خودش ادامه می‌دهد.

    }

}


// بررسی و ثبت ابزارهای جدید
function updateNewTools(toolsWithCount) {

    let newTools =
        getNewTools();

    const currentIds =
        new Set(
            toolsWithCount.map(tool => tool.id)
        );


    // پاک کردن ابزارهایی که دیگر در پروژه وجود ندارند
    newTools =
        newTools.filter(
            id => currentIds.has(id)
        );


    toolsWithCount.forEach(tool => {

        const isInitialTool =
            INITIAL_TOOL_IDS.has(tool.id);

        const alreadyNew =
            newTools.includes(tool.id);


        // ابزارهایی که قبلاً جدید ثبت نشده‌اند
        // و در لیست ابزارهای قدیمی اولیه هم نیستند،
        // ابزار جدید محسوب می‌شوند.
        if (
            !isInitialTool &&
            !alreadyNew &&
            tool.count < 150
        ) {

            newTools.push(tool.id);

        }


        // وقتی ابزار به 150 استفاده رسید،
        // وضعیت جدید بودن آن تمام می‌شود.
        if (
            alreadyNew &&
            tool.count >= 150
        ) {

            newTools =
                newTools.filter(
                    id => id !== tool.id
                );

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
        const res = await fetch(`${COUNTER_API}?key=${key}`);
        const data = await res.json();
        return data.value || 0;
    } catch (e) {
        return 0;
    }
}

async function hitCount(key) {
    try {
        const res = await fetch(`${COUNTER_API}?action=hit&key=${key}`);
        const data = await res.json();
        return data.value || 0;
    } catch (e) {
        return 0;
    }
}


/* =========================
   LOAD TOOLS
========================= */

async function loadTools(){

    try{

        const response =
            await fetch(
                "tools.json",
                {
                    cache:"no-store"
                }
            );


        if(!response.ok){
            throw new Error("tools.json not found");
        }


        const files = await response.json();


        const modules = await Promise.all(
            files.map(
                file =>
                    import(`../tools/${file}?v=${Date.now()}`)
            )
        );


        tools =
            modules
                .map(module => module.default || module.tool)
                .filter(Boolean);


        renderHome();

    }

    catch(error){

        console.error(error);

        home.innerHTML = `
            <div class="tool">
                <div class="emoji">⚠️</div>
                <h2>خطا در بارگذاری ابزارها</h2>
                <p>
                    فایل tools.json پیدا نشد
                    یا ابزارها قابل بارگذاری نیستند.
                </p>
            </div>
        `;
    }
}



/* =========================
   RENDER HOME
========================= */

async function renderHome(){

    // حالت لودینگ
    home.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px 0; color: var(--muted);">
            در حال بارگذاری ابزارها و آمار...
        </div>
    `;

    // گرفتن آمار همه ابزارها
    const toolsWithCount = await Promise.all(
        tools.map(async (tool) => {
            const count = await getCount(tool.id);
            return { ...tool, count: count || 0 };
        })
    );


    // بررسی ابزارهای جدید
    const newTools =
        updateNewTools(toolsWithCount);


    // مرتب‌سازی:
    // 1. ابزارهای جدید اول
    // 2. سپس بر اساس بیشترین استفاده
    toolsWithCount.sort((a, b) => {

        const aIsNew =
            newTools.includes(a.id);

        const bIsNew =
            newTools.includes(b.id);


        if (aIsNew && !bIsNew) {
            return -1;
        }

        if (!aIsNew && bIsNew) {
            return 1;
        }


        return b.count - a.count;

    });


    // رندر نهایی
    home.innerHTML =
        toolsWithCount.map(tool => {

            const isNew =
                newTools.includes(tool.id);

            return `
            <div class="tool" data-id="${escapeHTML(tool.id)}">

                ${
                    isNew
                    ? `<div class="new-tool-badge"> ابزار جدید</div>`
                    : ""
                }

                <div class="emoji">
                    ${tool.icon || "🧰"}
                </div>

                <h2>
                    ${escapeHTML(tool.title)}
                </h2>

                <p>
                    ${escapeHTML(tool.description || "")}
                </p>

                <div class="tool-usage" style="
                    font-size: 12px;
                    color: var(--muted);
                    margin: 8px 0 4px;
                    opacity: 0.85;
                ">
                    ${
                        tool.count > 0
                        ? `استفاده شده توسط <b style="color:var(--counter)">${tool.count.toLocaleString("fa-IR")}</b> نفر`
                        : `هنوز کسی استفاده نکرده`
                    }
                </div>

                <button class="open" data-tool="${escapeHTML(tool.id)}">
                    ${escapeHTML(tool.buttonText || "باز کردن")}
                </button>

            </div>
        `;

        }).join("");


    // رویداد کلیک
    home.querySelectorAll("[data-tool]").forEach(button => {
        button.addEventListener("click", () => {
            openApp(button.dataset.tool);
        });
    });
}



/* =========================
   OPEN TOOL
========================= */

async function openApp(id){

    const tool = tools.find(item => item.id === id);

    if(!tool) return;


    home.style.display = "none";
    homeHeader.style.display = "none";
    app.classList.add("active");


    app.innerHTML = `
        <button class="back" id="backButton">
            ← برگشت
        </button>

        <div class="box">
            ${tool.html}

            <div id="toolCounter" style="
                margin-top: 28px;
                padding-top: 16px;
                border-top: 1px solid rgba(255,255,255,0.08);
                text-align: center;
                color: var(--muted);
                font-size: 13.5px;
            ">
                در حال دریافت تعداد استفاده...
            </div>
        </div>
    `;


    document.getElementById("backButton")
        .addEventListener("click", goHome);


    if (typeof tool.init === "function") {
        tool.init(app);
    }


    window.scrollTo({ top: 0, behavior: "smooth" });


    // افزایش شمارنده + نمایش
    try {
        const count = await hitCount(tool.id);

        const counterEl = document.getElementById("toolCounter");
        if (counterEl) {
            counterEl.innerHTML = `این ابزار تا حالا توسط <b style="color: var(--counter)">${Number(count).toLocaleString("fa-IR")}</b> نفر استفاده شده`;
        }
    } catch (e) {
        const counterEl = document.getElementById("toolCounter");
        if (counterEl) counterEl.style.display = "none";
    }
}



/* =========================
   HOME
========================= */

function goHome(){

    app.classList.remove("active");
    app.innerHTML = "";
    home.style.display = "grid";
    homeHeader.style.display = "block";

    window.scrollTo({ top: 0, behavior: "smooth" });
}



/* =========================
   RESULT
========================= */

export function showResult(id, html){

    const box = document.getElementById(id);
    if(!box) return;

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

export function format(number){
    return Math.round(number).toLocaleString("fa-IR") + " تومان";
}



/* =========================
   ESCAPE HTML
========================= */

export function escapeHTML(text){
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
