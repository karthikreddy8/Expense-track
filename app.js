var btn = document.querySelector("#btn");
var  expenseType = document.querySelector("#expenseType");
 var expenseAmount = document.querySelector("#amount");
var container = document.querySelector("#container");
var totalExpense = document.querySelector("#totalExpense");


function createExpenseCard(expenseType, amount) {
  const div = document.createElement("div");
  const type = document.createElement("h3");
  const amt = document.createElement("h3");

  type.textContent = expenseType;
  amt.textContent = amount + "$";

  type.id = "expenseItem";
  amt.id = "expenseItem";

  div.appendChild(type);
  div.appendChild(amt);

  div.id = "expenseCard";

  container.appendChild(div);
}

let currExpense = 0;

function updateTotalExpense(amount) {
  currExpense += parseInt(amount);
  totalExpense.textContent = `Total Expense : ${currExpense}$`;
}

let localContainer = [];

btn.addEventListener("click", () => {
  const type = expenseType.value;
  const amt = expenseAmount.value;

  localContainer.push({ type, amt });

  localStorage.setItem("localArr", JSON.stringify(localContainer));

  expenseType.value = "";
  expenseAmount.value = "";
  createExpenseCard(type, amt);
  updateTotalExpense(amt);
});

container.addEventListener("click", (event) => {
  const currBtn = event.target;
  if (currBtn.id === "deleteIcon") {
    currExpense -= parseInt(
      currBtn.previousElementSibling.textContent.replace("$", "")
    );
    totalExpense.textContent = `Total Expense : ${currExpense}$`;
    const currDiv = currBtn.parentElement;
    container.removeChild(currDiv);
  }
});

window.addEventListener("load", () => {
  let localArr = JSON.parse(localStorage.getItem("localArr"));

  if (localArr) {
    localArr.map((item) => {
      createExpenseCard(item.type, item.amt);
      updateTotalExpense(item.amt);
    });
  }
});