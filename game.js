document.addEventListener('DOMContentLoaded', () => {
    // URL에서 난이도 파라미터 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const level = urlParams.get('level') || 'easy';

    // 난이도별 설정
    const config = {
        easy: { size: 5, words: 5 },
        medium: { size: 7, words: 7 },
        hard: { size: 9, words: 9 }
    };

    const currentConfig = config[level];
    let startTime = null;
    let timerInterval = null;
    let selectedCells = [];
    let completedWords = new Set();

    // 한글 단어 목록 (사용자 제공)
    const wordList = [
        { word: '마라탕', meaning: '중국 쓰촨 러산 지역에서 유래한 매운맛의 탕 요리' },
        { word: '원근쌤', meaning: '대신고 1학년 10반의 담임쌤' },
        { word: '게장', meaning: '게를 간장이나 양념으로 숙성하여 만드는 전라도 요리' },
        { word: '나무', meaning: '줄기나 가지가 목질로 된 여러해살이 식물' },
        { word: '소외감', meaning: '남에게 따돌림을 당하여 멀어진 듯한 느낌' },
        { word: '고라니', meaning: '한국분포하는 사슴과 중 하나로, 소목 사슴과에 속한다' },
        { word: '감나무', meaning: '감이 열리는 나무' },
        { word: '정재욱', meaning: '10반 개고트' },
        { word: '고진용', meaning: '일베' },
        { word: '강원우', meaning: '10반 1번이자 불쌍한 기숙사생' }
    ];

    // 랜덤 한글 문자 생성
    function getRandomHangul() {
        const start = 0xAC00; // 한글 시작
        const end = 0xD7A3;   // 한글 끝
        const randomCode = Math.floor(Math.random() * (end - start + 1)) + start;
        return String.fromCharCode(randomCode);
    }

    // 타이머 시작
    function startTimer() {
        startTime = Date.now();
        timerInterval = setInterval(updateTimer, 1000);
    }

    // 타이머 업데이트
    function updateTimer() {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
        const seconds = (elapsed % 60).toString().padStart(2, '0');
        document.querySelector('.timer').textContent = `${minutes}:${seconds}`;
    }

    // 빙고판 생성
    function createBingoBoard() {
        const board = document.querySelector('.bingo-board');
        board.className = `bingo-board ${level}`;
        
        // 빈 칸 생성
        for (let i = 0; i < currentConfig.size * currentConfig.size; i++) {
            const cell = document.createElement('div');
            cell.className = 'bingo-cell';
            cell.dataset.index = i;
            cell.addEventListener('click', handleCellClick);
            board.appendChild(cell);
        }

        // 단어 배치
        const words = wordList.slice(0, currentConfig.words);
        placeWords(words);
        fillEmptyCells();
    }

    // 단어 배치 (겹치지 않게, 실제로 이어지게)
    function placeWords(words) {
        const cells = document.querySelectorAll('.bingo-cell');
        const size = currentConfig.size;
        const board = Array(size).fill(null).map(() => Array(size).fill(null));
        const usedWords = [];

        function canPlace(word, row, col, dr, dc) {
            for (let i = 0; i < word.length; i++) {
                const nr = row + dr * i;
                const nc = col + dc * i;
                if (nr < 0 || nr >= size || nc < 0 || nc >= size) return false;
                if (board[nr][nc] !== null && board[nr][nc] !== word[i]) return false;
            }
            return true;
        }

        function setWord(word, row, col, dr, dc, meaning) {
            for (let i = 0; i < word.length; i++) {
                const nr = row + dr * i;
                const nc = col + dc * i;
                board[nr][nc] = word[i];
                const idx = nr * size + nc;
                cells[idx].textContent = word[i];
                cells[idx].dataset.word = word;
                cells[idx].dataset.meaning = meaning;
                cells[idx].dataset.wordIndex = i;
            }
        }

        // 방향: [가로, 세로, 대각선]
        const directions = [
            { dr: 0, dc: 1 },   // 가로
            { dr: 1, dc: 0 },   // 세로
            { dr: 1, dc: 1 }    // 대각선
        ];

        words.forEach(({ word, meaning }) => {
            let placed = false;
            const tries = 100;
            for (let t = 0; t < tries && !placed; t++) {
                const dir = directions[Math.floor(Math.random() * directions.length)];
                const maxRow = size - (dir.dr ? word.length : 0);
                const maxCol = size - (dir.dc ? word.length : 0);
                const row = Math.floor(Math.random() * (maxRow + 1));
                const col = Math.floor(Math.random() * (maxCol + 1));
                if (canPlace(word, row, col, dir.dr, dir.dc)) {
                    setWord(word, row, col, dir.dr, dir.dc, meaning);
                    usedWords.push({ word, meaning });
                    placed = true;
                }
            }
        });

        // 단어 목록 표시 (실제로 들어간 단어만)
        const meaningsList = document.querySelector('.meanings-list');
        meaningsList.innerHTML = '';
        usedWords.forEach(({ word, meaning }) => {
            const li = document.createElement('li');
            li.textContent = meaning;
            li.dataset.word = word;
            meaningsList.appendChild(li);
        });
    }

    // 빈 칸 채우기
    function fillEmptyCells() {
        const cells = document.querySelectorAll('.bingo-cell');
        cells.forEach(cell => {
            if (!cell.textContent) {
                cell.textContent = getRandomHangul();
            }
        });
    }

    // 셀 클릭 처리 (2번 방법: 잘못된 선택 시 자동 초기화)
    let firstCell = null;
    let secondCell = null;

    function handleCellClick(e) {
        if (!startTime) startTimer();
        const cell = e.target;
        const size = currentConfig.size;
        // 이미 선택된 셀을 다시 누르면 무시
        if (cell.classList.contains('selected')) return;

        // 첫 번째 셀 선택
        if (!firstCell) {
            firstCell = cell;
            cell.classList.add('selected');
            return;
        }
        // 두 번째 셀 선택
        if (!secondCell) {
            secondCell = cell;
            cell.classList.add('selected');

            // 두 셀의 인덱스 계산
            const idx1 = parseInt(firstCell.dataset.index);
            const idx2 = parseInt(secondCell.dataset.index);
            const r1 = Math.floor(idx1 / size), c1 = idx1 % size;
            const r2 = Math.floor(idx2 / size), c2 = idx2 % size;

            // 방향 계산
            const dr = r2 - r1 === 0 ? 0 : (r2 - r1) / Math.abs(r2 - r1);
            const dc = c2 - c1 === 0 ? 0 : (c2 - c1) / Math.abs(c2 - c1);
            const len = Math.max(Math.abs(r2 - r1), Math.abs(c2 - c1)) + 1;

            // 가로, 세로, 대각선만 허용
            if (!((dr === 0 && dc !== 0) || (dr !== 0 && dc === 0) || (Math.abs(dr) === 1 && Math.abs(dc) === 1))) {
                // 잘못된 경로: 선택 해제
                firstCell.classList.remove('selected');
                secondCell.classList.remove('selected');
                firstCell = null;
                secondCell = null;
                return;
            }

            // 경로상의 셀들 모으기
            let pathCells = [];
            for (let i = 0; i < len; i++) {
                const nr = r1 + dr * i;
                const nc = c1 + dc * i;
                const idx = nr * size + nc;
                const pathCell = document.querySelector(`.bingo-cell[data-index='${idx}']`);
                pathCells.push(pathCell);
            }
            // 단어 조합
            const selectedWord = pathCells.map(cell => cell.textContent).join('');
            // 의미에 있는 단어인지 확인
            const meaningElement = document.querySelector(`li[data-word="${selectedWord}"]`);
            if (meaningElement) {
                // 정답: 빨간색, 의미 취소선
                pathCells.forEach(cell => {
                    cell.classList.add('selected');
                    cell.style.backgroundColor = '#ff6b6b';
                });
                meaningElement.classList.add('completed');
                completedWords.add(selectedWord);
                // 게임 클리어 체크
                if (completedWords.size === document.querySelectorAll('.meanings-list li').length) {
                    clearInterval(timerInterval);
                    alert('축하합니다! 게임을 클리어하셨습니다!');
                }
            } else {
                // 오답: 선택 해제
                firstCell.classList.remove('selected');
                secondCell.classList.remove('selected');
            }
            // 상태 초기화
            firstCell = null;
            secondCell = null;
        }
    }

    // 게임 시작
    createBingoBoard();
}); 