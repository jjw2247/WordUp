// 게임 상태 관리
let currentQuestionIndex = 0;
let score = 0;
let gameQuestions = [];
let isAdminLoggedIn = false;

// 문제 데이터 (나중에 사용자가 추가할 예정)
const GAME_WORDS = [
    { word: "사과", meaning: "빨간 과일", options: ["사과", "바나나", "오렌지", "포도"] },
    { word: "학교", meaning: "공부하는 곳", options: ["학교", "회사", "병원", "상점"] },
    { word: "친구", meaning: "함께 노는 사람", options: ["친구", "가족", "선생님", "이웃"] },
    { word: "학습", meaning: "지식을 배우는 것", options: ["학습", "놀이", "일", "휴식"] },
    { word: "시험", meaning: "실력을 평가하는 것", options: ["시험", "게임", "운동", "음악"] },
    { word: "성적", meaning: "학업의 결과", options: ["성적", "점수", "등급", "순위"] }
    // 나중에 더 많은 단어 추가 예정
];

// 게임 초기화
function initializeGame() {
    currentQuestionIndex = 0;
    score = 0;
    gameQuestions = generateQuestions(GAME_WORDS);
    showQuestion();
}

// 게임 시작
function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    gameQuestions = generateQuestions(GAME_WORDS);
    showQuestion();
}

// 문제 생성 (15개 오지선다 + 5개 단답형)
function generateQuestions(wordList) {
    const questions = [];
    
    // 15개 오지선다 문제
    for (let i = 0; i < 15; i++) {
        const word = wordList[i % wordList.length];
        questions.push({
            type: 'multiple',
            word: word.word,
            meaning: word.meaning,
            options: word.options,
            correctAnswer: word.word
        });
    }
    
    // 5개 단답형 문제
    for (let i = 0; i < 5; i++) {
        const word = wordList[i % wordList.length];
        questions.push({
            type: 'short',
            word: word.word,
            meaning: word.meaning,
            correctAnswer: word.word
        });
    }
    
    // 문제 순서 섞기
    return shuffleArray(questions);
}

// 배열 섞기
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// 문제 표시
function showQuestion() {
    if (currentQuestionIndex >= gameQuestions.length) {
        showGameResult();
        return;
    }
    
    const question = gameQuestions[currentQuestionIndex];
    const gameArea = document.getElementById('game-area');
    
    gameArea.innerHTML = `
        <div class="game-header">
            <h1>골든벨 게임</h1>
            <div class="progress-info">
                <span class="question-counter">${currentQuestionIndex + 1} / 20</span>
                <span class="score">점수: ${score}</span>
            </div>
        </div>
        
        <div class="question-container">
            <div class="question-type">${question.type === 'multiple' ? '오지선다' : '단답형'}</div>
            <div class="question-text">다음 뜻에 맞는 단어를 찾으세요:</div>
            <div class="meaning">"${question.meaning}"</div>
            
            ${question.type === 'multiple' ? 
                `<div class="options-container">
                    ${question.options.map((option, index) => 
                        `<button class="option-btn" onclick="checkAnswer('${option}')">${option}</button>`
                    ).join('')}
                </div>` :
                `<div class="short-answer-container">
                    <input type="text" id="word-input" placeholder="단어를 입력하세요" maxlength="20">
                    <button id="submit-btn" onclick="checkShortAnswer()">정답 확인</button>
                </div>`
            }
        </div>
        
        <div class="result-container" id="result-container" style="display:none;">
            <h3 id="result-title"></h3>
            <p id="result-message"></p>
            <button onclick="nextQuestion()">다음 문제</button>
        </div>
    `;
    
    // 단답형 입력 필드에 엔터키 이벤트 추가
    if (question.type === 'short') {
        setTimeout(() => {
            const input = document.getElementById('word-input');
            if (input) {
                input.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        checkShortAnswer();
                    }
                });
                input.focus();
            }
        }, 100);
    }
}

// 오지선다 답안 확인
function checkAnswer(selectedAnswer) {
    const question = gameQuestions[currentQuestionIndex];
    const isCorrect = selectedAnswer === question.correctAnswer;
    
    if (isCorrect) {
        score += 5;
    }
    
    showResult(isCorrect, question.correctAnswer);
}

// 단답형 답안 확인
function checkShortAnswer() {
    const input = document.getElementById('word-input');
    const userAnswer = input.value.trim();
    const question = gameQuestions[currentQuestionIndex];
    const isCorrect = userAnswer === question.correctAnswer;
    
    if (isCorrect) {
        score += 5;
    }
    
    showResult(isCorrect, question.correctAnswer);
}

// 결과 표시
function showResult(isCorrect, correctAnswer) {
    const resultContainer = document.getElementById('result-container');
    const resultTitle = document.getElementById('result-title');
    const resultMessage = document.getElementById('result-message');
    
    if (isCorrect) {
        resultTitle.textContent = '정답입니다! 🎉';
        resultTitle.style.color = '#28a745';
        resultMessage.textContent = '잘했어요! 다음 문제로 넘어가세요.';
    } else {
        resultTitle.textContent = '틀렸습니다! 😢';
        resultTitle.style.color = '#dc3545';
        resultMessage.textContent = `정답: ${correctAnswer}`;
    }
    
    resultContainer.style.display = 'block';
}

// 다음 문제로 이동
function nextQuestion() {
    currentQuestionIndex++;
    showQuestion();
}

// 게임 결과 표시
function showGameResult() {
    const gameArea = document.getElementById('game-area');
    const percentage = Math.round((score / 100) * 100);
    
    let grade = '';
    if (percentage >= 90) grade = 'A+';
    else if (percentage >= 80) grade = 'A';
    else if (percentage >= 70) grade = 'B+';
    else if (percentage >= 60) grade = 'B';
    else if (percentage >= 50) grade = 'C+';
    else grade = 'C';
    
    gameArea.innerHTML = `
        <div class="game-header">
            <h1>게임 완료!</h1>
        </div>
        
        <div class="result-container final-result">
            <h2>최종 결과</h2>
            <div class="score-display">
                <div class="final-score">${score}점 / 100점</div>
                <div class="percentage">${percentage}%</div>
                <div class="grade">등급: ${grade}</div>
            </div>
            <div class="result-buttons">
                <button onclick="startGame()">다시하기</button>
                <button onclick="location.href='index.html'">홈으로</button>
            </div>
        </div>
    `;
}

// 운영자 로그인 모달 표시
function showAdminLogin() {
    const modal = document.getElementById('admin-modal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // 비밀번호 입력 필드에 포커스 및 엔터키 이벤트 추가
        setTimeout(() => {
            const passwordInput = document.getElementById('admin-password');
            if (passwordInput) {
                passwordInput.focus();
                passwordInput.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        loginAdmin();
                    }
                });
            }
        }, 100);
    }
}

// 운영자 로그인 처리
function loginAdmin() {
    const password = document.getElementById('admin-password').value;
    console.log('입력된 비밀번호:', password);
    
    // 간단한 비밀번호 확인 (실제로는 더 안전한 방법 사용)
    if (password === '0110') {
        console.log('비밀번호 일치! 로그인 성공');
        isAdminLoggedIn = true;
        closeAdminModal();
        
        // 디데이 화면 숨기고 게임 화면 표시
        document.getElementById('countdown-screen').style.display = 'none';
        document.getElementById('game-screen').style.display = 'block';
        
        // 게임 시작
        startGame();
        
        alert('관리자 로그인이 완료되었습니다! 골든벨 게임을 시작합니다.');
    } else {
        console.log('비밀번호 불일치:', password);
        alert('비밀번호가 올바르지 않습니다. 다시 시도해주세요.');
        document.getElementById('admin-password').value = '';
    }
}

// 운영자 모달 닫기
function closeAdminModal() {
    const modal = document.getElementById('admin-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        document.getElementById('admin-password').value = '';
    }
}

// 페이지 로드 시 디데이 타이머 초기화
window.onload = function() {
    // 디데이 타이머 시작
    startCountdown();
};

// 디데이 타이머 함수
function startCountdown() {
    const targetDate = new Date('2025-07-15T00:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(3, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
} 