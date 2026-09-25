export default {

    id: "wheel",

    icon: "🎡",

    title: "گردونه بدبختی",

    description:
        "بچرخون ببین امروز کدوم ابزار بدبختی قراره سراغت بیاد.",

    buttonText:
        "بچرخون گردونه 🎡",


    html: `

        <style>

            .wheel-wrapper {

                width: 100%;

                display: flex;

                flex-direction: column;

                align-items: center;

                justify-content: center;

                margin-top: 10px;

                overflow: hidden;

            }


            .wheel-title {

                text-align: center;

                margin-bottom: 25px;

            }


            .wheel-title h3 {

                margin: 0 0 8px;

                font-size: 24px;

            }


            .wheel-title p {

                margin: 0;

                color: var(--muted);

                line-height: 1.8;

                font-size: 14px;

            }


            /*
            =========================
            گردونه
            =========================
            */

            .wheel-container {

                position: relative;

                width: min(580px, 88vw);

                aspect-ratio: 1 / 1;

                margin: 10px auto 25px;

            }


            /*
            =========================
            فلش
            =========================
            */

            .wheel-pointer {

                position: absolute;

                z-index: 30;

                top: -5px;

                left: 50%;

                transform: translateX(-50%);

                width: 0;

                height: 0;

                border-left: 18px solid transparent;

                border-right: 18px solid transparent;

                border-top: 42px solid var(--red);

                filter:

                    drop-shadow(
                        0 5px 8px
                        rgba(0,0,0,.45)
                    );

            }


            .wheel-pointer::after {

                content: "";

                position: absolute;

                top: -42px;

                left: -9px;

                width: 18px;

                height: 18px;

                background: var(--red);

                border-radius: 50%;

            }


            /*
            =========================
            خود گردونه
            =========================
            */

            .wheel {

                position: absolute;

                inset: 8px;

                border-radius: 50%;

                overflow: hidden;

                border:
                    7px solid
                    rgba(255,255,255,.12);

                box-shadow:

                    0 20px 60px
                    rgba(0,0,0,.45),

                    inset 0 0 0 2px
                    rgba(255,255,255,.08);

                transform: rotate(0deg);

                transition:
                    transform
                    5.5s
                    cubic-bezier(.12,.72,.08,1);

                background: #182b3d;

            }


            .wheel svg {

                width: 100%;

                height: 100%;

                display: block;

                overflow: visible;

            }


            .wheel-segment {

                stroke:
                    rgba(255,255,255,.22);

                stroke-width: 2;

            }


            /*
            =========================
            متن گردونه
            =========================
            */

            .wheel-label {

                fill: white;

                font-family:
                    Tahoma,
                    Arial,
                    sans-serif;

                font-weight: bold;

                font-size: 17px;

                text-anchor: middle;

                dominant-baseline: middle;

                pointer-events: none;

                paint-order: stroke;

                stroke:
                    rgba(0,0,0,.35);

                stroke-width: 3px;

                stroke-linejoin: round;

            }


            .wheel-label-icon {

                font-size: 27px;

                stroke: none;

            }


            .wheel-label-title {

                font-size: 17px;

                stroke-width: 3px;

            }


            /*
            =========================
            مرکز
            =========================
            */

            .wheel-center {

                position: absolute;

                z-index: 25;

                top: 50%;

                left: 50%;

                width: 88px;

                height: 88px;

                transform:
                    translate(-50%, -50%);

                border-radius: 50%;

                display: flex;

                align-items: center;

                justify-content: center;

                background:

                    radial-gradient(
                        circle at 35% 30%,
                        #304b63,
                        #142434 70%
                    );

                border:
                    5px solid
                    rgba(255,255,255,.18);

                box-shadow:

                    0 8px 25px
                    rgba(0,0,0,.5),

                    inset 0 0 20px
                    rgba(255,255,255,.08);

                font-size: 42px;

                user-select: none;

            }


            .wheel-center::after {

                content: "";

                position: absolute;

                inset: -8px;

                border-radius: 50%;

                border:
                    2px solid
                    rgba(255,255,255,.08);

            }


            /*
            =========================
            دکمه چرخش
            =========================
            */

            .wheel-spin {

                width: 100%;

                padding: 16px;

                border-radius: 17px;

                background:

                    linear-gradient(
                        135deg,
                        var(--pink),
                        #386c9d
                    );

                color: white;

                font-size: 18px;

                font-weight: bold;

                box-shadow:

                    0 10px 30px
                    rgba(43,82,120,.3);

                transition: .2s;

            }


            .wheel-spin:hover {

                transform:
                    translateY(-2px);

                box-shadow:

                    0 14px 35px
                    rgba(43,82,120,.4);

            }


            .wheel-spin:active {

                transform:
                    scale(.98);

            }


            .wheel-spin:disabled {

                opacity: .55;

                cursor: not-allowed;

                transform: none;

            }


            /*
            =========================
            نتیجه
            =========================
            */

            .wheel-result {

                width: 100%;

                margin-top: 22px;

                padding: 22px;

                border-radius: 22px;

                background: #ffffff08;

                border:
                    1px solid
                    #ffffff0d;

                text-align: center;

                display: none;

            }


            .wheel-result.show {

                display: block;

                animation:
                    wheelResultAppear
                    .4s
                    ease;

            }


            @keyframes wheelResultAppear {

                from {

                    opacity: 0;

                    transform:
                        translateY(10px)
                        scale(.97);

                }

                to {

                    opacity: 1;

                    transform:
                        translateY(0)
                        scale(1);

                }

            }


            .wheel-result-icon {

                font-size: 48px;

                margin-bottom: 8px;

            }


            .wheel-result-title {

                font-size: 24px;

                font-weight: bold;

                margin-bottom: 8px;

            }


            .wheel-result-text {

                color: var(--muted);

                font-size: 14px;

                line-height: 1.9;

                margin-bottom: 18px;

            }


            .wheel-open {

                width: 100%;

                padding: 14px;

                border-radius: 15px;

                background: var(--pink);

                color: white;

                font-weight: bold;

                font-size: 16px;

            }


            /*
            =========================
            موبایل
            =========================
            */

            @media(max-width:600px) {

                .wheel-container {

                    width: min(82vw, 350px);

                    margin-top: 15px;

                    margin-bottom: 22px;

                }


                .wheel {

                    inset: 3px;

                    border-width: 5px;

                }


                .wheel-center {

                    width: 68px;

                    height: 68px;

                    font-size: 33px;

                    border-width: 4px;

                }


                .wheel-label {

                    font-size: 13px;

                    stroke-width: 2.5px;

                }


                .wheel-label-icon {

                    font-size: 22px;

                }


                .wheel-label-title {

                    font-size: 13px;

                }


                .wheel-pointer {

                    top: -4px;

                    border-left-width: 14px;

                    border-right-width: 14px;

                    border-top-width: 34px;

                }


                .wheel-pointer::after {

                    top: -34px;

                    left: -7px;

                    width: 14px;

                    height: 14px;

                }

            }


            /*
            =========================
            موبایل خیلی کوچک
            =========================
            */

            @media(max-width:380px) {

                .wheel-container {

                    width: 78vw;

                }


                .wheel-center {

                    width: 60px;

                    height: 60px;

                    font-size: 29px;

                }


                .wheel-label {

                    font-size: 11px;

                }


                .wheel-label-icon {

                    font-size: 19px;

                }


                .wheel-label-title {

                    font-size: 11px;

                }

            }

        </style>


        <h2>
            🎡 گردونه بدبختی
        </h2>


        <p class="desc">
            نمی‌دونی با کدوم ابزار شروع کنی؟
            بذار خود بدبختی برات تصمیم بگیره. 💀
        </p>


        <div class="wheel-wrapper">

            <div class="wheel-title">

                <h3>
                    🎯 شانست رو امتحان کن
                </h3>

                <p>
                    گردونه یکی از ابزارها رو تصادفی برات انتخاب می‌کنه.
                </p>

            </div>


            <div class="wheel-container">

                <div class="wheel-pointer"></div>


                <div
                    class="wheel"
                    id="badbakhtiWheel"
                ></div>


                <div class="wheel-center">
                    💀
                </div>

            </div>


            <button
                class="wheel-spin"
                id="wheelSpinBtn"
            >
                🎡 بچرخون!
            </button>


            <div
                class="wheel-result"
                id="wheelResult"
            ></div>

        </div>

    `,


    init() {

        const wheel =
            document.getElementById(
                "badbakhtiWheel"
            );


        const spinButton =
            document.getElementById(
                "wheelSpinBtn"
            );


        const result =
            document.getElementById(
                "wheelResult"
            );


        if (
            !wheel ||
            !spinButton ||
            !result
        ) {

            return;

        }


        /*
        =========================
        ابزارهای گردونه
        =========================
        */

        const wheelTools = [

            {
                id: "age",
                title: "سن یک بدبخت",
                icon: "🎂"
            },

            {
                id: "badbakhti",
                title: "چقدر بدبختی؟",
                icon: "💀"
            },

            {
                id: "block",
                title: "بلاک شده‌ای؟",
                icon: "🚫"
            },

            {
                id: "brain",
                title: "مغزت چه وضعیه؟",
                icon: "🧠"
            },

            {
                id: "decision",
                title: "تصمیم‌گیر",
                icon: "🤔"
            },

            {
                id: "dice",
                title: "تاس بدبختی",
                icon: "🎲"
            },

            {
                id: "fal",
                title: "فال بدبختی",
                icon: "🔮"
            },

            {
                id: "friend",
                title: "دوست خوب یا بد؟",
                icon: "👥"
            },

            {
                id: "life",
                title: "چقدر وقت داری؟",
                icon: "⏳"
            },

            {
                id: "madrak",
                title: "مدرک بدبختی",
                icon: "📜"
            },

            {
                id: "message",
                title: "بهش پیام بدم؟",
                icon: "💬"
            },

            {
                id: "migration",
                title: "مهاجرت",
                icon: "✈️"
            },

            {
                id: "money",
                title: "پولم چقدر می‌ارزه؟",
                icon: "💸"
            },

            {
                id: "personality",
                title: "شخصیتت چیه؟",
                icon: "🧩"
            },

            {
                id: "phone",
                title: "اعتیاد به گوشی",
                icon: "📱"
            },

            {
                id: "situationship",
                title: "رابطه‌تون چیه؟",
                icon: "❤️"
            },

            {
                id: "sleep",
                title: "الان باید بخوابم؟",
                icon: "😴"
            },

            {
                id: "versus",
                title: "کدومتون بدبخت‌ترید؟",
                icon: "⚔️"
            },

            {
                id: "why-single",
                title: "چرا سینگلی؟",
                icon: "💔"
            }

        ];


        /*
        =========================
        ساخت SVG
        =========================
        */

        const size = 1000;

        const center = size / 2;

        const radius = 465;

        const count =
            wheelTools.length;

        const angle =
            360 / count;


        let svg = `

            <svg
                viewBox="0 0 ${size} ${size}"
                xmlns="http://www.w3.org/2000/svg"
            >

                <g
                    transform="rotate(-90 ${center} ${center})"
                >

        `;


        const segmentColors = [

            "#2b5278",
            "#23496d",
            "#315f87",
            "#1f405f",
            "#396d96",
            "#274f72"

        ];


        /*
        =========================
        مختصات
        =========================
        */

        function polarToCartesian(
            cx,
            cy,
            r,
            degrees
        ) {

            const radians =
                degrees *
                Math.PI /
                180;

            return {

                x:
                    cx +
                    r *
                    Math.cos(radians),

                y:
                    cy +
                    r *
                    Math.sin(radians)

            };

        }


        function createArc(
            startAngle,
            endAngle
        ) {

            const start =
                polarToCartesian(
                    center,
                    center,
                    radius,
                    startAngle
                );


            const end =
                polarToCartesian(
                    center,
                    center,
                    radius,
                    endAngle
                );


            const largeArc =
                endAngle - startAngle > 180
                ? 1
                : 0;


            return [

                "M",
                center,
                center,

                "L",
                start.x,
                start.y,

                "A",
                radius,
                radius,
                0,
                largeArc,
                1,
                end.x,
                end.y,

                "Z"

            ].join(" ");

        }


        /*
        =========================
        ساخت قطاع و متن
        =========================
        */

        wheelTools.forEach(
            (tool, index) => {

                const start =
                    index * angle;


                const end =
                    start + angle;


                const middle =
                    start + angle / 2;


                const color =
                    segmentColors[
                        index %
                        segmentColors.length
                    ];


                svg += `

                    <path

                        class="wheel-segment"

                        d="${createArc(
                            start,
                            end
                        )}"

                        fill="${color}"

                    ></path>

                `;


                /*
                محل متن
                */

                const textRadius =
                    radius * .67;


                const textPoint =
                    polarToCartesian(
                        center,
                        center,
                        textRadius,
                        middle
                    );


                /*
                کوتاه کردن عنوان‌های خیلی بلند
                */

                let title =
                    tool.title;


                /*
                =========================
                شکستن عنوان به دو خط
                =========================
                */

                let words =
                    title.split(" ");


                let line1 = "";

                let line2 = "";


                if(words.length <= 1) {

                    line1 =
                        title;

                }

                else {

                    words.forEach(
                        word => {

                            const test =
                                line1
                                ? line1 +
                                  " " +
                                  word
                                : word;


                            if(
                                test.length <= 8
                            ){

                                line1 =
                                    test;

                            }

                            else{

                                line2 +=
                                    (
                                        line2
                                        ? " "
                                        : ""
                                    ) +
                                    word;

                            }

                        }
                    );

                }


                /*
                اگر خط دوم خیلی بلند بود
                */

                if(
                    line2.length > 10
                ){

                    line2 =
                        line2.slice(
                            0,
                            9
                        ) +
                        "…";

                }


                /*
                زاویه متن
                */

                let textRotation =
                    middle;


                /*
                جلوگیری از وارونه شدن
                متن
                */

                if(
                    middle > 90 &&
                    middle < 270
                ){

                    textRotation =
                        middle + 180;

                }


                svg += `

                    <g

                        transform="
                            translate(
                                ${textPoint.x}
                                ${textPoint.y}
                            )
                            rotate(
                                ${textRotation}
                            )
                        "

                    >

                        <text

                            class="
                                wheel-label
                                wheel-label-icon
                            "

                            x="0"

                            y="-22"

                        >
                            ${tool.icon}
                        </text>


                        ${
                            line2

                            ? `

                                <text

                                    class="
                                        wheel-label
                                        wheel-label-title
                                    "

                                    x="0"

                                    y="2"

                                >
                                    ${line1}
                                </text>


                                <text

                                    class="
                                        wheel-label
                                        wheel-label-title
                                    "

                                    x="0"

                                    y="22"

                                >
                                    ${line2}
                                </text>

                            `

                            :

                            `

                                <text

                                    class="
                                        wheel-label
                                        wheel-label-title
                                    "

                                    x="0"

                                    y="7"

                                >
                                    ${line1}
                                </text>

                            `

                        }

                    </g>

                `;

            }
        );


        svg += `

                </g>


                <circle

                    cx="${center}"

                    cy="${center}"

                    r="${radius}"

                    fill="none"

                    stroke="rgba(255,255,255,.18)"

                    stroke-width="5"

                />


            </svg>

        `;


        wheel.innerHTML =
            svg;


        /*
        =========================
        وضعیت گردونه
        =========================
        */

        let currentRotation = 0;

        let spinning = false;

        let selectedTool = null;


        /*
        =========================
        چرخاندن
        =========================
        */

        spinButton.onclick = () => {

            if(spinning) return;


            spinning = true;

            selectedTool = null;


            result.classList.remove(
                "show"
            );


            spinButton.disabled =
                true;


            spinButton.textContent =
                "💀 داره تصمیم می‌گیره...";


            /*
            انتخاب تصادفی
            */

            const randomIndex =
                Math.floor(
                    Math.random() *
                    count
                );


            /*
            مرکز قطاع
            */

            const targetAngle =
                randomIndex *
                angle +
                angle / 2;


            /*
            تعداد دور
            */

            const extraTurns =
                5 +
                Math.floor(
                    Math.random() * 3
                );


            /*
            قرار دادن قطاع انتخاب‌شده
            زیر فلش
            */

            const targetRotation =

                currentRotation +

                extraTurns * 360 +

                (
                    360 -
                    targetAngle
                );


            currentRotation =
                targetRotation;


            wheel.style.transform =
                `rotate(${currentRotation}deg)`;


            /*
            =========================
            پایان چرخش
            =========================
            */

            setTimeout(() => {

                spinning = false;


                spinButton.disabled =
                    false;


                spinButton.textContent =
                    "🎡 دوباره بچرخون";


                selectedTool =
                    wheelTools[
                        randomIndex
                    ];


                result.innerHTML = `

                    <div
                        class="wheel-result-icon"
                    >
                        ${selectedTool.icon}
                    </div>


                    <div
                        class="wheel-result-title"
                    >
                        ${selectedTool.title}
                    </div>


                    <div
                        class="wheel-result-text"
                    >
                        گردونه تصمیمش رو گرفته!
                        <br>
                        این ابزار امروز مال توئه. 💀
                    </div>


                    <button
                        class="wheel-open"
                        id="wheelOpenTool"
                    >
                        باز کردن ابزار
                        ${selectedTool.icon}
                    </button>

                `;


                result.classList.add(
                    "show"
                );


                const openButton =
                    document.getElementById(
                        "wheelOpenTool"
                    );


                openButton.onclick = () => {

                    const targetButton =
                        document.querySelector(
                            `[data-tool="${selectedTool.id}"]`
                        );


                    if(targetButton){

                        targetButton.click();

                        return;

                    }


                    if(
                        typeof window.openApp ===
                        "function"
                    ){

                        window.openApp(
                            selectedTool.id
                        );

                    }

                };

            }, 5700);

        };

    }

};
