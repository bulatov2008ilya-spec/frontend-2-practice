const MONTHS = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
const DAYS_OF_WEEK = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

let state = {
    currentYear: new Date().getFullYear(),
    currentMonth: new Date().getMonth(),
    selectedDay: new Date().getDate(),
    selectedTime: null,
    slots: ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00"]
};

const today = new Date();
today.setHours(0,0,0,0);

function init() {
    document.getElementById('prev-month').addEventListener('click', () => changeMonth(-1));
    document.getElementById('next-month').addEventListener('click', () => changeMonth(1));
    render();
}

function changeMonth(direction) {
    state.currentMonth += direction;
    if (state.currentMonth < 0) {
        state.currentMonth = 11;
        state.currentYear--;
    } else if (state.currentMonth > 11) {
        state.currentMonth = 0;
        state.currentYear++;
    }
    state.selectedDay = null;
    state.selectedTime = null;
    render();
}

function render() {
    document.getElementById('month-title').innerText = `${MONTHS[state.currentMonth]} ${state.currentYear}`;
    renderCalendar();
    renderSlots();
    updateBottomBar();
}

function renderCalendar() {
    const grid = document.getElementById('calendar-grid');
    grid.innerHTML = '';
    const daysInMonth = new Date(state.currentYear, state.currentMonth + 1, 0).getDate();
    for (let d = 1; d <= daysInMonth; d++) {
        const btn = document.createElement('button');
        btn.innerText = d;
        const cellDate = new Date(state.currentYear, state.currentMonth, d);
        if (cellDate < today) {
            btn.classList.add('disabled');
        } else {
            if (state.selectedDay === d) btn.classList.add('active');
            btn.addEventListener('click', () => {
                state.selectedDay = d;
                state.selectedTime = null;
                render();
            });
        }
        grid.appendChild(btn);
    }
}

function renderSlots() {
    const grid = document.getElementById('time-grid');
    grid.innerHTML = '';
    if (!state.selectedDay) {
        grid.innerHTML = '<div style="grid-column: 1/-1; color: #777;">Выберите день</div>';
        return;
    }
    state.slots.forEach(slot => {
        const btn = document.createElement('button');
        btn.innerText = slot;
        if (state.selectedTime === slot) btn.classList.add('active');
        btn.addEventListener('click', () => {
            state.selectedTime = slot;
            render();
        });
        grid.appendChild(btn);
    });
}

function updateBottomBar() {
    const bar = document.getElementById('bottom-bar');
    if (state.selectedDay) {
        const dateObj = new Date(state.currentYear, state.currentMonth, state.selectedDay);
        const dayName = DAYS_OF_WEEK[dateObj.getDay()];
        const monthName = MONTHS[state.currentMonth].toLowerCase();
        const timeText = state.selectedTime ? ` • Время: ${state.selectedTime}` : ' • Время не выбрано';
        bar.innerText = `${dayName}, ${state.selectedDay} ${monthName} ${state.currentYear} г.${timeText}`;
    } else {
        bar.innerText = 'Выберите дату и время в календаре';
    }
}

document.addEventListener('DOMContentLoaded', init);
