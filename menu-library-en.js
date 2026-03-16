(() => {
    const cuisineSelect = document.getElementById("library-cuisine");
    const moodSelect = document.getElementById("library-mood");
    const searchInput = document.getElementById("library-search");
    const grid = document.getElementById("menu-grid");
    const countText = document.getElementById("library-count");

    const cuisineRange = {
        "Korean": [8, 15],
        "Chinese": [9, 17],
        "Japanese": [11, 22],
        "Western": [12, 25],
        "Street Food": [5, 12],
        "Fast Food": [7, 14]
    };

    const moodContext = {
        "Hearty": "great when you need a filling dinner",
        "Light": "works for a lighter evening",
        "Warm": "ideal for colder or rainy days",
        "Spicy": "helpful when you want a strong flavor kick"
    };

    function getPriceRange(menu) {
        const base = cuisineRange[menu.cuisine] || [8, 15];
        const lower = base[0];
        let upper = base[1];
        if (menu.moods.includes("Hearty")) upper += 1;
        if (menu.moods.includes("Spicy")) upper += 1;
        return `USD ${lower}-${upper}`;
    }

    function getRecommendationComment(menu) {
        const moodLabel = menu.moods.map((mood) => moodContext[mood]).join("; ");
        return `${menu.cuisine} option that is ${moodLabel}.`;
    }

    function renderMenus(items) {
        countText.textContent = `${items.length} menu options match your filters.`;

        if (items.length === 0) {
            grid.innerHTML = "<p class=\"page-intro\">No menu matched your filters. Try broader criteria.</p>";
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
        const keyword = searchInput.value.trim().toLowerCase();

        const filtered = dinnerMenusEn.filter((menu) => {
            const cuisineMatch = cuisine === "all" || menu.cuisine === cuisine;
            const moodMatch = mood === "all" || menu.moods.includes(mood);
            const text = `${menu.name} ${menu.cuisine} ${menu.moods.join(" ")}`.toLowerCase();
            const keywordMatch = !keyword || text.includes(keyword);
            return cuisineMatch && moodMatch && keywordMatch;
        });

        renderMenus(filtered);
    }

    cuisineSelect.addEventListener("change", applyFilters);
    moodSelect.addEventListener("change", applyFilters);
    searchInput.addEventListener("input", applyFilters);

    renderMenus(dinnerMenusEn);
})();
