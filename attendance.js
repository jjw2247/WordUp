document.addEventListener('DOMContentLoaded', () => {
    const attendanceBtn = document.getElementById('attendanceBtn');
    const dates = document.querySelectorAll('.date');
    const scoreDiv = document.getElementById('attendance-score');
    const ORYANG_MARK_URL = 'https://files.oopy.io/daeshin-seal-2025-06-11.png'; // 첨부 이미지 URL로 교체

    function updateScore() {
        const checkedCount = Array.from(dates).filter(date => date.classList.contains('checked')).length;
        scoreDiv.textContent = `우리반 출석 횟수: ${checkedCount}점`;
    }

    // 출석체크 버튼 클릭 이벤트
    attendanceBtn.addEventListener('click', () => {
        // 아직 체크되지 않은 첫 번째 DAY를 찾음
        const unchecked = Array.from(dates).find(date => !date.classList.contains('checked'));
        if (unchecked) {
            unchecked.classList.add('checked');
            const stampDiv = unchecked.querySelector('.stamp-img');
            if (stampDiv) {
                stampDiv.style.background = `url('${ORYANG_MARK_URL}') no-repeat center/contain`;
            }
        } else {
            alert('이번 달 출석을 모두 완료하셨습니다!');
        }
        updateScore();
    });

    // 페이지 로드 시 점수 표시
    updateScore();
}); 