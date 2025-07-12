// Firebase 설정
const firebaseConfig = {
    apiKey: "AIzaSyDK19IXxB0nKm8O3xmLGN6gx-S_8DoNM1w",
    authDomain: "oryang-wordup.firebaseapp.com",
    projectId: "oryang-wordup",
    storageBucket: "oryang-wordup.firebasestorage.app",
    messagingSenderId: "84303493775",
    appId: "1:84303493775:web:d2882651447ea8927bcefa",
    measurementId: "G-FEP4X9THMD",
    databaseURL: "https://oryang-wordup-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Firebase 초기화
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// 로그인 처리 함수
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!email || !password) {
        alert('이메일과 비밀번호를 모두 입력해주세요.');
        return false;
    }
    
    // 로그인 시도
    console.log('로그인 시도:', email);
    
    // 임시 로그인 성공 처리
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
    
    // 메인 페이지로 리다이렉트
    window.location.href = 'index.html';
    
    return false;
}

// 회원가입 페이지로 이동
function showSignup() {
    // TODO: 회원가입 페이지 구현 후 연결
    alert('회원가입 기능은 아직 준비 중입니다.');
}

// 계정 만들기 클릭 시
function showCreateAccount() {
    alert('계정 생성 페이지로 이동');
}

// 비밀번호 찾기 클릭 시
function showForgotPassword() {
    alert('비밀번호 찾기 페이지로 이동');
}

// 페이지 로드 시 로그인 상태 확인
document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        window.location.href = 'index.html';
    }

    const form = document.getElementById('loginForm');
    form.reset();
}); 