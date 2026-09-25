import {
    showResult
} from "../js/app.js";


export default {

    id: "why-single",

    icon: "💍",

    title: "چرا هنوز مجردم؟",

    description:
        "چند سؤال تلخ در مورد رفتار، توقعات، ترس‌ها و الگوهای رابطه‌ای‌ت می‌پرسه و بعد با بی‌رحمی کامل بهت می‌گه دلیل اصلیش چیه.",

    buttonText:
        "ببین مشکل از کجاست 💍",


    html: `

        <div class="box">

            <h2>
                💍 چرا هنوز مجردم؟
            </h2>

            <p class="desc">
                این تست قراره بهت بگه دقیقاً چرا هنوز تنها زندگی می‌کنی.
                جواب‌ها رو صادقانه بده، قرار نیست کسی غیر از خودت ببینه.
                (البته خودت هم ممکنه نتونی تحمل کنی.) 💀
            </p>

            <div id="singleArea">

                <button class="primary" id="startSingle">
                    شروع خودشکنی 💍
                </button>

            </div>

        </div>

    `,


    init() {

        const area = document.getElementById("singleArea");

        let index = 0;
        let totalScore = 0;
        let userGender = "male";
        let userAge = 25;


        // ============================================================
        // توابع کمکی
        // ============================================================
        function shuffle(array) {
            const arr = [...array];
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr;
        }


        // ترنزیشن قابل‌اعتماد: قبل از برگردوندن opacity، مرورگر رو مجبور
        // می‌کنیم حالت "مخفی" رو یه‌بار رندر کنه (force reflow)، وگرنه
        // چون همه‌چیز تو یه tick سینک اجرا می‌شه، انیمیشن اصلاً دیده نمی‌شه.
        function transitionArea(callback) {

            area.style.transition = "opacity 0.25s ease, transform 0.25s ease";
            area.style.opacity = "0";
            area.style.transform = "translateY(20px) scale(0.96)";

            setTimeout(() => {

                callback();

                // force reflow
                void area.offsetHeight;

                area.style.opacity = "1";
                area.style.transform = "translateY(0) scale(1)";

            }, 260);

        }


        // ============================================================
        // سؤال‌ها
        // ============================================================
        const questions = [

            {
                q: "وقتی یه آدم جدید می‌بینی که بهت علاقه نشون میده، اولین فکرت چیه؟",
                a: [
                    ["«خب، بالاخره یه کسی منو دید»", 0],
                    ["«این حتماً یه شوخیه یا به دردسر نیاز داره»", 15],
                    ["«چیزی توی من هست که می‌خواد، بعد می‌فهمه اشتباه کرده»", 20],
                    ["«خوب، بذار ببینم چی می‌خواد»", 5]
                ]
            },

            {
                q: "در مورد ظاهرت چه حسی داری؟",
                a: [
                    ["کاملاً راضیم، فقط یه سری آدم سلیقه ندارن", 2],
                    ["همیشه یه چیزی هست که دوست ندارم، ولی قابل قبوله", 8],
                    ["اگه ۱۰ کیلو کم کنم/عضله بسازم/موهام رو درست کنم، اوضاع درسته", 14],
                    ["از خودم متنفرم، نمی‌دونم کسی چطور ممکنه منو بخواد", 22]
                ]
            },

            {
                q: "چند بار تا حالا عاشق شدی؟",
                a: [
                    ["هیچ‌وقت، هنوز کسی رو پیدا نکردم که ارزشش رو داشته باشه", 12],
                    ["یک یا دو بار، ولی درست تموم نشد", 6],
                    ["چندین بار، ولی همیشه من تنها کسی بودم که جدی بودم", 18],
                    ["عاشق شدن؟ من عاشق آرامشم", 9]
                ]
            },

            {
                q: "وقتی با کسی قرار می‌ذاری، معمولاً چند بار قبل از قرار پیام می‌دی؟",
                a: [
                    ["یه چند تا پیام معمولی برای هماهنگی", 2],
                    ["انقدر پیام می‌دم که اون طرف دیگه جواب نمی‌ده", 16],
                    ["هیچی، خودش باید پیام بده، من منتظرم", 10],
                    ["یه عالمه پیام می‌دم و بعد پشیمون می‌شم که چرا اینقدر زود همه‌چیز رو گفتم", 14]
                ]
            },

            {
                q: "بعد از چند بار قرار، معمولاً رابطه‌ات چطور تموم می‌شه؟",
                a: [
                    ["من می‌فهمم که طرف مقصرم نیست و ولش می‌کنم", 8],
                    ["اون طرف یهو ناپدید می‌شه و من نمی‌دونم چرا", 18],
                    ["همون اول می‌فهمم که قرار نیست جایی برسه و تمومش می‌کنم", 10],
                    ["تا آخرش می‌رم، حتی اگه بد باشه، چون تنها موندن بدتره", 20]
                ]
            },

            {
                q: "چقدر از رابطه‌های قبلی‌ات درس گرفتی؟",
                a: [
                    ["همه‌شون اشتباه بودن، این بار درسته", 12],
                    ["فقط یاد گرفتم که آدما قابل اعتماد نیستن", 20],
                    ["یاد گرفتم که باید بیشتر از خودم مراقبت کنم", 4],
                    ["هیچی، هر بار همون اشتباهات رو تکرار می‌کنم", 18]
                ]
            },

            {
                q: "چقدر برای یه رابطه وقت می‌ذاری؟",
                a: [
                    ["هر چی لازم باشه، من عاشق عاشق شدنم", 5],
                    ["وقت دارم، ولی انرژی نه", 12],
                    ["کلاً زندگی‌ام شلوغه، رابطه الان اولویت نیست", 8],
                    ["برای رابطه وقت می‌ذارم، ولی اگه طرف کم بیاره، ولش می‌کنم", 15]
                ]
            },

            {
                q: "وقتی کسی بهت می‌گه «دوستت دارم»، چه حسی داری؟",
                a: [
                    ["خوشحال می‌شم و باور می‌کنم", 2],
                    ["فکر می‌کنم داره دروغ می‌گه یا به چیزی نیاز داره", 18],
                    ["نمی‌دونم چطور جواب بدم، سکوت می‌کنم", 14],
                    ["می‌گم «منم» ولی توی دلم می‌دونم که اینطور نیست", 10]
                ]
            },

            {
                q: "چند بار به خاطر ترس از رد شدن، به کسی که دوستش داشتی چیزی نگفتی؟",
                a: [
                    ["هیچ‌وقت، من اهل ریسک کردنم", 2],
                    ["یک یا دو بار، ولی پشیمون شدم", 8],
                    ["بیشتر از اون چیزی که دوست دارم اعتراف کنم", 18],
                    ["همیشه، من هیچ‌وقت اول قدم برنمی‌دارم", 20]
                ]
            },

            {
                q: "دوست داری کسی تو رو کامل بفهمه، یا ترجیح می‌دی یه گوشه‌ای از خودت رو پنهون کنی؟",
                a: [
                    ["دوست دارم کامل بفهمه، ولی می‌ترسم که اگه بفهمه، بره", 16],
                    ["کسی نمی‌تونه من رو بفهمه، پس بهتره پنهون کنم", 20],
                    ["همه‌چیز رو می‌گم، اگه نتونه تحمل کنه، به درک", 4],
                    ["یه چیزایی رو پنهون می‌کنم تا جذاب بمونم", 10]
                ]
            },

            {
                q: "چند بار توی رابطه‌های قبلی، تو اولین کسی بودی که «دوستت دارم» رو گفتی؟",
                a: [
                    ["همیشه من اول می‌گم، چون می‌دونم چی می‌خوام", 5],
                    ["هیچ‌وقت، منتظر می‌مونم طرف اول بگه", 14],
                    ["یک بار گفتم و پشیمون شدم، دیگه تکرار نمی‌کنم", 18],
                    ["چند بار گفتم، ولی هیچ‌وقت جواب نگرفتم", 20]
                ]
            },

            {
                q: "وقتی یه رابطه تموم می‌شه، چقدر طول می‌کشه تا آماده‌ی رابطه‌ی جدید بشی؟",
                a: [
                    ["چند هفته، زندگی ادامه داره", 4],
                    ["چند ماه، باید خودم رو جمع کنم", 10],
                    ["یک سال یا بیشتر، هنوز دارم به اون فکر می‌کنم", 18],
                    ["هیچ‌وقت، هنوز به اون امید دارم که برگرده", 22]
                ]
            },

            {
                q: "چقدر از تکنولوژی و شبکه‌های اجتماعی برای پیدا کردن رابطه استفاده می‌کنی؟",
                a: [
                    ["خیلی زیاد، همه‌جا نگاه می‌کنم", 6],
                    ["کم، ترجیح می‌دم تو دنیای واقعی آشنا بشم", 4],
                    ["همشون رو امتحان کردم، هیچ‌کدوم کار نکرد", 14],
                    ["انقدر اسکرول می‌کنم که دیگه نمی‌دونم چی می‌خوام", 18]
                ]
            },

            {
                q: "وقتی با کسی حرف می‌زنی، بیشتر به چی فکر می‌کنی؟",
                a: [
                    ["به حرف‌های خودش، سعی می‌کنم بفهممش", 2],
                    ["به این که بعداً چی بگم که بامزه باشم", 12],
                    ["به این که نکند حرف احمقانه‌ای بزنم", 16],
                    ["به این که چقدر زود می‌تونم برم خونه", 14]
                ]
            },

            {
                q: "چند وقت یک‌بار به این فکر می‌کنی که «تنها می‌مونی»؟",
                a: [
                    ["هیچ‌وقت، من به آینده امیدوارم", 2],
                    ["گاهی، ولی سعی می‌کنم نادیده بگیرم", 10],
                    ["زیاد، مخصوصاً شب‌ها", 18],
                    ["هر روز، دیگه بهش عادت کردم", 22]
                ]
            },

            {
                q: "آیا تا حالا به خاطر تنها نبودن، با کسی که دوست نداشتی وارد رابطه شدی؟",
                a: [
                    ["نه، من احترام به خودم رو حفظ می‌کنم", 2],
                    ["یک بار، و ازش متنفرم", 14],
                    ["چند بار، تنها موندن رو تحمل نمی‌کردم", 20],
                    ["همیشه، تنها موندن بدترین چیزه", 22]
                ]
            },

            {
                q: "چقدر از رفتارهای خودت توی رابطه‌های قبلی رو تحلیل کردی؟",
                a: [
                    ["خیلی زیاد، می‌دونم کجاها رو اشتباه کردم", 4],
                    ["کمی، ولی هنوز مطمئن نیستم", 10],
                    ["همش رو گردن طرف می‌ندازم، من مقصر نبودم", 18],
                    ["انقدر تحلیل کردم که دیگه نمی‌دونم چی درسته", 16]
                ]
            },

            {
                q: "چقدر به دیگران برای پیدا کردن رابطه اعتماد داری؟",
                a: [
                    ["کم، خودم باید پیدا کنم", 6],
                    ["خیلی زیاد، دوستام بهترین هماهنگ‌کننده‌ان", 4],
                    ["هیچ‌کس نمی‌دونه من چی می‌خوام", 16],
                    ["به همه می‌گم پیدام کنن، ولی هیچ‌کس موفق نشده", 18]
                ]
            },

            {
                q: "وقتی کسی بهت نزدیک می‌شه، واکنش اولیه‌ات چیه؟",
                a: [
                    ["خوشحال می‌شم و بهش فرصت می‌دم", 2],
                    ["می‌ترسم و فاصله می‌گیرم", 18],
                    ["سعی می‌کنم کنترل کنم که چقدر نزدیک بشه", 12],
                    ["همه‌چیز رو یکباره می‌گم تا ببینم می‌مونه یا می‌ره", 16]
                ]
            },

            {
                q: "آخرین باری که واقعاً به کسی گفتی «دوستت دارم» کی بود؟",
                a: [
                    ["همین چند وقت پیش، و واقعاً منظورم بود", 2],
                    ["چند سال پیش، دیگه تکرار نشد", 14],
                    ["هیچ‌وقت، به کسی نگفتم", 20],
                    ["به کسی گفتم ولی پشیمونم", 16]
                ]
            }

        ];


        // بیشترین امتیاز واقعی ممکن (محاسبه‌ی خودکار به‌جای عدد ثابت اشتباه)
        const maxScore = questions.reduce(
            (sum, item) => sum + Math.max(...item.a.map(pair => pair[1])),
            0
        );


        // ============================================================
        // نمایش سؤال اولیه (جنسیت و سن)
        // ============================================================
        function askGenderAndAge() {
            area.innerHTML = `
                <div class="question" style="margin-bottom: 12px;">
                    🧑‍🤝‍🧑 جنسیتت چیه؟
                </div>

                <div style="display:flex; gap:10px; margin-bottom:18px;">
                    <button class="secondary gender-btn" data-gender="male" style="flex:1; transition:all 0.2s ease; border:1px solid rgba(255,255,255,0.22); background:rgba(255,255,255,0.12); color:#fff; font-weight:600;">
                        🧑 مرد
                    </button>
                    <button class="secondary gender-btn" data-gender="female" style="flex:1; transition:all 0.2s ease; border:1px solid rgba(255,255,255,0.22); background:rgba(255,255,255,0.12); color:#fff; font-weight:600;">
                        👩 زن
                    </button>
                    <button class="secondary gender-btn" data-gender="other" style="flex:1; transition:all 0.2s ease; border:1px solid rgba(255,255,255,0.22); background:rgba(255,255,255,0.12); color:#fff; font-weight:600;">
                        🧑‍🎤 غیر
                    </button>
                </div>

                <div class="question" style="margin-bottom: 12px;">
                    🎂 سنت چنده؟
                </div>

                <input 
                    type="number" 
                    id="ageInput" 
                    min="15" 
                    max="70" 
                    placeholder="مثلاً 25" 
                    style="width:100%; padding:12px; border-radius:10px; border:1px solid rgba(255,255,255,0.18); margin-bottom:16px; font-size:1rem; background:rgba(255,255,255,0.1); color:#fff;"
                />

                <button class="primary" id="confirmGenderAge">
                    ادامه بده 💍
                </button>
            `;

            document.querySelectorAll(".gender-btn").forEach(btn => {

                btn.onclick = () => {

                    document.querySelectorAll(".gender-btn").forEach(b => {
                        b.classList.remove("active");
                        b.style.background = "rgba(255,255,255,0.12)";
                        b.style.borderColor = "rgba(255,255,255,0.22)";
                        b.style.borderColor = "rgba(255,255,255,0.06)";
                        b.style.transform = "scale(1)";
                    });

                    btn.classList.add("active");
                    btn.style.background = "rgba(251,191,36,0.15)";
                    btn.style.borderColor = "#fbbf24";
                    btn.style.transform = "scale(1.04)";

                    userGender = btn.dataset.gender;

                };

            });

            document.getElementById("confirmGenderAge").onclick = () => {
                const age = Number(document.getElementById("ageInput").value);
                if (!age || age < 15 || age > 70) {
                    alert("یک سن معتبر بین ۱۵ تا ۷۰ وارد کن.");
                    return;
                }
                if (!document.querySelector(".gender-btn.active")) {
                    alert("جنسیتت رو انتخاب کن.");
                    return;
                }
                userAge = age;
                transitionArea(() => renderQuestion());
            };
        }


        // ============================================================
        // نمایش سؤال
        // ============================================================
        function renderQuestion() {

            // هر سؤال جدید که میاد، قفلِ جلوگیری از کلیک تکراری باز می‌شه
            area.dataset.locked = "false";

            const item = questions[index];
            const shuffled = shuffle(item.a);

            area.innerHTML = `
                <div class="progress-box">
                    <p style="font-size:0.9rem; color:var(--muted);">
                        💍 سؤال ${index + 1} از ${questions.length}
                    </p>
                    <div class="bar">
                        <span style="width:${(index / questions.length) * 100}%"></span>
                    </div>
                </div>

                <div class="question" style="font-size:1.1rem; margin-bottom:16px; line-height:1.6;">
                    ${item.q}
                </div>

                <div>
                    ${shuffled.map((a, i) => `
                        <button class="secondary answer-btn" data-id="${i}" style="width:100%; text-align:right; padding:12px 16px; margin-bottom:8px; border-radius:10px; background:rgba(255,255,255,0.12); border:1px solid rgba(255,255,255,0.2); color:#fff; cursor:pointer; font-size:0.95rem; display:flex; align-items:center; gap:10px; transition:all 0.2s ease; font-weight:500;">
                            <span style="display:inline-flex; align-items:center; justify-content:center; width:28px; height:28px; border-radius:50%; background:rgba(251,191,36,0.15); color:#fbbf24; font-weight:bold; font-size:0.8rem; flex-shrink:0;">${String.fromCharCode(65 + i)}</span>
                            <span>${a[0]}</span>
                        </button>
                    `).join("")}
                </div>
            `;

            document.querySelectorAll(".answer-btn").forEach(btn => {

                btn.onclick = () => {

                    // جلوگیری از کلیک همزمان/تکراری روی چند گزینه
                    if (area.dataset.locked === "true") return;
                    area.dataset.locked = "true";

                    const answer = shuffled[Number(btn.dataset.id)];
                    totalScore += answer[1];

                    document.querySelectorAll(".answer-btn").forEach(b => {
                        b.style.pointerEvents = "none";
                        b.style.opacity = b === btn ? "1" : "0.35";
                    });

                    btn.style.background = "rgba(251, 191, 36, 0.15)";
                    btn.style.borderColor = "#fbbf24";

                    setTimeout(() => {
                        index++;
                        if (index >= questions.length) {
                            transitionArea(() => finish());
                        } else {
                            transitionArea(() => renderQuestion());
                        }
                    }, 350);

                };

            });
        }


        // ============================================================
        // نتیجه‌گیری
        // ============================================================
        function finish() {
            let title = "";
            let reason = "";
            let longText = "";
            let advice = "";

            const percentage = Math.min(
                100,
                Math.round((totalScore / maxScore) * 100)
            );

            const genderText = userGender === "male" ? "مرد" : userGender === "female" ? "زن" : "آدم";

            // پیشوندهای مخاطب‌محور — حالا هر سه جنسیت درست هندل می‌شن
            const prefixJan = userGender === "male" ? "پسر" : userGender === "female" ? "دختر" : "رفیق";
            const prefixAziz = userGender === "male" ? "برادر" : userGender === "female" ? "خواهر" : "رفیق";
            const prefixDadash = userGender === "male" ? "داداش" : userGender === "female" ? "خواهر" : "رفیق";

            if (percentage <= 25) {
                title = "💚 مشکل از تو نیست، هنوز";
                reason = "تو آدم نسبتاً سالمی هستی";
                longText = `جواب‌هات نشون میده که تو یک ${genderText} ${userAge} ساله‌ای با ذهنیت نسبتاً سالم. مشکل اصلی‌ات اینه که هنوز به آدم‌های درست برخورد نکردی.`;
                advice = "همین مسیر رو ادامه بده، ولی کمتر به آدم‌هایی که ارزشت رو نمی‌دونن، فرصت بده.";
            } else if (percentage <= 50) {
                title = "💛 یه کم خودتو دست کم گرفتی";
                reason = "ترس از رد شدن و کمال‌گرایی";
                longText = `${prefixJan} جان، تو ${userAge} سالته و هنوز فکر می‌کنی باید کامل باشی تا کسی دوستت داشته باشه. این طرز فکر، بزرگ‌ترین دشمنته.`;
                advice = "بی‌نقص بودن رو ول کن. اجازه بده آدما تو رو با همون نقص‌هات ببینن. اونایی که موندن، ارزششون رو دارن.";
            } else if (percentage <= 70) {
                title = "🧡 مشکل اصلی: الگوهای تکراری";
                reason = "همون اشتباهات رو با آدم‌های مختلف تکرار می‌کنی";
                longText = `${prefixAziz} عزیز، تو ${userAge} سالت می‌گه که وقتش رسیده یه نگاه جدی به الگوهای رابطه‌ای‌ت بندازی. هر بار یه آدم جدید، ولی همون قصه‌ی تکراری.`;
                advice = "یک دفتر بردار و بنویس: «آخرین رابطه‌ام چطور تموم شد؟»، «چه نقشی داشتم؟»، «چرا دوباره تکرار شد؟». جواب‌ها رو پیدا کن.";
            } else if (percentage <= 85) {
                title = "❤️‍🩹 دردناک ولی قابل حل";
                reason = "ترس از صمیمیت و تعهد";
                longText = `${userAge} ساله‌ای و هنوز از نزدیک شدن می‌ترسی. هر بار که کسی بهت نزدیک می‌شه، یا فرار می‌کنی، یا اونقدر سخت می‌گیری که خودش بره.`;
                advice = "ترس‌هات رو بنویس. از چی می‌ترسی؟ از رد شدن؟ از وابسته شدن؟ از دست دادن کنترل؟ بعد یکی‌یکی باهاشون روبرو شو.";
            } else {
                title = "🖤 بی‌رحمی کامل";
                reason = "خودت بزرگ‌ترین دشمن خودتی";

                longText = [
                    `${prefixDadash}، بیا رک باشیم. تو ${userAge} سالته و هنوز مجردی چون:`,
                    "- یا از خودت متنفری و نمی‌ذاری کسی بهت نزدیک بشه",
                    "- یا آنقدر توقعات غیرواقعی داری که هیچکس بهش نمی‌رسه",
                    "- یا هنوز به یه رابطه‌ی تموم‌شده چسبیدی",
                    "- یا از تعهد فرار می‌کنی",
                    "این چهار تا رو بخون، حداقل یکی‌ش مال توئه."
                ].join("\n");

                advice = "به یه تراپیست مراجعه کن. شوخی نمی‌کنم. این حرف‌ها از یه ربات نیست، از یه الگوریتمه که ۲۰ تا سؤال ازت پرسیده. وقتی الگوریتم بهت می‌گه مشکل داری، یعنی واقعاً مشکل داری.";
            }

            let ageNote = "";
            if (userAge < 22) {
                ageNote = "هنوز ۲۲ سالت نشده، زیاد به خودت سخت نگیر. ولی این بهانه رو تا ۳۰ سالگی نمی‌تونی استفاده کنی.";
            } else if (userAge < 30) {
                ageNote = "اوایل ۲۰ سالگی تموم شده، وقتشه جدی‌تر به قضیه نگاه کنی. نه اینکه عجله کنی، ولی دیگه وقت تلف کردن نیست.";
            } else if (userAge < 40) {
                ageNote = "۳۰ سالگی رو رد کردی. دیگه وقت «نمی‌دونم چی می‌خوام» تموم شده. یا راهت رو پیدا کن، یا بپذیر که تنهایی رو انتخاب کردی.";
            } else {
                ageNote = "۴۰ به بالا. دیگه وقت بهونه‌گیری نیست. یا با تنهایی‌ات آشتی کن، یا یه تغییر اساسی توی زندگیت ایجاد کن.";
            }


            // ذخیره در localStorage
            try {
                localStorage.setItem("badbakhtiSingle", JSON.stringify({
                    score: totalScore,
                    percentage: percentage,
                    reason: reason,
                    age: userAge,
                    gender: userGender,
                    date: new Date().toLocaleDateString("fa-IR")
                }));
            } catch (e) {}


            // نسخه‌ی HTML-امنِ متن (خط‌های \n به <br> تبدیل می‌شن تا درست نمایش داده بشن)
            const longTextHTML = longText.replace(/\n/g, "<br>");


            area.innerHTML = `
                <div class="story-card">

                    <h2>💍 نتیجه‌ی بی‌رحم</h2>

                    <div style="font-size:48px; margin: 10px 0;">
                        ${percentage <= 25 ? "💚" : percentage <= 50 ? "💛" : percentage <= 70 ? "🧡" : percentage <= 85 ? "❤️‍🩹" : "🖤"}
                    </div>

                    <h1 style="margin: 10px 0; font-size: 1.5rem;">
                        ${title}
                    </h1>

                    <div style="background: rgba(255,255,255,0.07); padding: 16px; border-radius: 12px; margin: 14px 0; line-height: 1.8; font-size: 1.05rem;">

                        <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid rgba(255,255,255,0.05);">
                            <span>👤 جنسیت</span>
                            <span><b>${genderText}</b></span>
                        </div>

                        <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid rgba(255,255,255,0.05);">
                            <span>🎂 سن</span>
                            <span><b>${userAge} سال</b></span>
                        </div>

                        <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid rgba(255,255,255,0.05);">
                            <span>📊 امتیاز بدبختی رابطه‌ای</span>
                            <span><b>${percentage}%</b></span>
                        </div>

                        <div style="display:flex; justify-content:space-between; padding:8px 0;">
                            <span>💔 دلیل اصلی</span>
                            <span><b>${reason}</b></span>
                        </div>

                    </div>

                    <div style="background: rgba(255,255,255,0.04); padding: 16px; border-radius: 12px; margin: 14px 0; line-height: 1.8; font-size: 1rem;">
                        <b>🔍 تحلیل:</b><br><br>
                        ${longTextHTML}
                    </div>

                    <div style="background: rgba(251,191,36,0.08); padding: 16px; border-radius: 12px; margin: 14px 0; line-height: 1.8; font-size: 1rem; border-right: 3px solid #fbbf24;">
                        <b>💡 راهکار:</b><br><br>
                        ${advice}
                    </div>

                    <div style="background: rgba(255,255,255,0.03); padding: 16px; border-radius: 12px; margin: 14px 0; line-height: 1.8; font-size: 0.95rem; color: var(--muted);">
                        <b>📌 نکته‌ی سنی:</b><br><br>
                        ${ageNote}
                    </div>

                    <button class="primary" id="restartSingle" style="margin-bottom: 10px;">
                        دوباره خودشکنی کن 💍
                    </button>

                    <button class="secondary" id="shareSingle" style="width: 100%;">
                        کپی نتیجه 📋
                    </button>

                </div>
            `;


            document.getElementById("restartSingle").onclick = () => {
                index = 0;
                totalScore = 0;
                userGender = "male";
                userAge = 25;
                transitionArea(() => askGenderAndAge());
            };


            document.getElementById("shareSingle").onclick = () => {
                // برای متن کپی‌شونده، همون \n خام بهتره (نه <br>)
                const text = `💍 نتیجه تست «چرا هنوز مجردم؟»\n\n` +
                    `👤 جنسیت: ${genderText}\n` +
                    `🎂 سن: ${userAge} سال\n` +
                    `📊 درصد بدبختی رابطه‌ای: ${percentage}%\n` +
                    `💔 دلیل اصلی: ${reason}\n\n` +
                    `🔍 تحلیل:\n${longText}\n\n` +
                    `💡 راهکار:\n${advice}\n\n` +
                    `📌 ${ageNote}\n\n` +
                    `جعبه ابزار بدبختی:\nhttps://xixtelegram.github.io/Badbakhti_Tools/`;

                navigator.clipboard.writeText(text).then(() => {
                    const btn = document.getElementById("shareSingle");
                    btn.innerText = "کپی شد! ✅";
                    setTimeout(() => {
                        btn.innerText = "کپی نتیجه 📋";
                    }, 2000);
                });
            };
        }


        // ============================================================
        // شروع
        // ============================================================
        document.getElementById("startSingle").onclick = () => {
            transitionArea(() => askGenderAndAge());
        };

    }

};
