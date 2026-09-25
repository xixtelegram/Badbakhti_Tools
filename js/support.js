// js/support.js
// Support Widget - فایل کاملا مستقل

(function() {
    
    // CSS
    const style = document.createElement("style");
    style.textContent = `
        .support-widget-button {
            position: fixed;
            bottom: 25px;
            left: 25px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: #2b5278;
            border: none;
            cursor: pointer;
            box-shadow: 0 8px 25px rgba(43, 82, 120, 0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28px;
            transition: all 0.3s ease;
            z-index: 999;
        }

        .support-widget-button:hover {
            transform: scale(1.1);
            box-shadow: 0 12px 35px rgba(43, 82, 120, 0.6);
        }

        .support-widget-button:active {
            transform: scale(0.95);
        }

        .support-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            backdrop-filter: blur(4px);
            animation: fadeIn 0.3s ease;
        }

        .support-modal.active {
            display: flex;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }

        .support-modal-content {
            background: linear-gradient(145deg, var(--card2), var(--card));
            border: 1px solid rgba(255, 255, 255, 0.07);
            border-radius: 28px;
            padding: 35px;
            max-width: 450px;
            width: 90%;
            text-align: center;
            box-shadow: 0 25px 70px rgba(0, 0, 0, 0.3);
            animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .support-modal-emoji {
            font-size: 50px;
            margin-bottom: 15px;
        }

        .support-modal-title {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 15px;
            color: var(--text);
        }

        .support-modal-text {
            font-size: 15px;
            line-height: 2;
            color: var(--muted);
            margin-bottom: 30px;
        }

        .support-modal-buttons {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .support-modal-btn {
            padding: 14px 20px;
            border-radius: 15px;
            border: none;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-block;
        }

        .support-modal-btn-primary {
            background: #2b5278;
            color: white;
        }

        .support-modal-btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(43, 82, 120, 0.4);
        }

        .support-modal-btn-secondary {
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .support-modal-btn-secondary:hover {
            background: rgba(255, 255, 255, 0.15);
            border-color: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
        }

        .support-modal-close {
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 12px;
            cursor: pointer;
            margin-top: 20px;
            font-size: 14px;
            transition: 0.3s ease;
        }

        .support-modal-close:hover {
            background: rgba(255, 255, 255, 0.2);
        }

        @media(max-width: 600px) {
            .support-widget-button {
                width: 55px;
                height: 55px;
                font-size: 24px;
                bottom: 15px;
                left: 15px;
            }

            .support-modal-content {
                padding: 25px;
                border-radius: 22px;
            }

            .support-modal-title {
                font-size: 20px;
            }
        }
    `;

    document.head.appendChild(style);

    // HTML
    const container = document.createElement("div");

    container.innerHTML = `
        <button class="support-widget-button" id="supportBtn" title="پشتیبانی">
            💬
        </button>

        <div class="support-modal" id="supportModal">
            <div class="support-modal-content">

                <div class="support-modal-emoji">
                    🤝
                </div>
                
                <div class="support-modal-title">
                    سلام بد‌بخت عزیز
                </div>

                <div class="support-modal-text">
                    اگه می‌خوای از بدبختی‌ها و باگ‌های ابزار‌ها بگی یا حتی پیشنهاد ابزار جدیدی داری بهمون پیام بده 📨 (بافیلتر شکن روشن کلیک کن)
                </div>

                <div class="support-modal-buttons">

                    <a 
                        href="https://t.me/XIXStrawberry?direct" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        class="support-modal-btn support-modal-btn-primary"
                    >
                        💬 پشتیبانی
                    </a>

                    <a 
                        href="https://t.me/XIXStrawberry" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        class="support-modal-btn support-modal-btn-secondary"
                    >
                        📢 کانال
                    </a>

                </div>

                <button class="support-modal-close" id="closeSupport">
                    بسته شود
                </button>

            </div>
        </div>
    `;

    document.body.appendChild(container);

    // JavaScript
    const supportBtn =
        document.getElementById("supportBtn");

    const supportModal =
        document.getElementById("supportModal");

    const closeSupport =
        document.getElementById("closeSupport");


    supportBtn.addEventListener("click", () => {
        supportModal.classList.add("active");
    });


    closeSupport.addEventListener("click", () => {
        supportModal.classList.remove("active");
    });


    supportModal.addEventListener("click", (e) => {

        if (e.target === supportModal) {
            supportModal.classList.remove("active");
        }

    });

})();
