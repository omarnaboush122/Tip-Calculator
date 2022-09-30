let money = document.getElementById("dollar");
let people = document.getElementById("people");
let lis = document.querySelectorAll("ul li:not(:last-child)");
let custom = document.querySelector(".custom input");
let amount = document.querySelector(".amount h1");
let total = document.querySelector(".total h1");
let reset = document.querySelector("button");

let liValue = 0;
let billValue = 0.0;
let peopleNumber = 0;

lis.forEach((li) => {
  li.addEventListener("click", (li) => {
    lis.forEach((li) => {
      li.classList.remove("active");
    });
    li.currentTarget.classList.add("active");
    liValue = parseFloat(li.currentTarget.innerHTML) / 100;
    custom.value = "";
    calculate();
  });
});

money.addEventListener("input", setBillValue);

people.addEventListener("input", setPeopleNumber);

custom.addEventListener("input", setCustomValue);

reset.addEventListener("click", resetAll);

people.onblur = function () {
  if (peopleNumber === "0") {
    addError(people);
  } else {
    removeError(people);
  }
};

function addError(field) {
  const parent = field.parentElement;
  parent.classList.add("error");
}

function removeError(field) {
  const parent = field.parentElement;
  parent.classList.remove("error");
}

function setPeopleNumber() {
  peopleNumber = people.value;
  calculate();
}

function setBillValue() {
  billValue = parseFloat(money.value);
  if (money.value.includes(",")) {
    money.value = money.value.replace(",", ".");
  }
  calculate();
}

function setCustomValue() {
  liValue = parseFloat(custom.value) / 100;
  lis.forEach((li) => {
    li.classList.remove("active");
  });
  calculate();
}

function calculate() {
  if (peopleNumber >= 1) {
    let amountt = (billValue * liValue) / peopleNumber;
    let totall =
      billValue / peopleNumber + (billValue * liValue) / peopleNumber;
    amount.innerHTML = "$" + amountt.toFixed(2);
    total.innerHTML = "$" + totall.toFixed(2);
  }
}

function resetAll() {
  money.value = "0.0";
  setBillValue();
  people.value = "1";
  setPeopleNumber();
  lis.forEach((li) => {
    li.classList.remove("active");
  });
}
