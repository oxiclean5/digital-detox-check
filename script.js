// 언어별 질문 자동 할당

const results_ko = {
    safe: {
        title: "✨ 디지털 청정 구역의 지배자 ✨",
        description: "축하합니다! 당신은 스마트폰의 주인이자 디지털 세상의 모범 시민입니다. 가끔 로그아웃해도 불안하지 않은 당신, 진정한 고수시네요.",
        solutions: [
            "<strong>주 1회 '디지털 금식'의 날 실천하기:</strong> 저녁 시간 만이라도 의도적으로 폰을 멀리하고 책이나 음악과 함께 해보세요.",
            "<strong>새로운 오프라인 취미 탐색하기:</strong> 당신의 균형감각을 더욱 빛내줄 새로운 활동을 찾아보는 건 어떨까요?",
            "<strong>선한 영향력 전파하기:</strong> 주변에 스마트폰 때문에 힘들어하는 친구가 있다면, 당신의 꿀팁을 슬쩍 공유해주세요."
        ]
    },
    warning: {
        title: "📱 스마트폰과 밀당하는 사이 💔",
        description: "스마트폰과 애증의 관계에 있으시군요. '잠깐만 봐야지' 하다가 새벽 3시가 되는 마법, 자주 경험하시죠? 아직 늦지 않았어요!",
        solutions: [
            "<strong>침실을 '스마트폰 청정 구역'으로 선포하기:</strong> 충전기는 침실 밖에 두고, 알람은 저렴한 자명종 시계를 활용해보세요. 효과는 놀라울 거예요!",
            "<strong>불필요한 알림 과감히 끄기:</strong> 쇼핑 앱, 게임 앱 등 지금 당장 확인하지 않아도 되는 앱의 알림은 모두 꺼두세요. 내 시간의 주인은 나 자신입니다.",
            "<strong>앱 사용 시간 제한 설정하기:</strong> 스마트폰의 스크린 타임 기능을 이용해 SNS, 유튜브 등 특정 앱에 시간제한을 걸어보세요. 폰이 잔소리하게 만드세요."
        ]
    },
    danger: {
        title: "😵 스마트폰과 거의 한 몸 😵",
        description: "혹시... 스마트폰이 손에서 자라나고 있나요? 눈을 뜨자마자, 심지어 화장실에서도 함께하는 당신은 '프로 스마트폰러'!",
        solutions: [
            "<strong>'방해금지 모드' 적극 활용하기:</strong> 업무, 공부, 수면 시간에는 방해금지 모드를 예약 설정하여 스마트폰의 유혹을 원천 차단하세요.",
            "<strong>물리적 '폰 없는 공간' 만들기:</strong> 식탁, 침대 위 등 특정 공간을 '폰 프리존'으로 정하고 가족, 룸메이트와 함께 규칙을 만들어보세요.",
            "<strong>의미 있는 대체 활동 계획하기:</strong> 폰을 내려놓고 생긴 시간에 무엇을 할지 미리 구체적으로 정해두세요. (예: 10분 산책, 책 5페이지 읽기 등)"
        ]
    }
};

// result.html에서 결과 데이터를 가져오기 위한 전역 함수
window.getResultsData = function(lang) {
    return results_ko;
};

// result.html의 Kakao.Share.sendDefault에서 사용할 데이터 (lang에 따라 변경)
window.getShareData = function(resultData, lang) {
    const shareTitle = `[디지털 디톡스 테스트 결과] ${resultData.title}`;
    const shareDescription = resultData.description;
    const testLinkTitle = '나도 테스트하기';

    return {
        title: shareTitle,
        description: shareDescription,
        testLinkTitle: testLinkTitle
    };
};

document.addEventListener('DOMContentLoaded', () => {
    // index.html 페이지 로직
    if (
        window.location.pathname.includes('index.html') ||
        window.location.pathname.includes('index-en.html') ||
        window.location.pathname.includes('index-ja.html') ||
        window.location.pathname === '/'
    ) {
        const startScreen = document.getElementById('start-screen');
        const questionScreen = document.getElementById('question-screen');
        const startBtn = document.getElementById('start-btn');
        
        const questionHeader = document.querySelector('.question-header');
        const questionCounter = document.querySelector('.question-counter');
        const progressBar = document.querySelector('.progress');
        const questionTitle = document.getElementById('question-title');
        const options = document.querySelector('.options');
        const optionBtns = document.querySelectorAll('.option-btn');

        const lang = document.documentElement.lang || 'ko'; // html 태그의 lang 속성 가져오기
        const questions = window[`questions_${lang}`]; // 동적으로 질문 변수 선택 (예: window['questions_en'])
        let currentQuestionIndex = 0;
        let score = 0;
        let isProcessing = false; // 중복 클릭 방지 플래그

        // 질문 배열이 없으면 테스트 시작 버튼 비활성화
        if (!questions || !Array.isArray(questions) || questions.length === 0) {
            if (startBtn) {
                startBtn.disabled = true;
                startBtn.textContent = "Test not available";
            }
            console.warn("No questions found for this language. Please check the index file's <script> block.");
        } else {
            if (startBtn) {
                startBtn.disabled = false;
                startBtn.addEventListener('click', startTest);
            }
        }

        if (optionBtns && optionBtns.length > 0) {
            optionBtns.forEach(button => {
                button.addEventListener('click', (e) => {
                    if (isProcessing) return;
                    isProcessing = true;

                    // 2. 선택 피드백 강화
                    const selectedBtn = e.currentTarget;
                    selectedBtn.classList.add('selected');
                    optionBtns.forEach(btn => btn.disabled = true);

                    score += parseInt(button.dataset.score);
                    
                    setTimeout(() => {
                        currentQuestionIndex++;
                        if (currentQuestionIndex < questions.length) {
                            showQuestion();
                        } else {
                            showResult();
                        }
                        // 클래스 및 비활성화 상태 초기화
                        selectedBtn.classList.remove('selected');
                        optionBtns.forEach(btn => btn.disabled = false);
                        isProcessing = false;
                    }, 150); // 0.15초 딜레이
                });
            });
        }

        function startTest() {
            startScreen.classList.add('hidden');
            questionScreen.classList.remove('hidden');
            currentQuestionIndex = 0;
            score = 0;
            showQuestion();
        }

        function showQuestion() {
            // 3. 부드러운 화면 전환 효과 (Fade out)
            questionTitle.style.opacity = 0;
            options.style.opacity = 0;

            setTimeout(() => {
                // 1. 질문 번호 카운터 업데이트
                questionCounter.textContent = `${currentQuestionIndex + 1} / ${questions.length}`;
                const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
                progressBar.style.width = `${progressPercentage}%`;
                questionTitle.textContent = questions[currentQuestionIndex];

                // 옵션 버튼 텍스트는 각 index.html 파일에서 하드코딩된 값을 그대로 사용 (덮어쓰지 않음)

                // 3. 부드러운 화면 전환 효과 (Fade in)
                questionTitle.style.opacity = 1;
                options.style.opacity = 1;
            }, 100); // 0.1초 후 내용 변경 및 fade in
        }

        function showResult() {
            let resultLevel;
            if (score <= 6) {
                resultLevel = 'safe';
            } else if (score <= 13) {
                resultLevel = 'warning';
            } else {
                resultLevel = 'danger';
            }

            // 언어에 따라 결과 페이지 파일명 결정
            let lang = document.documentElement.lang || 'ko';
            let resultPage = 'result.html';
            if (lang === 'en') {
                resultPage = 'result-en.html';
            } else if (lang === 'ja') {
                resultPage = 'result-ja.html';
            }

            window.location.href = `${resultPage}?level=${resultLevel}&score=${score}`;
        }
    } 
    // result.html 페이지 로직
    else if (window.location.pathname.includes('result.html')) {
        const resultScreen = document.getElementById('result-screen');
        const params = new URLSearchParams(window.location.search);
        const level = params.get('level');
        const score = params.get('score');

        // 카카오 SDK 초기화
        Kakao.init('aa8b0feb153da6756132986b3e91f515');

        // script.js에서 결과 데이터 가져오기
        const results = window.getResultsData();
        const resultData = results[level] || results['safe'];

        // script.js에서 공유 데이터 가져오기
        const shareData = window.getShareData(resultData);

        // --- 시각적 요소 데이터 ---
        const visualData = {
            safe: {
                icon: 'fa-solid fa-face-smile-beam',
                color: '#2ecc71',
                image: 'img/safe.png'
            },
            warning: {
                icon: 'fa-solid fa-face-meh',
                color: '#f39c12',
                image: 'img/warning.png'
            },
            danger: {
                icon: 'fa-solid fa-face-dizzy',
                color: '#e74c3c',
                image: 'img/danger.png'
            }
        };
        const visual = visualData[level] || visualData['safe'];
        const scorePercentage = (score / 20) * 100; // 최대 점수 20점 기준

        let solutionsHtml = '<ul>';
        resultData.solutions.forEach(solution => {
            solutionsHtml += `<li>${solution}</li>`;
        });
        solutionsHtml += '</ul>';

        // 텍스트
        const scoreText = '내 점수:';
        const howToPractice = '이렇게 실천해보세요!';
        const shareResult = '결과 공유하기';
        const kakaoTalk = '카카오톡';
        const line = '라인';
        const facebook = '페이스북';
        const copyLink = '인스타용 링크 복사';
        const learnMore = '디지털 디톡스에 대해 더 알아보기 &rarr;';
        const retakeTest = '테스트 다시하기';

        resultScreen.innerHTML = `
            <i class="result-icon ${visual.icon}" style="color: ${visual.color};"></i>
            <h2>${resultData.title}</h2>
            
            <div class="score-gauge">
                <div class="gauge-bar" style="width: ${scorePercentage}%; background-color: ${visual.color};"></div>
            </div>
            <p id="score-text">${scoreText} ${score}점</p>
            
            <img src="${visual.image}" alt="${resultData.title}" class="result-image">

            <p>${resultData.description}</p>
            <div class="result-content">
                <h3>${howToPractice}</h3>
                ${solutionsHtml}
            </div>
            <div class="share-buttons">
                <p class="share-title">${shareResult}</p>
                <button id="kakao-share-btn" class="share-btn kakao"><i class="fa-solid fa-comment"></i> ${kakaoTalk}</button>
                <button id="line-share-btn" class="share-btn line"><i class="fa-brands fa-line"></i> ${line}</button>
                <button id="facebook-share-btn" class="share-btn facebook"><i class="fa-brands fa-facebook-f"></i> ${facebook}</button>
                <button id="copy-link-btn" class="share-btn instagram"><i class="fa-brands fa-instagram"></i> ${copyLink}</button>
            </div>
            <div class="info-link-container">
                <a href="article.html" class="info-link">${learnMore}</a>
            </div>
            <button id="restart-btn">${retakeTest}</button>
        `;

        // --- 공유 버튼 이벤트 리스너 ---
        document.getElementById('kakao-share-btn').addEventListener('click', () => {
            Kakao.Share.sendDefault({
                objectType: 'feed',
                content: {
                    title: shareData.title,
                    description: shareData.description,
                    imageUrl: 'img/share_thumbnail.png', // 대표 이미지
                    link: {
                        mobileWebUrl: window.location.href,
                        webUrl: window.location.href,
                    },
                },
                buttons: [
                    {
                        title: shareData.testLinkTitle,
                        link: {
                            mobileWebUrl: `https://your-website-url.com`, // 배포 후 실제 주소로 변경
                            webUrl: `https://your-website-url.com`, // 배포 후 실제 주소로 변경
                        },
                    },
                ],
            });
        });

        document.getElementById('facebook-share-btn').addEventListener('click', () => {
            const url = encodeURIComponent(window.location.href);
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
        });

        document.getElementById('line-share-btn').addEventListener('click', () => {
            const url = encodeURIComponent(window.location.href);
            const text = encodeURIComponent(shareData.title);
            window.open(`https://social-plugins.line.me/lineit/share?url=${url}&text=${text}`, '_blank', 'width=600,height=400');
        });

        document.getElementById('copy-link-btn').addEventListener('click', (e) => {
            navigator.clipboard.writeText(window.location.href).then(() => {
                const copiedText = '복사 완료!';
                e.target.textContent = copiedText;
                setTimeout(() => {
                    e.target.textContent = copyLink;
                }, 2000);
            }).catch(err => {
                console.error('Could not copy text: ', err);
                const failText = '링크 복사에 실패했어요.';
                alert(failText);
            });
        });

        document.getElementById('restart-btn').addEventListener('click', () => {
            window.location.href = `index.html`;
        });
    }
});