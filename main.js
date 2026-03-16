document.addEventListener("DOMContentLoaded", () => {
    const generateBtn = document.getElementById("generate-btn");
    const resultContainer = document.getElementById("dinner-result");
    const themeToggle = document.getElementById("theme-toggle");
    const cuisineSelect = document.getElementById("cuisine-select");
    const moodSelect = document.getElementById("mood-select");

    const dinnerMenus = dinnerMenusKo;

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
