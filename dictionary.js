// 로컬 스토리지에서 단어장 데이터를 가져오는 함수
function getDictionaryData() {
    const data = localStorage.getItem('dictionary');
    return data ? JSON.parse(data) : [];
}

// 단어장 데이터를 로컬 스토리지에 저장하는 함수
function saveDictionaryData(data) {
    localStorage.setItem('dictionary', JSON.stringify(data));
}

// 단어 목록을 화면에 표시하는 함수
function displayWordList(words) {
    const wordList = document.getElementById('wordList');
    wordList.innerHTML = '';

    // 단어 수 표시 업데이트
    document.getElementById('totalWords').textContent = words.length;

    words.forEach(word => {
        const li = document.createElement('li');
        li.textContent = word.term;
        li.addEventListener('click', () => {
            // 이전에 선택된 항목의 active 클래스 제거
            document.querySelectorAll('#wordList li').forEach(item => {
                item.classList.remove('active');
            });
            // 현재 항목에 active 클래스 추가
            li.classList.add('active');
            displayWordDetail(word);
        });
        wordList.appendChild(li);
    });

    // 첫 번째 단어가 있다면 자동으로 선택
    if (words.length > 0) {
        wordList.firstChild.click();
    }
}

// 단어 상세 정보를 화면에 표시하는 함수
function displayWordDetail(word) {
    const wordDetail = document.getElementById('wordDetail');
    wordDetail.innerHTML = `
        <h3>${word.term}</h3>
        <p><strong>의미:</strong> ${word.meaning}</p>
        <p><strong>예문:</strong> ${word.example || '예문이 없습니다.'}</p>
        <p><strong>메모:</strong> ${word.memo || '메모가 없습니다.'}</p>
    `;
}

// 샘플 데이터
const sampleData = [
    // 내신 필수 어휘
    {
        term: "가족",
        meaning: "혈연이나 혼인으로 맺어진 사람들의 모임",
        example: "우리 가족은 4명입니다.",
        memo: "가족 구성원을 나타내는 기본 단어",
        category: "내신 필수 어휘",
        level: "easy"
    },
    {
        term: "친구",
        meaning: "서로 친하게 지내는 사람",
        example: "그는 나의 가장 친한 친구입니다.",
        memo: "인간관계를 나타내는 기본 단어",
        category: "내신 필수 어휘",
        level: "easy"
    },
    {
        term: "시간",
        meaning: "시계로 잴 수 있는 시간의 단위",
        example: "시간이 얼마나 걸릴까요?",
        memo: "시간 개념을 나타내는 기본 단어",
        category: "내신 필수 어휘",
        level: "easy"
    },
    {
        term: "학교",
        meaning: "교육을 받는 기관",
        example: "학교에 가는 길입니다.",
        memo: "교육 기관을 나타내는 기본 단어",
        category: "내신 필수 어휘",
        level: "easy"
    },
    {
        term: "공부",
        meaning: "학문이나 기술을 배우고 익힘",
        example: "열심히 공부하고 있습니다.",
        memo: "학습 활동을 나타내는 기본 단어",
        category: "내신 필수 어휘",
        level: "easy"
    },
    {
        term: "음식",
        meaning: "먹을 수 있는 물건",
        example: "맛있는 음식을 먹었습니다.",
        memo: "식사를 나타내는 기본 단어",
        category: "내신 필수 어휘",
        level: "easy"
    },
    {
        term: "운동",
        meaning: "신체를 단련하거나 건강을 유지하기 위한 활동",
        example: "매일 운동을 합니다.",
        memo: "신체 활동을 나타내는 기본 단어",
        category: "내신 필수 어휘",
        level: "easy"
    },

    // 수능 필수 어휘
    {
        term: "역사",
        meaning: "인간 사회의 변천과 흥망의 과정",
        example: "한국의 역사는 오래되었습니다.",
        memo: "과거의 사건과 사실을 연구하는 학문",
        category: "수능 필수 어휘",
        level: "medium"
    },
    {
        term: "문화",
        meaning: "한 사회나 집단에서 공유하는 생활 양식과 가치 체계",
        example: "한국의 전통 문화를 배웁니다.",
        memo: "한 사회의 생활 양식과 가치관",
        category: "수능 필수 어휘",
        level: "medium"
    },
    {
        term: "철학",
        meaning: "세상과 인간의 근본 원리를 탐구하는 학문",
        example: "철학적 사고는 깊은 통찰을 요구합니다.",
        memo: "인간과 세계의 근본 원리를 탐구하는 학문",
        category: "수능 필수 어휘",
        level: "hard"
    },
    {
        term: "문학",
        meaning: "예술적 가치가 있는 글과 작품",
        example: "한국 문학의 특징을 공부합니다.",
        memo: "예술적 가치가 있는 글과 작품",
        category: "수능 필수 어휘",
        level: "medium"
    },
    {
        term: "정치",
        meaning: "국가와 사회를 운영하는 일",
        example: "현대 정치의 흐름을 이해합니다.",
        memo: "국가와 사회의 운영 방식",
        category: "수능 필수 어휘",
        level: "hard"
    },
    {
        term: "경제",
        meaning: "재화와 서비스의 생산, 분배, 소비에 관한 활동",
        example: "세계 경제의 변화를 분석합니다.",
        memo: "재화와 서비스의 생산과 소비",
        category: "수능 필수 어휘",
        level: "hard"
    },

    // 상식
    {
        term: "원자",
        meaning: "물질을 구성하는 가장 작은 입자",
        example: "원자는 물질의 기본 단위입니다.",
        memo: "물질을 구성하는 가장 작은 입자",
        category: "상식",
        level: "medium"
    },
    {
        term: "인공지능",
        meaning: "컴퓨터가 인간의 지능을 모방하는 기술",
        example: "인공지능이 우리의 삶을 변화시키고 있습니다.",
        memo: "컴퓨터가 인간의 지능을 모방하는 기술",
        category: "상식",
        level: "hard"
    },
    {
        term: "법률",
        meaning: "국가가 제정한 사회 질서를 유지하기 위한 규칙",
        example: "법률은 사회 질서를 유지합니다.",
        memo: "국가가 정한 사회 규범",
        category: "상식",
        level: "medium"
    },
    {
        term: "기후",
        meaning: "장기간의 날씨 패턴",
        example: "지구 기후 변화가 심각합니다.",
        memo: "장기간의 날씨 패턴",
        category: "상식",
        level: "medium"
    },
    {
        term: "우주",
        meaning: "모든 존재를 포함하는 무한한 공간",
        example: "우주는 무한히 넓습니다.",
        memo: "모든 존재를 포함하는 공간",
        category: "상식",
        level: "medium"
    },
    {
        term: "인체",
        meaning: "사람의 신체 구조와 기능",
        example: "인체의 구조를 이해합니다.",
        memo: "사람의 신체 구조와 기능",
        category: "상식",
        level: "medium"
    },
    {
        term: "지구",
        meaning: "태양계의 세 번째 행성으로 우리가 살고 있는 천체",
        example: "지구는 태양계의 행성입니다.",
        memo: "우리가 살고 있는 행성",
        category: "상식",
        level: "easy"
    }
];

// 전역 변수
let currentLevel = null;
let currentCategory = null;

// 필터링된 단어 목록 가져오기
function getFilteredWords() {
    let words = getDictionaryData();
    
    // 난이도 필터링
    if (currentLevel) {
        words = words.filter(word => word.level === currentLevel);
    }
    
    // 카테고리 필터링
    if (currentCategory) {
        words = words.filter(word => word.category === currentCategory);
    }
    
    return words;
}

// 검색 기능
function searchWord(query) {
    if (!query.trim()) {
        displayWordList(getFilteredWords());
        return;
    }

    const words = getDictionaryData().filter(word => 
        word.term.includes(query) || 
        word.meaning.includes(query) || 
        word.example.includes(query) || 
        word.memo.includes(query)
    );

    if (words.length === 0) {
        alert('검색 결과가 없습니다.');
    } else {
        displayWordList(words);
    }
}

// 이벤트 리스너 설정
document.addEventListener('DOMContentLoaded', () => {
    // 로컬 스토리지 초기화 및 샘플 데이터 로드
    localStorage.clear();
    saveDictionaryData(sampleData);

    // 난이도 선택 버튼 이벤트
    const difficultyButtons = document.querySelectorAll('.difficulty-btn');
    difficultyButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 같은 버튼을 다시 클릭한 경우
            if (button.classList.contains('active')) {
                button.classList.remove('active');
                currentLevel = null;
            } else {
                // 다른 버튼의 선택 제거
                difficultyButtons.forEach(btn => btn.classList.remove('active'));
                // 현재 버튼 선택
                button.classList.add('active');
                currentLevel = button.dataset.level;
            }
            
            const filteredWords = getFilteredWords();
            displayWordList(filteredWords);
        });
    });

    // 카테고리 선택 버튼 이벤트
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 같은 버튼을 다시 클릭한 경우
            if (button.classList.contains('active')) {
                button.classList.remove('active');
                currentCategory = null;
            } else {
                // 다른 버튼의 선택 제거
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                // 현재 버튼 선택
                button.classList.add('active');
                currentCategory = button.dataset.category;
            }
            
            const filteredWords = getFilteredWords();
            displayWordList(filteredWords);
        });
    });

    // 검색 기능
    const searchInput = document.getElementById('wordSearch');
    const searchBtn = document.getElementById('searchBtn');

    searchBtn.addEventListener('click', () => {
        searchWord(searchInput.value);
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchWord(searchInput.value);
        }
    });

    // 정렬 기능
    const sortAlphabetically = document.getElementById('sortAlphabetically');
    const sortByDate = document.getElementById('sortByDate');

    sortAlphabetically.addEventListener('click', () => {
        const words = getFilteredWords();
        words.sort((a, b) => a.term.localeCompare(b.term));
        displayWordList(words);
    });

    sortByDate.addEventListener('click', () => {
        const words = getFilteredWords();
        words.reverse();
        displayWordList(words);
    });

    // 초기 단어 목록 표시
    displayWordList(getFilteredWords());
}); 