document.addEventListener("DOMContentLoaded", () => {
    const generateBtn = document.getElementById("generate-btn");
    const container = document.getElementById("lotto-container");

    // 번호에 따른 색상 클래스 반환
    function getBallColorClass(num) {
        if (num <= 10) return "ball-yellow";
        if (num <= 20) return "ball-blue";
        if (num <= 30) return "ball-red";
        if (num <= 40) return "ball-gray";
        return "ball-green";
    }

    // 1~45 중 중복 없는 6개 숫자 생성
    function generateLottoNumbers() {
        const numbers = [];
        while (numbers.length < 6) {
            const num = Math.floor(Math.random() * 45) + 1;
            if (!numbers.includes(num)) {
                numbers.push(num);
            }
        }
        // 오름차순 정렬
        return numbers.sort((a, b) => a - b);
    }

    // 버튼 클릭 이벤트
    generateBtn.addEventListener("click", () => {
        const lottoNumbers = generateLottoNumbers();
        
        // 기존 내용 삭제
        container.innerHTML = "";

        // 번호 공 생성 및 애니메이션과 함께 추가
        lottoNumbers.forEach((num, index) => {
            setTimeout(() => {
                const ball = document.createElement("div");
                ball.classList.add("ball");
                ball.classList.add(getBallColorClass(num));
                ball.innerText = num;
                container.appendChild(ball);
            }, index * 100); // 0.1초 간격으로 순차적으로 등장
        });
    });
});