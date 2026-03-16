document.addEventListener("DOMContentLoaded", () => {
    const generateBtn = document.getElementById("generate-btn");
    const resultContainer = document.getElementById("dinner-result");
    const themeToggle = document.getElementById("theme-toggle");
    const cuisineSelect = document.getElementById("cuisine-select");
    const moodSelect = document.getElementById("mood-select");

    const dinnerMenus = [
        { name: "김치찌개", cuisine: "한식", moods: ["든든한", "따뜻한", "매운"], emoji: "🍲" },
        { name: "비빔밥", cuisine: "한식", moods: ["든든한", "가벼운"], emoji: "🥗" },
        { name: "삼겹살", cuisine: "한식", moods: ["든든한"], emoji: "🥓" },
        { name: "칼국수", cuisine: "한식", moods: ["따뜻한", "든든한"], emoji: "🍜" },
        { name: "마라탕", cuisine: "중식", moods: ["매운", "든든한"], emoji: "🥘" },
        { name: "짜장면", cuisine: "중식", moods: ["든든한"], emoji: "🍝" },
        { name: "짬뽕", cuisine: "중식", moods: ["매운", "따뜻한"], emoji: "🍜" },
        { name: "탕수육", cuisine: "중식", moods: ["든든한"], emoji: "🍤" },
        { name: "초밥", cuisine: "일식", moods: ["가벼운"], emoji: "🍣" },
        { name: "돈카츠", cuisine: "일식", moods: ["든든한"], emoji: "🍛" },
        { name: "라멘", cuisine: "일식", moods: ["따뜻한", "든든한"], emoji: "🍜" },
        { name: "우동", cuisine: "일식", moods: ["따뜻한", "가벼운"], emoji: "🥢" },
        { name: "파스타", cuisine: "양식", moods: ["가벼운", "든든한"], emoji: "🍝" },
        { name: "스테이크", cuisine: "양식", moods: ["든든한"], emoji: "🥩" },
        { name: "리조또", cuisine: "양식", moods: ["따뜻한"], emoji: "🍚" },
        { name: "샐러드 볼", cuisine: "양식", moods: ["가벼운"], emoji: "🥗" },
        { name: "떡볶이", cuisine: "분식", moods: ["매운", "든든한"], emoji: "🌶️" },
        { name: "김밥", cuisine: "분식", moods: ["가벼운"], emoji: "🍙" },
        { name: "라볶이", cuisine: "분식", moods: ["매운", "따뜻한"], emoji: "🍲" },
        { name: "햄버거", cuisine: "패스트푸드", moods: ["든든한"], emoji: "🍔" },
        { name: "치킨", cuisine: "패스트푸드", moods: ["든든한"], emoji: "🍗" },
        { name: "샌드위치", cuisine: "패스트푸드", moods: ["가벼운"], emoji: "🥪" }
    ];

    // --- 테마 전환 기능 ---
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        themeToggle.innerText = "☀️";
    }

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        const isDark = document.body.classList.contains("dark-mode");
        themeToggle.innerText = isDark ? "☀️" : "🌙";
        localStorage.setItem("theme", isDark ? "dark" : "light");
    });

    // --- 저녁 추천 기능 ---
    function pickRandomItem(items) {
        return items[Math.floor(Math.random() * items.length)];
    }

    function getFilteredMenus() {
        const selectedCuisine = cuisineSelect.value;
        const selectedMood = moodSelect.value;

        return dinnerMenus.filter((menu) => {
            const cuisineMatched = selectedCuisine === "all" || menu.cuisine === selectedCuisine;
            const moodMatched = selectedMood === "all" || menu.moods.includes(selectedMood);
            return cuisineMatched && moodMatched;
        });
    }

    function renderRecommendation(menu, usedFallbackPool) {
        const fallbackMessage = usedFallbackPool
            ? "<p class=\"fallback\">선택한 조건에 맞는 메뉴가 없어 전체 메뉴에서 추천했어요.</p>"
            : "";

        resultContainer.innerHTML = `
            <div class="result-card">
                <p class="result-emoji">${menu.emoji}</p>
                <h2>${menu.name}</h2>
                <p class="result-meta">${menu.cuisine} · ${menu.moods.join(", ")}</p>
                ${fallbackMessage}
            </div>
        `;
    }

    function recommendDinner() {
        const filteredMenus = getFilteredMenus();
        const usedFallbackPool = filteredMenus.length === 0;
        const pool = usedFallbackPool ? dinnerMenus : filteredMenus;
        const pickedMenu = pickRandomItem(pool);
        renderRecommendation(pickedMenu, usedFallbackPool);
    }

    generateBtn.addEventListener("click", recommendDinner);
});
