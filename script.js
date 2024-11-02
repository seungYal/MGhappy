const dayNames = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'];

// JSON 데이터 불러오기
fetch('verses.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('데이터 로드 실패');
    }
    return response.json();
  })
  .then(data => {
    displayVerseData(data); // 데이터 로드 후 displayVerseData 호출
  })
  .catch(error => console.error('데이터 로드 실패:', error));

// JSON 데이터 불러오기
fetch('data.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('데이터 로드 실패');
    }
    return response.json();
  })
  .then(data => {
    const weeklyData = data.weeks;
    displayWeeklyData(weeklyData); // 데이터 로드 후 displayWeeklyData 호출
  })
  .catch(error => console.error('데이터 로드 실패:', error));

// 오늘의 날짜와 구절 데이터 표시 함수
function displayVerseData(data) {
  const today = new Date();

  // 10월 14일부터 시작하는 주차 계산
  const startDate = new Date(today.getFullYear(), 9, 14); // 10월 14일
  const diffDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24)); // 날짜 차이 계산
  const weekIndex = Math.floor(diffDays / 7); // 주차 인덱스 계산

  // 주차 데이터 선택
  const weekData = data.verses.filter(verse => verse.weeks === weekIndex + 1);

  // HTML에 오늘의 데이터 표시
  if (weekData.length > 0) {
    document.getElementById('weekVerse').textContent = `${weekData[0].verse}: ${weekData[0].text}`;
  } else {
    document.getElementById('weekVerse').textContent = "이번 주에 해당하는 구절이 없습니다.";
  }
}

// 주별 데이터 표시 함수
function displayWeeklyData(weeklyData) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const date = today.getDate();

  // 이번 주 월요일 계산하기
  const dayOfWeek = today.getDay();
  const startOfWeek = new Date(year, month, date - dayOfWeek + 1);

  // 주차 인덱스 계산 (10월 14일 기준으로 첫 주 시작)
  const weekIndex = Math.floor((startOfWeek.getDate() - 14) / 7) % weeklyData.length;
  const weekData = weeklyData[weekIndex];

  // 요일 인덱스 조정 (일요일은 배열의 마지막으로 이동)
  const adjustedDayIndex = (dayOfWeek + 6) % 7;

  // HTML 초기화
  const weekDataList = document.getElementById('weekData');
  weekDataList.innerHTML = ''; // 기존 내용을 지움

  // 오늘의 데이터 표시 (today 영역에)
  const todayData = weekData[adjustedDayIndex] || '없음';
  const todayLabel = `${dayNames[adjustedDayIndex]} (${startOfWeek.toLocaleDateString()}) - ${todayData}`;
  document.getElementById('today').textContent = `${todayLabel}`;

  // 이번 주의 각 날짜와 데이터를 리스트에 표시
  weekData.forEach((data, index) => {
    const dayLabel = new Date(startOfWeek);
    dayLabel.setDate(startOfWeek.getDate() + index);

    const li = document.createElement('li');
    li.textContent = `${dayNames[index]} (${dayLabel.toLocaleDateString()}) - ${data}`;

    weekDataList.appendChild(li);
  });
}

// 페이지가 로드되면 데이터 표시
window.onload = function() {
  fetch('verses.json').then(response => response.json()).then(displayVerseData);
  fetch('data.json').then(response => response.json()).then(data => displayWeeklyData(data.weeks));
};