document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-list a');

    // ハンバーガーメニューの開閉
    if (hamburger && navList && document.body) { // 要素が存在するか確認
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('is-active');
            navList.classList.toggle('is-active');
            document.body.classList.toggle('no-scroll');
        });
    }

    // ナビゲーションリンクをクリックした際にメニューを閉じる
    if (navLinks.length > 0) { // 要素が存在するか確認
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // hamburger と navList が存在する場合にのみ実行
                if (hamburger && navList && document.body) {
                    hamburger.classList.remove('is-active');
                    navList.classList.remove('is-active');
                    document.body.classList.remove('no-scroll');
                }
            });
        });
    }

    // スムーズスクロール (オプション: HTMLのscroll-behavior: smooth; で十分な場合も)
    // navLinks.forEach(link => {
    //     link.addEventListener('click', function(e) {
    //         e.preventDefault();
    //         const targetId = this.getAttribute('href');
    //         const targetElement = document.querySelector(targetId);
    //         if (targetElement) {
    //             // ヘッダーが固定されている場合、その高さを考慮してスクロール位置を調整
    //             const headerOffset = document.querySelector('.main-header').offsetHeight;
    //             const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    //             const offsetPosition = elementPosition - headerOffset;

    //             window.scrollTo({
    //                 top: offsetPosition,
    //                 behavior: 'smooth'
    //             });
    //         }
    //     });
    // });
});

// bodyにno-scrollクラスを追加/削除するためのCSSも必要
// style.css に以下を追加:
/*
body.no-scroll {
    overflow: hidden;
}
*/

// お問い合わせフォームのタブ切り替え機能
const tabButtons = document.querySelectorAll('.contact-tabs .tab-button');
const contactFormSections = document.querySelectorAll('.contact-form-section');

// ★★★ ここから修正 ★★★
// tabButtonsが存在する場合にのみ、forEachループを実行する
if (tabButtons.length > 0) {
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 全てのボタンからactiveクラスを削除
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // クリックされたボタンにactiveクラスを追加
            button.classList.add('active');

            // 全てのフォームセクションを非表示に
            contactFormSections.forEach(section => section.classList.remove('active'));
            
            // クリックされたボタンに対応するフォームセクションを表示
            const targetTab = button.dataset.tab;
            const targetElement = document.getElementById(targetTab);
            if (targetElement) { // ターゲット要素が存在するか確認
                targetElement.classList.add('active');
            }
        });
    });

    // ページロード時にURLのハッシュをチェックしてフォームを初期表示
    const initialHash = window.location.hash.substring(1); // #を取り除く
    if (initialHash && document.getElementById(initialHash)) {
        const initialButton = document.querySelector(`.tab-button[data-tab="${initialHash}"]`);
        if (initialButton) {
            initialButton.click(); // クリックイベントを発火させて表示を切り替える
        }
    } else {
        // ハッシュがない場合、または不正なハッシュの場合はデフォルトのタブを表示 (企業案件フォーム)
        // デフォルトのボタンとフォームが存在するか確認
        const defaultButton = document.querySelector('.tab-button[data-tab="corporate-form"]');
        const defaultForm = document.getElementById('corporate-form');
        if (defaultButton && defaultForm) {
            defaultButton.classList.add('active');
            defaultForm.classList.add('active');
        }
    }
}
// ★★★ ここまで修正 ★★★