let weeks = ["SUN", "MON", "THE", "WED", "THEU", "FRA", "SAT"];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const btnNavigationCalendra = document.querySelectorAll(".year-slide > span");

console.log(btnNavigationCalendra);
const calendraContainer = document.querySelector(".calendra-list");
const weeksContainer = document.querySelector(".week");
const daysContainer = document.querySelector(".days");
const detailDateContainer = document.querySelector(".content-text-day");
const yearDateContainer = document.querySelector(".year-slide-content");
const date = new Date();
let currentDay = date.getDay();
let currentDate = date.getDate();
let currentMonth = date.getMonth();
let currentMonthName = months[currentMonth + 2];
let currentYear = date.getFullYear();
function renderYear() {
  detailDateContainer.firstElementChild.textContent = currentDate;
  detailDateContainer.lastElementChild.textContent = months[currentMonth + 2];
  yearDateContainer.firstElementChild.textContent = months[currentMonth + 2];
  yearDateContainer.lastElementChild.textContent = currentYear;
}
function addEventListenerToYearBtn() {
  btnNavigationCalendra.forEach((item) => {
    item.addEventListener("click", () => {
      if (item.classList.contains("prev")) {
        currentMonth--;
        if (currentMonth <= 0) {
          currentYear--;
          currentMonth = 11;
          renderDays();
          renderYear();
        }
        renderDays();
        renderYear();
      } else if (item.classList.contains("next")) {
        currentMonth++;
        if (currentMonth >= 11) {
          currentYear++;
          currentMonth = 1;
          renderDays();
          renderYear();
        }
        renderDays();
        renderYear();
      }
    });
  });
}
function renderWeek() {
  weeks.forEach((item) => {
    const liTag = document.createElement("li");
    liTag.textContent = item;
    weeksContainer.appendChild(liTag);
  });
}
function renderDays() {
  let lastDateinPastMonth = new Date(currentYear, currentMonth, 0).getDate();
  const firstDayInMonth = new Date(currentYear, currentMonth, 1).getDay();

  const lastDateinCurrMonth = new Date(
    currentYear,
    currentMonth + 1,
    0
  ).getDate();
  const lastDayInMonth = new Date(
    currentYear,
    currentMonth,
    lastDateinCurrMonth
  ).getDay();

  daysContainer.textContent = "";
  for (let i = firstDayInMonth; i > 0; i--) {
    const liTag = document.createElement("li");
    liTag.textContent = lastDateinPastMonth - i + 1;
    liTag.classList.add("outer-month");
    daysContainer.appendChild(liTag);
  }
  for (let i = 1; i < lastDateinCurrMonth; i++) {
    const liTag = document.createElement("li");
    liTag.textContent = i;
    liTag.setAttribute("data-num-date", i);
    if (
      currentYear === date.getFullYear() &&
      currentMonth === date.getMonth() &&
      i === date.getDate()
    ) {
      liTag.classList.add("selected");
    }
    daysContainer.appendChild(liTag);
  }
  for (let i = lastDayInMonth; i < 7; i++) {
    const c = lastDayInMonth - 1;
    const liTag = document.createElement("li");
    liTag.textContent = i - c;
    liTag.classList.add("outer-month");
    daysContainer.appendChild(liTag);
  }
}
renderYear();
renderWeek();
renderDays();

addEventListenerToYearBtn();
