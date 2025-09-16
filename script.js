
const addIncome = document.getElementById("addIncome");
const addExpense = document.getElementById("addExpense");

let Transactions = [];

function saveTransactions ()  {
localStorage.setItem("transactions", JSON.stringify(Transactions));
}

function renderTransactions() {
    const list = document.getElementById("transactions");
    list.innerHTML = "";

    const reversed = [...Transactions].reverse();

    reversed.forEach(t => {
        const li = document.createElement("li");
        li.classList.add("transaction");

        li.innerHTML = `
            <div class="details">
                <span class="desc">${t.dics}</span>
                <span class="date">${t.date}</span>
            </div>
            <div class="amount ${t.type}">
                ${t.type === "income" ? "+" : "-"}$${t.amount}
            </div>
            <button class="delete">❌</button>
        `;

        li.querySelector(".delete").onclick = () => deleteTransaction(t.id);
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

    const messageDiv = document.getElementById("message")
    const dics = document.getElementById("disc").value.trim();
    const amount = parseFloat(document.getElementById("amount").value);

    if (disc === "" || isNaN(amount) || amount <= 0){
        messageDiv.textContent = "Please enter a valid Description and Amount";
        setTimeout( () => {messageDiv.textContent = "";}, 3000);
        return;
    }

    const transaction = {
     id: Date.now(),
     dics,
     amount,
     type,
     date: new Date().toLocaleString('en-US', {
        month: 'short',     // Sep
        day: 'numeric',     // 15
        year: 'numeric',    // 2025
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
       })
   };

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