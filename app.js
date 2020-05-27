const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transaction = localStorage.getItem('transactions') !== null ?
	localStorageTransactions : [];

function addTransactionDOM(transaction) {
	const sign = transaction.amount < 0 ? '-' : '+';
	const item = document.createElement('li');
	item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
	item.innerHTML =
		`
		${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span> <button class="delete-btn"></button>`;
	list.appendChild(item);
}

function updateValues() {
	const amounts = transaction.map(transaction => transaction.amount);
	const total = amounts.reduce((acc, item) => (acc += item), 0)
		.toFixed(2);

	const income = amounts.filter(item => item > 0)
		.reduce((acc, item) => (acc += item), 0)
		.toFixed(2);

	const expense = (amounts.filter(item => item < 0)
			.reduce((acc, item) => (acc += item), 0) * (-1))
		.toFixed(2);

	balance.innerText = `$${total}`;
	money_plus.innerHTML = `$${income}`;
	money_minus.innerHTML = `$${expense}`;
}

function init() {
	list.innerHTML = '';
	transaction.forEach(addTransactionDOM);
}

init();
