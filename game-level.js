document.addEventListener('DOMContentLoaded', () => {
    const rankingTabs = document.querySelectorAll('.ranking-tab');
    const rankingTable = document.querySelector('.ranking-table tbody');

    // 예시 순위 데이터
    const rankingData = {
        easy: [
            { id: '2024001', name: '정재욱', time: '45초' },
            { id: '2024002', name: '강원우', time: '52초' },
            { id: '2024003', name: '이민혁', time: '58초' }
        ],
        medium: [
            { id: '2024004', name: '이지후', time: '78초' },
            { id: '2024005', name: '문강윤', time: '85초' },
            { id: '2024006', name: '고진용', time: '92초' }
        ],
        hard: [
            { id: '2024007', name: '보진용', time: '120초' },
            { id: '2024008', name: '일베뇽', time: '135초' },
            { id: '2024009', name: '게이지뇽뇽', time: '142초' }
        ]
    };

    // 순위표 업데이트 함수
    function updateRanking(level) {
        const data = rankingData[level];
        rankingTable.innerHTML = '';
        
        data.forEach(rank => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${rank.id}</td>
                <td>${rank.name}</td>
                <td>${rank.time}</td>
            `;
            rankingTable.appendChild(row);
        });
    }

    // 탭 클릭 이벤트 처리
    rankingTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 활성 탭 변경
            rankingTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // 순위표 업데이트
            const level = tab.dataset.level;
            updateRanking(level);
        });
    });

    // 초기 순위표 표시
    updateRanking('easy');
}); 