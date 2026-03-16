document.addEventListener("DOMContentLoaded", () => {
    const generateBtn = document.getElementById("generate-btn");
    const resultContainer = document.getElementById("dinner-result");
    const themeToggle = document.getElementById("theme-toggle");
    const cuisineSelect = document.getElementById("cuisine-select");
    const moodSelect = document.getElementById("mood-select");

    const dinnerMenus = [
        { name: "Kimchi Stew", cuisine: "Korean", moods: ["Hearty", "Warm", "Spicy"], emoji: "🍲" },
        { name: "Bibimbap", cuisine: "Korean", moods: ["Hearty", "Light"], emoji: "🥗" },
        { name: "Pork Belly BBQ", cuisine: "Korean", moods: ["Hearty"], emoji: "🥓" },
        { name: "Knife-Cut Noodles", cuisine: "Korean", moods: ["Warm", "Hearty"], emoji: "🍜" },
        { name: "Soybean Paste Stew", cuisine: "Korean", moods: ["Warm", "Hearty"], emoji: "🥘" },
        { name: "Soft Tofu Stew", cuisine: "Korean", moods: ["Warm", "Spicy"], emoji: "🍲" },
        { name: "Spicy Stir-Fried Pork", cuisine: "Korean", moods: ["Hearty", "Spicy"], emoji: "🔥" },
        { name: "Dakgalbi", cuisine: "Korean", moods: ["Hearty", "Spicy"], emoji: "🍗" },
        { name: "Beef Rib Soup", cuisine: "Korean", moods: ["Warm", "Hearty"], emoji: "🍖" },
        { name: "Bossam", cuisine: "Korean", moods: ["Hearty"], emoji: "🥬" },
        { name: "Bulgogi Rice Bowl", cuisine: "Korean", moods: ["Hearty"], emoji: "🍚" },
        { name: "Cold Noodles", cuisine: "Korean", moods: ["Light"], emoji: "🧊" },
        { name: "Mala Soup", cuisine: "Chinese", moods: ["Spicy", "Hearty"], emoji: "🥘" },
        { name: "Black Bean Noodles", cuisine: "Chinese", moods: ["Hearty"], emoji: "🍝" },
        { name: "Spicy Seafood Noodle Soup", cuisine: "Chinese", moods: ["Spicy", "Warm"], emoji: "🍜" },
        { name: "Sweet and Sour Pork", cuisine: "Chinese", moods: ["Hearty"], emoji: "🍤" },
        { name: "Fried Rice", cuisine: "Chinese", moods: ["Hearty"], emoji: "🍳" },
        { name: "Mapo Tofu Rice Bowl", cuisine: "Chinese", moods: ["Spicy", "Hearty"], emoji: "🥡" },
        { name: "Spicy Fried Chicken", cuisine: "Chinese", moods: ["Spicy", "Hearty"], emoji: "🍗" },
        { name: "Yuringi", cuisine: "Chinese", moods: ["Light"], emoji: "🥗" },
        { name: "Yangjangpi", cuisine: "Chinese", moods: ["Light"], emoji: "🥢" },
        { name: "Sushi", cuisine: "Japanese", moods: ["Light"], emoji: "🍣" },
        { name: "Tonkatsu", cuisine: "Japanese", moods: ["Hearty"], emoji: "🍛" },
        { name: "Ramen", cuisine: "Japanese", moods: ["Warm", "Hearty"], emoji: "🍜" },
        { name: "Udon", cuisine: "Japanese", moods: ["Warm", "Light"], emoji: "🥢" },
        { name: "Katsudon", cuisine: "Japanese", moods: ["Hearty"], emoji: "🍚" },
        { name: "Oyakodon", cuisine: "Japanese", moods: ["Hearty", "Warm"], emoji: "🐣" },
        { name: "Gyudon", cuisine: "Japanese", moods: ["Hearty"], emoji: "🥩" },
        { name: "Soba", cuisine: "Japanese", moods: ["Light"], emoji: "🍜" },
        { name: "Salmon Rice Bowl", cuisine: "Japanese", moods: ["Light", "Hearty"], emoji: "🐟" },
        { name: "Pasta", cuisine: "Western", moods: ["Light", "Hearty"], emoji: "🍝" },
        { name: "Steak", cuisine: "Western", moods: ["Hearty"], emoji: "🥩" },
        { name: "Risotto", cuisine: "Western", moods: ["Warm"], emoji: "🍚" },
        { name: "Salad Bowl", cuisine: "Western", moods: ["Light"], emoji: "🥗" },
        { name: "Pizza", cuisine: "Western", moods: ["Hearty"], emoji: "🍕" },
        { name: "Lasagna", cuisine: "Western", moods: ["Hearty", "Warm"], emoji: "🧀" },
        { name: "Hamburg Steak", cuisine: "Western", moods: ["Hearty"], emoji: "🍖" },
        { name: "Chicken Caesar Salad", cuisine: "Western", moods: ["Light"], emoji: "🥬" },
        { name: "Cream Soup and Bread", cuisine: "Western", moods: ["Warm", "Light"], emoji: "🍞" },
        { name: "Tteokbokki", cuisine: "Street Food", moods: ["Spicy", "Hearty"], emoji: "🌶️" },
        { name: "Gimbap", cuisine: "Street Food", moods: ["Light"], emoji: "🍙" },
        { name: "Rabokki", cuisine: "Street Food", moods: ["Spicy", "Warm"], emoji: "🍲" },
        { name: "Sundae", cuisine: "Street Food", moods: ["Hearty"], emoji: "🍢" },
        { name: "Fried Mix", cuisine: "Street Food", moods: ["Hearty"], emoji: "🍤" },
        { name: "Jjolmyeon", cuisine: "Street Food", moods: ["Spicy", "Light"], emoji: "🍜" },
        { name: "Fish Cake Soup", cuisine: "Street Food", moods: ["Warm"], emoji: "🍢" },
        { name: "Cheese Ramen", cuisine: "Street Food", moods: ["Warm", "Hearty"], emoji: "🧀" },
        { name: "Burger", cuisine: "Fast Food", moods: ["Hearty"], emoji: "🍔" },
        { name: "Fried Chicken", cuisine: "Fast Food", moods: ["Hearty"], emoji: "🍗" },
        { name: "Sandwich", cuisine: "Fast Food", moods: ["Light"], emoji: "🥪" },
        { name: "Hot Dog", cuisine: "Fast Food", moods: ["Hearty"], emoji: "🌭" },
        { name: "Taco", cuisine: "Fast Food", moods: ["Spicy", "Light"], emoji: "🌮" },
        { name: "Burrito", cuisine: "Fast Food", moods: ["Hearty"], emoji: "🌯" },
        { name: "Chicken Burger", cuisine: "Fast Food", moods: ["Hearty"], emoji: "🍔" }
    ];

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
            ? "<p class=\"fallback\">No exact match found, so we picked from all menus.</p>"
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
