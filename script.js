const balanceAmount = document.getElementById('balance');
const incomeValue = document.getElementById('incomeValue');
const expenseValue = document.getElementById('expenseValue');
const history = document.getElementById('historyList');
const textField = document.getElementById('textInput');
const amountField = document.getElementById('amount');
const addTransactionBtn = document.getElementById('addButton');
let text;
let amount;
let income = 0;
let expense = 0;
let balance = 0;

//add new transaction
function addNewTransaction() {
  getInput();
  updateBalance();
  updateHistory();
  clearInput();
}

//clear input fields after adding new transaction
function clearInput() {
  textField.value = '';
  amountField.value = '';
}

//alert if all fields are not filled, else save input from fields in variables
function getInput() {
  if (textField.value == '' || amountField.value == '') {
    alert('Please fill Text and Amount fields before submitting');
  } else {
    text = textField.value;
    amount = +amountField.value;
  }
}

//update income/expense and main balanse
function updateBalance() {
  if (amount >= 0) {
    income += amount;
    incomeValue.innerHTML = income;
  } else if (amount < 0) {
    expense += amount;
    expenseValue.innerHTML = expense;
  } else {
  }
  balance += amount;
  balanceWithDecimals = balance.toFixed(2);
  balanceAmount.innerHTML = `$${balanceWithDecimals}`;
}

//add new entry in history
function updateHistory() {
  //create elements
  let liElement = document.createElement('LI');
  let delBtn = document.createElement('DIV');
  let liDiv = document.createElement('div');
  let textNode = document.createTextNode(textField.value);
  let spanElement = document.createElement('SPAN');
  //add innerHtml
  spanElement.innerHTML = amountField.value;
  delBtn.innerHTML = 'x';
  //set attributes
  delBtn.setAttribute('class', 'delBtn');
  liDiv.setAttribute('class', 'liDiv');
  //append elements to each other and to parent div
  liDiv.appendChild(textNode);
  liDiv.appendChild(spanElement);
  liElement.appendChild(delBtn);
  liElement.appendChild(liDiv);
  history.appendChild(liElement);
  //if amount is higher than 0 add green class, else add red class
  amount >= 0
    ? liElement.classList.add('green')
    : liElement.classList.add('red');

  delBtn.addEventListener('click', deleteEntry);
}

//delete entry in history and update balances
function deleteEntry(e) {
  amount = +e.target.parentElement.childNodes[1].childNodes[1].innerHTML;

  if (amount >= 0) {
    income -= amount;
    incomeValue.innerHTML = income;
  } else if (amount < 0) {
    expense -= amount;
    expenseValue.innerHTML = expense;
  } else {
  }
  balance -= amount;
  balanceWithDecimals = balance.toFixed(2);
  balanceAmount.innerHTML = `$${balanceWithDecimals}`;

  e.target.parentElement.remove();
}

//event listners
addTransactionBtn.addEventListener('click', addNewTransaction);
