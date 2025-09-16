
const addIncome = document.getElementById("addIncome");
const addExpense = document.getElementById("addExpense");

let Transactions = [];

function saveTransactions ()  {
localStorage.setItem("transactions", JSON.stringify(Transactions));
}

function renderTransactions () {
    const list = document.getElementById("transactions");
    list.innerHTML = "";

    Transactions.forEach (t => {
        const li = document.createElement("li");
        li.innerHTML = `
        <span>${t.dics} - $${t.amount}</span>
        <span style="font-size:0.8em; color:gray;">${t.date}</span>
        `;
        li.style.color = t.type === "income" ? "green" : "red";

        const btn = document.createElement("button");
    btn.textContent = "❌";
    btn.onclick = () => deleteTransaction(t.id);

    li.appendChild(btn);
    list.appendChild(li);
    });

}

function updateSummary () {
    let income = 0, expense = 0;

    Transactions.forEach (t => {
        if (t.type === "income") income += t.amount;
        else
        expense += t.amount;
    });

    const balance = income - expense

    document.getElementById("income").textContent = income;
    document.getElementById("expense").textContent = expense;
    document.getElementById("balance").textContent = balance;
}

function addTransactions (type) {

    const dics = document.getElementById("disc").value.trim();
    const amount = parseFloat(document.getElementById("amount").value);

    if (disc === "" || isNaN(amount) || amount <= 0){
        alert("Please enter a valid Description and Amount.");
        return;
    }

    const transaction = {
        id: Date.now(),
        dics,
        amount,
        type,
        date: new Date().toLocaleString()
    }
    Transactions.push(transaction);
    saveTransactions();
    renderTransactions();
    updateSummary();

    document.getElementById("disc").value = "";
    document.getElementById("amount").value = "";
}

function loadTransactions () {
    const data = localStorage.getItem("transactions");
    if (data){
        Transactions = JSON.parse(data);
    }

    renderTransactions();
    updateSummary();
}

function deleteTransaction (id) {
    Transactions = Transactions.filter(t => t.id !== id);

    saveTransactions();
    renderTransactions();
    updateSummary();
}

addIncome.addEventListener("click", () => addTransactions("income"));
addExpense.addEventListener("click", () => addTransactions("expense"));

loadTransactions();