// js/support.js
// Support Widget - فایل کاملاً مستقل

(function () {
    const style = document.createElement("style");
    style.textContent = `
        .support-widget-button {
            position: fixed;
            bottom: max(20px, env(safe-area-inset-bottom, 20px));
            left: max(16px, env(safe-area-inset-left, 16px));
            width: 56px;
            height: 56px;
            min-width: 44px;
            min-height: 44px;
            border-radius: 50%;
            background: #2b5278;
            border: none;
            cursor: pointer;
            box-shadow: 0 8px 24px rgba(43, 82, 120, 0.45);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 26px;
            transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.2s ease;
            z-index: 999;
            color: #fff;
        }

        .support-widget-button:hover {
            transform: scale(1.08);
            box-shadow: 0 12px 32px rgba(43, 82, 120, 0.55);
            background: #3a6a9a;
        }

        .support-widget-button:active {
            transform: scale(0.95);
        }

        .support-widget-button[aria-expanded="true"] {
            background: #1e3d5c;
        }

        .support-modal {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.65);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            backdrop-filter: blur(5px);
            padding: 16px;
            padding-bottom: max(16px, env(safe-area-inset-bottom, 16px));
        }

        .support-modal.active {
            display: flex;
            animation: supportFadeIn 0.25s ease;
        }

        @keyframes supportFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        .support-modal-content {
            background: linear-gradient(145deg, #1d2d3d, #182b3d);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 24px;
            padding: 32px 28px;
            max-width: 420px;
            width: 100%;
            text-align: center;
            box-shadow: 0 24px 60px rgba(0, 0, 0, 0.4);
            animation: supportSlideUp 0.28s ease;
            position: relative;
        }

        @keyframes supportSlideUp {
            from {
                opacity: 0;
                transform: translateY(16px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @media (prefers-reduced-motion: reduce) {
            .support-modal.active,
            .support-modal-content {
                animation: none;
            }
            .support-widget-button {
                transition: none;
            }
        }

        .support-modal-emoji {
            font-size: 48px;
            margin-bottom: 12px;
            line-height: 1;
        }

        .support-modal-title {
            font-size: 22px;
            font-weight: bold;
            margin-bottom: 12px;
            color: #f5f9fc;
            line-height: 1.4;
        }

        .support-modal-text {
            font-size: 14px;
            color: #9aabbc;
            line-height: 1.85;
            margin-bottom: 24px;
        }

        .support-modal-buttons {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-bottom: 14px;
        }

        .support-modal-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 14px 18px;
            min-height: 48px;
            border-radius: 14px;
            text-decoration: none;
            font-size: 15px;
            font-weight: 600;
            transition: opacity 0.2s ease, background 0.2s ease;
        }

        .support-modal-btn-primary {
            background: linear-gradient(135deg, #2b5278, #1e3d5c);
            color: #fff;
        }

        .support-modal-btn-primary:hover {
            opacity: 0.92;
        }

        .support-modal-btn-secondary {
            background: rgba(255, 255, 255, 0.08);
            color: #f5f9fc;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .support-modal-btn-secondary:hover {
            background: rgba(255, 255, 255, 0.14);
        }

        .support-modal-close {
            background: transparent;
            border: none;
            color: #9aabbc;
            cursor: pointer;
            font-size: 14px;
            padding: 10px 16px;
            min-height: 44px;
            border-radius: 10px;
            width: 100%;
            transition: color 0.2s ease, background 0.2s ease;
        }

        .support-modal-close:hover {
            color: #f5f9fc;
            background: rgba(255, 255, 255, 0.06);
        }

        .support-modal-btn:focus-visible,
        .support-modal-close:focus-visible,
        .support-widget-button:focus-visible {
            outline: 2px solid #5da9e9;
            outline-offset: 3px;
        }

        @media (max-width: 480px) {
            .support-modal-content {
                padding: 26px 20px;
                border-radius: 20px;
            }

            .support-modal-title {
                font-size: 20px;
            }

            .support-widget-button {
                width: 52px;
                height: 52px;
                font-size: 24px;
            }
        }
    `;

    document.head.appendChild(style);

    const container = document.createElement("div");
    container.innerHTML = `
        <button
            type="button"
            class="support-widget-button"
            id="supportBtn"
            title="پشتیبانی"
            aria-label="باز کردن پشتیبانی"
            aria-expanded="false"
            aria-controls="supportModal"
        >
            💬
        </button>

        <div
            class="support-modal"
            id="supportModal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="supportModalTitle"
            hidden
        >
            <div class="support-modal-content">
                <div class="support-modal-emoji" aria-hidden="true">🤝</div>

                <div class="support-modal-title" id="supportModalTitle">
                    سلام بدبخت عزیز
                </div>

                <div class="support-modal-text">
                    اگه می‌خوای از بدبختی‌ها و باگ‌های ابزارها بگی یا پیشنهاد ابزار جدید داری، بهمون پیام بده.
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

                <button type="button" class="support-modal-close" id="closeSupport">
                    بسته شود
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(container);

    const supportBtn = document.getElementById("supportBtn");
    const supportModal = document.getElementById("supportModal");
    const closeSupport = document.getElementById("closeSupport");

    let lastFocus = null;

    function getFocusable() {
        return supportModal.querySelectorAll(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
    }

    function openModal() {
        lastFocus = document.activeElement;
        supportModal.classList.add("active");
        supportModal.hidden = false;
        supportBtn.setAttribute("aria-expanded", "true");
        const focusables = getFocusable();
        if (focusables.length) focusables[0].focus();
    }

    function closeModal() {
        supportModal.classList.remove("active");
        supportModal.hidden = true;
        supportBtn.setAttribute("aria-expanded", "false");
        if (lastFocus && typeof lastFocus.focus === "function") {
            lastFocus.focus();
        } else {
            supportBtn.focus();
        }
    }

    supportBtn.addEventListener("click", () => {
        if (supportModal.classList.contains("active")) {
            closeModal();
        } else {
            openModal();
        }
    });

    closeSupport.addEventListener("click", closeModal);

    supportModal.addEventListener("click", (e) => {
        if (e.target === supportModal) closeModal();
    });

    document.addEventListener("keydown", (e) => {
        if (!supportModal.classList.contains("active")) return;

        if (e.key === "Escape") {
            e.preventDefault();
            closeModal();
            return;
        }

        if (e.key === "Tab") {
            const focusables = Array.from(getFocusable());
            if (!focusables.length) return;
            const first = focusables[0];
            const last = focusables[focusables.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    });
})();
