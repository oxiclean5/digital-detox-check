document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('start-screen');
    const questionScreen = document.getElementById('question-screen');
    const startBtn = document.getElementById('start-btn');
    
    const questionHeader = document.querySelector('.question-header');
    const questionCounter = document.querySelector('.question-counter');
    const progressBar = document.querySelector('.progress');
    const questionTitle = document.getElementById('question-title');
    const options = document.querySelector('.options');
    const optionBtns = document.querySelectorAll('.option-btn');

    // --- 다국어 질문 데이터 ---
    const questions_ko = [
        "잠자리에 누워서도 스마트폰을 놓지 못할 때가 많다.",
        "특별한 알림이 오지 않아도 수시로 스마트폰을 열어 확인한다.",
        "친구, 가족과 함께 있을 때 대화보다 스마트폰에 더 집중할 때가 있다.",
        "잠깐만 보려고 시작했다가, 의도했던 것보다 훨씬 오랜 시간 스마트폰을 사용하곤 한다.",
        "스마트폰이 근처에 없으면 불안하거나 초조함을 느낀다.",
        "스트레스를 받거나 우울할 때, 기분 전환을 위해 스마트폰 세상으로 피하는 경향이 있다.",
        "화장실에 갈 때나 짧은 거리를 이동할 때도 스마트폰을 꼭 챙긴다.",
        "업무나 공부에 집중해야 할 때, 스마트폰 때문에 흐름이 끊기는 경우가 잦다.",
        "스마트폰을 장시간 사용한 후에 눈이 뻑뻑하거나 목, 어깨에 통증을 느낀다.",
        "스마트폰 사용 때문에 다른 취미나 운동에 소홀해진다고 느낀다."
    ];

    const questions_en = [
        "Do you often find yourself unable to put down your smartphone even when in bed?",
        "Do you frequently check your smartphone even when there are no specific notifications?",
        "When with friends or family, do you sometimes focus more on your smartphone than on the conversation?",
        "Do you often end up using your smartphone for much longer than intended, even if you only planned to check it briefly?",
        "Do you feel anxious or uneasy when your smartphone is not nearby?",
        "When stressed or depressed, do you tend to escape into the smartphone world for a change of mood?",
        "Do you always take your smartphone with you, even for short trips like going to the restroom?",
        "When you need to concentrate on work or study, does your smartphone often interrupt your flow?",
        "Do you experience eye strain, neck, or shoulder pain after prolonged smartphone use?",
        "Do you feel that your smartphone use has led you to neglect other hobbies or physical activities?"
    ];

    // --- 다국어 결과 데이터 (result.html에서 사용) ---
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

    const results_en = {
        safe: {
            title: "✨ Digital Purity Master! ✨",
            description: "Congratulations! You are the master of your smartphone and a model citizen of the digital world. You're truly skilled if you can log out occasionally without feeling anxious.",
            solutions: [
                "<strong>Practice a 'Digital Fasting Day' once a week:</strong> Try to intentionally keep your phone away in the evenings and enjoy a book or music instead.",
                "<strong>Explore new offline hobbies:</strong> How about finding new activities that will further highlight your sense of balance?",
                "<strong>Spread positive influence:</strong> If you have friends struggling with smartphone addiction, subtly share your tips with them."
            ]
        },
        warning: {
            title: "📱 Playing Hard to Get with Your Smartphone 💔",
            description: "You have a love-hate relationship with your smartphone, don't you? That magic trick where you only plan to check it for a moment but it turns into 3 AM? It's not too late!",
            solutions: [
                "<strong>Declare your bedroom a 'Smartphone-Free Zone':</strong> Keep your charger outside the bedroom and use a cheap alarm clock. The effect will be amazing!",
                "<strong>Turn off unnecessary app notifications:</strong> Turn off all notifications from apps you don't need to check immediately (shopping, games, etc.). You are the master of your time.",
                "<strong>Set app usage limits:</strong> Use your smartphone's screen time feature to set limits on specific apps like social media or YouTube. Let your phone nag you."
            ]
        },
        danger: {
            title: "😵 Practically One with Your Smartphone 😵",
            description: "Is your smartphone growing out of your hand? You're a 'Pro Smartphone User' who's with it from the moment you wake up, even in the bathroom!",
            solutions: [
                "<strong>Actively use 'Do Not Disturb' mode:</strong> Schedule Do Not Disturb mode during work, study, or sleep hours to completely block smartphone temptations.",
                "<strong>Create a physical 'Phone-Free Zone':</strong> Designate specific areas like the dining table or bed as 'phone-free zones' and set rules with family or roommates.",
                "<strong>Plan meaningful alternative activities:</strong> Decide specifically what you'll do with the time you save by putting down your phone (e.g., a 10-minute walk, reading 5 pages of a book, stretching)."
            ]
        }
    };

    // 현재 언어 감지 (기본은 한국어)
    const urlParams = new URLSearchParams(window.location.search);
    const lang = urlParams.get('lang') === 'en' ? 'en' : 'ko';

    const questions = lang === 'en' ? questions_en : questions_ko;
    const results = lang === 'en' ? results_en : results_ko;

    let currentQuestionIndex = 0;
    let score = 0;
    let isProcessing = false; // 중복 클릭 방지 플래그

    // 시작 화면 텍스트 업데이트 (언어에 따라)
    if (lang === 'en') {
        document.querySelector('#start-screen h1').textContent = "Digital Detox Index Test";
        document.querySelector('#start-screen p').innerHTML = "How close are you to the digital world?<br>Take a simple test to check your digital habits.";
        document.getElementById('start-btn').textContent = "Start Test";
    }

    startBtn.addEventListener('click', startTest);

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
        // 결과 페이지로 쿼리 파라미터와 함께 이동합니다.
        window.location.href = `result.html?level=${resultLevel}&score=${score}&lang=${lang}`;
    }

    // result.html에서 결과 데이터를 가져오기 위한 전역 함수 (result.html의 script에서 호출)
    window.getResultsData = function() {
        return results;
    };

    // result.html의 Kakao.Share.sendDefault에서 사용할 데이터 (lang에 따라 변경)
    window.getShareData = function(resultData) {
        const shareTitle = lang === 'en' ? `[Digital Detox Test Result] ${resultData.title}` : `[디지털 디톡스 테스트 결과] ${resultData.title}`;
        const shareDescription = resultData.description;
        const testLinkTitle = lang === 'en' ? 'Take the test too!' : '나도 테스트하기';

        return {
            title: shareTitle,
            description: shareDescription,
            testLinkTitle: testLinkTitle
        };
    };
});
