(() => {
    const cuisineSelect = document.getElementById("library-cuisine");
    const moodSelect = document.getElementById("library-mood");
    const searchInput = document.getElementById("library-search");
    const grid = document.getElementById("menu-grid");
    const countText = document.getElementById("library-count");

    const cuisineRange = {
        "한식": [9000, 15000],
        "중식": [9000, 17000],
        "일식": [11000, 20000],
        "양식": [12000, 25000],
        "분식": [5000, 12000],
        "패스트푸드": [7000, 13000]
    };

    const moodContext = {
        "든든한": "포만감이 필요한 저녁",
        "가벼운": "부담 적은 저녁",
        "따뜻한": "몸을 데우고 싶은 날",
        "매운": "스트레스 해소가 필요한 날"
    };

    function getPriceRange(menu) {
        const base = cuisineRange[menu.cuisine] || [9000, 15000];
        const lower = base[0];
        let upper = base[1];
        if (menu.moods.includes("든든한")) upper += 1000;
        if (menu.moods.includes("매운")) upper += 500;
        return `${lower.toLocaleString()}~${upper.toLocaleString()}원`;
    }

    function getRecommendationComment(menu) {
        const moodLabel = menu.moods.map((mood) => moodContext[mood]).join(" · ");
        return `${menu.cuisine} 카테고리 메뉴로, ${moodLabel}에 어울립니다.`;
    }

    function renderMenus(items) {
        countText.textContent = `총 ${items.length}개의 메뉴가 조건에 맞습니다.`;

        if (items.length === 0) {
            grid.innerHTML = "<p class=\"page-intro\">조건에 맞는 메뉴가 없습니다. 필터를 완화해보세요.</p>";
            return;
        }

        grid.innerHTML = items
            .map((menu) => `
                <article class="menu-card">
                    <h3>${menu.emoji} ${menu.name}</h3>
                    <p class="menu-meta">${menu.cuisine} · ${menu.moods.join(", ")} · ${getPriceRange(menu)}</p>
                    <p class="menu-desc">${getRecommendationComment(menu)}</p>
                </article>
            `)
            .join("");
    }

    function applyFilters() {
        const cuisine = cuisineSelect.value;
        const mood = moodSelect.value;
        const keyword = searchInput.value.trim();

        const filtered = dinnerMenusKo.filter((menu) => {
            const cuisineMatch = cuisine === "all" || menu.cuisine === cuisine;
            const moodMatch = mood === "all" || menu.moods.includes(mood);
            const text = `${menu.name} ${menu.cuisine} ${menu.moods.join(" ")}`;
            const keywordMatch = !keyword || text.includes(keyword);
            return cuisineMatch && moodMatch && keywordMatch;
        });

        renderMenus(filtered);
    }

    cuisineSelect.addEventListener("change", applyFilters);
    moodSelect.addEventListener("change", applyFilters);
    searchInput.addEventListener("input", applyFilters);

    renderMenus(dinnerMenusKo);
})();
