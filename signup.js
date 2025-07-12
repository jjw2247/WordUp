// Firebase SDK 모듈 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { getFirestore, doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

// Firebase 설정
const firebaseConfig = {
    apiKey: "AIzaSyDK19IXxB0nKm8O3xmLGN6gx-S_8DoNM1w",
    authDomain: "oryang-wordup.firebaseapp.com",
    projectId: "oryang-wordup",
    storageBucket: "oryang-wordup.firebasestorage.app",
    messagingSenderId: "84303493775",
    appId: "1:84303493775:web:d2882651447ea8927bcefa",
    measurementId: "G-FEP4X9THMD"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 비밀번호 보이기/숨기기 토글 함수
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.nextElementSibling.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// 회원가입 처리 함수
async function handleSignup(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const studentId = document.getElementById('studentId').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;

    // 입력값 검증
    if (!name || !studentId || !email || !password || !passwordConfirm) {
        alert('모든 필드를 입력해주세요.');
        return false;
    }

    // 학번 형식 검증
    if (!/^\d{5}$/.test(studentId)) {
        alert('학번은 5자리 숫자여야 합니다.');
        return false;
    }

    // 비밀번호 확인
    if (password !== passwordConfirm) {
        alert('비밀번호가 일치하지 않습니다.');
        return false;
    }

    // 비밀번호 길이 검증
    if (password.length < 6) {
        alert('비밀번호는 6자리 이상이어야 합니다.');
        return false;
    }

    try {
        // Firebase Authentication을 사용하여 회원가입
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Firestore에 사용자 정보 저장
        await setDoc(doc(db, 'users', user.uid), {
            name: name,
            studentId: studentId,
            email: email,
            createdAt: serverTimestamp()
        });

        // 회원가입 성공 메시지 표시 후 로그인 페이지로 이동
        if (confirm('회원가입이 완료되었습니다! 로그인 페이지로 이동하시겠습니까?')) {
            window.location.href = 'login.html';
        }
    } catch (error) {
        let errorMessage = '회원가입 중 오류가 발생했습니다.';
        
        switch (error.code) {
            case 'auth/email-already-in-use':
                errorMessage = '이미 사용 중인 이메일입니다.';
                break;
            case 'auth/invalid-email':
                errorMessage = '유효하지 않은 이메일 형식입니다.';
                break;
            case 'auth/weak-password':
                errorMessage = '비밀번호가 너무 약합니다.';
                break;
        }
        
        alert(errorMessage);
    }

    return false;
}

// 페이지 로드 시 폼 초기화
window.onload = function() {
    document.getElementById('signupForm').reset();
};

// 전역 스코프에 함수 노출
window.handleSignup = handleSignup;
window.togglePassword = togglePassword; 