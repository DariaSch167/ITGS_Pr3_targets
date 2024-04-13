// Класс для карточки цели
class Target {
  constructor(
    name,
    category,
    totalSum,
    priority,
    startDate,
    dueDate,
    savedSum
  ) {
    this.name = name;
    this.category = category;
    this.totalSum = totalSum;
    this.priority = priority;
    this.startDate = startDate;
    this.dueDate = dueDate;
    this.savedSum = savedSum;
  }

  getName() {
    return this.name;
  }
  getImg() {
    let categoryImg =
      this.category === "Дом"
        ? "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        : this.category === "Машина"
        ? "https://images.pexels.com/photos/18262220/pexels-photo-18262220.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        : this.category === "Техника"
        ? "https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        : this.category === "Дети"
        ? "https://images.pexels.com/photos/8208262/pexels-photo-8208262.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        : this.category === "Обучение"
        ? "https://images.pexels.com/photos/9572509/pexels-photo-9572509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        : this.category === "Отпуск"
        ? "https://images.pexels.com/photos/2373201/pexels-photo-2373201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        : this.category === "Шоппинг"
        ? "https://images.pexels.com/photos/135620/pexels-photo-135620.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        : "https://images.pexels.com/photos/3393477/pexels-photo-3393477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
    return categoryImg;
  }
  getCategory() {
    return this.category;
  }
  getTotalSum() {
    return this.totalSum.toLocaleString("ru-RU");
  }
  getPriority() {
    return this.priority;
  }
  getDueDate() {
    return (
      this.dueDate.getDate() +
      "." +
      (this.dueDate.getMonth() + 1) +
      "." +
      this.dueDate.getFullYear()
    );
  }
  getStartDate() {
    return (
      this.startDate.getDate() +
      "." +
      (this.startDate.getMonth() + 1) +
      "." +
      this.startDate.getFullYear()
    );
  }
  getDaysTillTargetEnd() {
    let currentDate = Date.now();
    let difference =
      Math.floor((Date.parse(this.dueDate) - currentDate) / 1000 / 3600 / 24) +
      1;
    let ending =
      (difference > 10) & (difference < 20)
        ? " дней"
        : (difference % 100) / 10 == 1
        ? " дней"
        : difference % 10 == 1
        ? " день"
        : difference % 10 == 2
        ? " дня"
        : difference % 10 == 3
        ? " дня"
        : difference % 10 == 4
        ? " дня"
        : " дней";
    return difference + " " + ending;
  }
  getSavedSum() {
    return this.savedSum.toLocaleString("ru-RU");
  }
  addSavings(addSumm) {
    return (this.savedSum = this.savedSum + addSumm).toLocaleString("ru-RU");
  }
  getDifferenceSum() {
    return (this.totalSum - this.savedSum).toLocaleString("ru-RU");
  }
  getProgressNum() {
    let percent = (this.savedSum * 100) / this.totalSum;
    return Math.ceil(percent);
  }
}

// Проверочный пример класса и его методов
let exampleDueDate = new Date("2024-06-13");
let today = new Date();
exampleOne = new Target(
  "Новая машина",
  "Машина",
  6000000,
  "medium",
  today,
  exampleDueDate,
  5000
);
console.log(exampleOne.getName());
console.log(exampleOne.getImg());
console.log(exampleOne.getTotalSum());
console.log(exampleOne.getPriority());
console.log(exampleOne.getDueDate());
console.log(exampleOne.getStartDate());
console.log(exampleOne.getDaysTillTargetEnd());
console.log(exampleOne.getSavedSum());
console.log(exampleOne.getDifferenceSum());
console.log(exampleOne.addSavings(80));
console.log(exampleOne.getSavedSum());
console.log(exampleOne.getDifferenceSum());
console.log(exampleOne.getProgressNum());

// Массив с целями из Local storage
// let targetsListJson = localStorage.getItem("targetsList");
// let targetsList = targetsListJson ? JSON.parse(targetsListJson) : [];
let targetsList = [
  {
    name: "Новая машина",
    category: "Машина",
    sum: 6000000,
    priority: "low",
    startDate: today,
    dueDate: exampleDueDate,
    savedSum: 500000,
  },
  {
    name: "Квартира",
    category: "Дом",
    sum: 16000000,
    priority: "high",
    startDate: today,
    dueDate: exampleDueDate,
    savedSum: 1500000,
  },
  {
    name: "Курсы фронтенда",
    category: "Другое",
    sum: 100000,
    priority: "medium",
    startDate: today,
    dueDate: exampleDueDate,
    savedSum: 10000,
  },
];

// Для отображения целей из Local storage при перезагрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  emptyError.textContent = "";
  if (targetsList.length === 0) {
    emptyError.textContent = "Добавьте первую цель";
  } else {
    targetsList.forEach(function (target) {
      let target = new Target(
        targetsList.name,
        targetsList.category,
        targetsList.sum,
        targetsList.priority,
        targetsList.startDate,
        targetsList.dueDate,
        targetsList.savedSum
      );
      createTargetCard(target);
    });
  }
});

// Создание карточки цели
const targetWrapper = document.querySelector(".target_wrapper");
const emptyError = document.querySelector(".target_empty-error");

function createTargetCard(target) {
  const targetCard = document.createElement("div");
  targetCard.classList.add("target_card");
  targetWrapper.append(targetCard);

  targetCard.innerHTML = `
  <div class="target_title">
  <h2 class="target_name">${target.getName()}</h2>
  <button class="target_add_savings"></button>
  </div>
  <div class="target_description">
  <img class="target_img" src="${target.getImg()}" alt="${target.getCategory()}">
  <div class="target_info">
  <div class="target_due-date">
  <p>Конец сбора через:</p>
  <p>${target.getDaysTillTargetEnd()}</p>
  </div>
  <div class="target_sum-rest">
  <p>Осталось собрать:</p>
  <p>${target.getDifferenceSum()} ₽</p>
  </div>
  </div>
  </div>
  <div class="target_progress">
  <p>Прогресс цели ${target.getSavedSum()} ₽ из ${target.getTotalSum()} ₽</p>
  <div class="progress-bar">
  <div class="progress-bar-inner"></div>
  </div>
  </div>`;

  const progressBar = document.querySelector(".progress-bar");
  const progressBarInner = document.querySelector(".progress-bar-inner");
  let progressColor =
    target.getProgressNum() < 19
      ? "inner-start"
      : target.getProgressNum() >= 20 && target.getProgressNum() < 79
      ? "inner-middle"
      : target.getProgressNum() >= 80
      ? "inner-finish"
      : "";
  progressBarInner.classList.add(progressColor);
  progressBarInner.style.width = target.getProgressNum() + "%";

  if (target.getProgressNum() >= 15) {
    progressBarInner.textContent = target.getProgressNum() + "%";
  } else {
    const progressBarText = document.createElement("div");
    progressBarText.textContent = target.getProgressNum() + "%";
    progressBar.append(progressBarText);
  }
}

createTargetCard(exampleOne);
