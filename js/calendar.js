/**
 * This is the calendar and event scheduler
 *this page manages calendar rendering, event lookup, and details rendering.
 */

// This is the event dataset with bilingual mapping, add on with the same template if you can
const EVENTS_DATA = [
  {
    date: '2026-02-15',
    title: { en: 'Sunday English Game Night', ja: 'サンデー英語ゲームナイト' },
    time: '18:00 - 19:30',
    location: { en: 'Kawasaki Cultural Center, Room 302', ja: '川崎市文化センター 302号室' },
    description: {
      en: 'Join us for a fun night of board games and English conversation! All elementary school levels are welcome. We will play "English Scrabble" and "Who Am I?".',
      ja: 'ボードゲームや英会話の楽しい夜にぜひご参加ください！小学生ならどのレベルでも大歓迎です。一緒に「英語スクラブル」や「私は誰でしょう？」で遊びましょう！'
    }
  },
  {
    date: '2026-02-22',
    title: { en: 'Nature Explorers Workshop', ja: 'ネイチャー探検ワークショップ' },
    time: '14:00 - 16:00',
    location: { en: 'Todoroki Park, Kawasaki', ja: '等々力公園、川崎市' },
    description: {
      en: 'An outdoor English adventure! We will explore the park, learn names of trees and birds in English, and have a small picnic. Please bring comfortable shoes!',
      ja: '屋外での英語アドベンチャー！公園を探索し、木や鳥の名前を英語で学び、小さなピクニックをします。歩きやすい靴でお越しください！'
    }
  },
  {
    date: '2026-03-01',
    title: { en: 'Spring Greeting Card Making', ja: '春のグリーティングカード作り' },
    time: '10:30 - 12:00',
    location: { en: 'Minato-ku Community Hall, Tokyo', ja: '港区コミュニティホール、東京都' },
    description: {
      en: 'Let\'s get creative! We will make spring-themed greeting cards while learning vocabulary related to flowers, weather, and colors. Materials provided.',
      ja: 'クリエイティブに楽しみましょう！花、天気、色に関する語彙を学びながら、春をテーマにしたグリーティングカードを作ります。材料はこちらで用意します。'
    }
  },
  {
    date: '2026-06-27',
    title: { en: 'スクラム２１ event', ja: 'スクラみ２１' },
    time: '09:00 - 15:30',
    location: { en: '川崎市男女共同参画センター', ja: '川崎市男女共同参画センター' },
    description: {
      en: 'Come visit us at our booth on the 4th floor of the building with fun and interactive games in English!',
      ja: '楽しい英語のお話を聞いて、みんなで演じてみましょう！このワークショップでは、リスニングスキルとスピーキングの自信を養うことに焦点を当てています。'
    }
  }
];

// Months localization 
const MONTH_NAMES = {
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  ja: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
};

// Calendar Application namespace
const CalendarApp = {
  currentDate: new Date(),
  isJa: window.location.pathname.endsWith('-ja.html'),

  init() {
    this.monthDisplay = document.getElementById('monthDisplay');
    this.calendarDays = document.getElementById('calendarDays');
    this.detailsContainer = document.getElementById('eventDetails');

    if (!this.monthDisplay || !this.calendarDays || !this.detailsContainer) return;

    this.bindEvents();
    this.render();
  },

  bindEvents() {
    document.getElementById('prevMonth')?.addEventListener('click', () => {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
      this.render();
    });

    document.getElementById('nextMonth')?.addEventListener('click', () => {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      this.render();
    });
  },

  render() {
    this.calendarDays.innerHTML = '';

    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const monthName = MONTH_NAMES[this.isJa ? 'ja' : 'en'][month];
    this.monthDisplay.innerText = this.isJa ? `${year}年 ${monthName}` : `${monthName} ${year}`;

    const firstDayIndex = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();
    for (let i = 0; i < firstDayIndex; i++) {
      const emptyDay = document.createElement('div');
      emptyDay.classList.add('day', 'empty');
      this.calendarDays.appendChild(emptyDay);
    }

    // Populate the day cells
    const today = new Date();
    for (let day = 1; day <= lastDay; day++) {
      const dayElement = document.createElement('div');
      dayElement.classList.add('day');
      dayElement.innerText = day;

      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

      // When todays cell is highlighted
      if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
        dayElement.classList.add('today');
      }

      // Check event database
      const event = EVENTS_DATA.find(e => e.date === dateString);
      if (event) {
        dayElement.classList.add('has-event');
        dayElement.title = this.isJa ? event.title.ja : event.title.en;
      }

      // Cell selection logic
      dayElement.addEventListener('click', () => {
        document.querySelectorAll('.day').forEach(d => d.classList.remove('selected'));
        dayElement.classList.add('selected');
        this.showDetails(event, dateString);
      });

      this.calendarDays.appendChild(dayElement);
    }
  },
  //DONT TOUCH ANYTHING BELOW HERE
  showDetails(event, dateString) {
    if (!event) {
      this.detailsContainer.innerHTML = `
        <div class="details-placeholder">
          <i class="fas fa-calendar-alt fa-3x mb-4" style="color: #cbd5e0;"></i>
          <h3>${this.isJa ? 'この日はワークショップがありません' : 'No workshops on this day'}</h3>
          <p>${this.isJa ? '日付' : 'Date'}: ${dateString}</p>
          <p>${this.isJa ? '後でもう一度確認するか、別の日付を選択してください！' : 'Check back later or select another date!'}</p>
        </div>
      `;
      return;
    }

    const title = this.isJa ? event.title.ja : event.title.en;
    const location = this.isJa ? event.location.ja : event.location.en;
    const description = this.isJa ? event.description.ja : event.description.en;
    const applyHref = this.isJa ? 'apply-ja.html' : 'apply.html';
    const applyText = this.isJa ? 'このワークショップに参加する &rarr;' : 'Join this workshop &rarr;';

    this.detailsContainer.innerHTML = `
      <div class="event-card">
        <h3>${title}</h3>
        <div class="event-info-item">
          <i class="fas fa-clock"></i>
          <span>${event.time}</span>
        </div>
        <div class="event-info-item">
          <i class="fas fa-map-marker-alt"></i>
          <span>${location}</span>
        </div>
        <div class="event-info-item">
          <i class="fas fa-calendar-day"></i>
          <span>${dateString}</span>
        </div>
        <div class="event-description">
          <p>${description}</p>
        </div>
        <div style="margin-top: 2rem;">
          <a href="${applyHref}" class="btn btn-primary">${applyText}</a>
        </div>
      </div>
    `;
  }
};

document.addEventListener('DOMContentLoaded', () => CalendarApp.init());
