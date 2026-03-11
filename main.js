document.addEventListener("DOMContentLoaded", () => {
    const generateBtn = document.getElementById("generate-btn");
    const container = document.getElementById("lotto-container");
    const themeToggle = document.getElementById("theme-toggle");

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

    // --- 로또 추첨 기능 ---
    function getBallColorClass(num) {
        if (num <= 10) return "ball-yellow";
        if (num <= 20) return "ball-blue";
        if (num <= 30) return "ball-red";
        if (num <= 40) return "ball-gray";
        return "ball-green";
    }

    function generateLottoNumbers() {
        const numbers = [];
        while (numbers.length < 6) {
            const num = Math.floor(Math.random() * 45) + 1;
            if (!numbers.includes(num)) {
                numbers.push(num);
            }
        }
        return numbers.sort((a, b) => a - b);
    }

    generateBtn.addEventListener("click", () => {
        const lottoNumbers = generateLottoNumbers();
        container.innerHTML = "";

        lottoNumbers.forEach((num, index) => {
            setTimeout(() => {
                const ball = document.createElement("div");
                ball.classList.add("ball");
                ball.classList.add(getBallColorClass(num));
                ball.innerText = num;
                container.appendChild(ball);
            }, index * 100);
        });
    });
});