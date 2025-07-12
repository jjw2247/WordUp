document.addEventListener('DOMContentLoaded', () => {
    // Figma 카드 뒤집기 기능
    const cards = document.querySelectorAll('.figma-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });
});

// 페이지 이동 함수
function navigateWithAuth(url) {
    window.location.href = url;
} 