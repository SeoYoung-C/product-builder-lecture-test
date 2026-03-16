(() => {
    const form = document.querySelector(".contact-form");
    if (!form) return;

    let isSubmitting = false;

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        if (isSubmitting) return;

        const submitButton = form.querySelector("button[type='submit']");
        const originalLabel = submitButton ? submitButton.textContent : "";

        try {
            isSubmitting = true;
            if (submitButton) {
                submitButton.disabled = true;
            }

            const response = await fetch(form.action, {
                method: "POST",
                body: new FormData(form),
                headers: {
                    Accept: "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Form submit failed");
            }

            alert("문의 등록이 완료 되었습니다.");
            form.reset();
        } catch (error) {
            alert("문의 전송 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
        } finally {
            isSubmitting = false;
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalLabel;
            }
        }
    });
})();
