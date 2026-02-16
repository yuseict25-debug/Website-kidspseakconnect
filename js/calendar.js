/* calendar.js */

// Sample Event Data
const events = [
    {
        date: '2026-02-15',
        title: 'Sunday English Game Night',
        time: '18:00 - 19:30',
        location: 'Kawasaki Cultural Center, Room 302',
        description: 'Join us for a fun night of board games and English conversation! All elementary school levels are welcome. We will play "English Scrabble" and "Who Am I?".'
    },
    {
        date: '2026-02-22',
        title: 'Nature Explorers Workshop',
        time: '14:00 - 16:00',
        location: 'Todoroki Park, Kawasaki',
        description: 'An outdoor English adventure! We will explore the park, learn names of trees and birds in English, and have a small picnic. Please bring comfortable shoes!'
    },
    {
        date: '2026-03-01',
        title: 'Spring Greeting Card Making',
        time: '10:30 - 12:00',
        location: 'Minato-ku Community Hall, Tokyo',
        description: 'Let\'s get creative! We will make spring-themed greeting cards while learning vocabulary related to flowers, weather, and colors. Materials provided.'
    },
    {
        date: '2026-03-08',
        title: 'Interactive Storytelling Session',
        time: '15:00 - 16:30',
        location: 'Kawasaki Library (Kids Corner)',
        description: 'Listen to a fun English story and act it out together! This workshop focuses on listening skills and building confidence in speaking.'
    }
];

let currentDate = new Date();

function renderCalendar() {
    const monthDisplay = document.getElementById('monthDisplay');
    const calendarDays = document.getElementById('calendarDays');

    // Clear previous days
    calendarDays.innerHTML = '';

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Set Month Display
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    monthDisplay.innerText = `${monthNames[month]} ${year}`;

    // Get first day of month and total days
    const firstDayIndex = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();

    // Add empty slots for days of previous month
    for (let i = 0; i < firstDayIndex; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('day', 'empty');
        calendarDays.appendChild(emptyDay);
    }

    // Add days of current month
    for (let i = 1; i <= lastDay; i++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.innerText = i;

        const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;

        // Check for "today"
        const today = new Date();
        if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            dayElement.classList.add('today');
        }

        // Check for events
        const event = events.find(e => e.date === dateString);
        if (event) {
            dayElement.classList.add('has-event');
            dayElement.title = event.title;
        }

        dayElement.addEventListener('click', () => {
            // Remove previous selection
            document.querySelectorAll('.day').forEach(d => d.classList.remove('selected'));
            dayElement.classList.add('selected');
            showEventDetails(event, dateString);
        });

        calendarDays.appendChild(dayElement);
    }
}

function showEventDetails(event, dateString) {
    const detailsContainer = document.getElementById('eventDetails');

    if (!event) {
        detailsContainer.innerHTML = `
            <div class="details-placeholder">
                <i class="fas fa-calendar-alt fa-3x mb-4" style="color: #cbd5e0;"></i>
                <h3>No workshops on this day</h3>
                <p>Date: ${dateString}</p>
                <p>Check back later or select another date!</p>
            </div>
        `;
        return;
    }

    detailsContainer.innerHTML = `
        <div class="event-card">
            <h3>${event.title}</h3>
            <div class="event-info-item">
                <i class="fas fa-clock"></i>
                <span>${event.time}</span>
            </div>
            <div class="event-info-item">
                <i class="fas fa-map-marker-alt"></i>
                <span>${event.location}</span>
            </div>
            <div class="event-info-item">
                <i class="fas fa-calendar-day"></i>
                <span>${dateString}</span>
            </div>
            <div class="event-description">
                <p>${event.description}</p>
            </div>
            <div style="margin-top: 2rem;">
                <a href="apply.html" class="btn btn-primary">Join this workshop &rarr;</a>
            </div>
        </div>
    `;
}

// Navigation Listeners
document.getElementById('prevMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

document.getElementById('nextMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

// Initial Render
document.addEventListener('DOMContentLoaded', renderCalendar);
