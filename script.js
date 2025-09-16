
const addIncome = document.getElementById("addIncome");
const addExpense = document.getElementById("addExpense");

let Transactions = [];

function saveTransactions ()  {
localStorage.setItem("transactions", JSON.stringify(Transactions));
}

function renderTransactions () {
    const list = document.getElementById("transactions");
    list.innerHTML = "";

    const sorted = [...Transactions].sort( (i, e) => {
        if (i.type === "expense" && e.type === "income") return -1;
        if (i.type === "income" && e.type === "expense") return 1;
        return e.id - i.id;
    })

    sorted.forEach (t => {
        const li = document.createElement("li");
        li.classList.add("transaction", t.type);
        const icon = t.type === "income" ? "💵" : "💸";
        li.style.color = t.type === "income" ? "green" : "red";

        const textDiv = document.createElement("div");
        textDiv.classList.add("text")
        textDiv.innerHTML = `
        <div class="dics">${t.dics} - $${t.amount}</div>
        <div class="date">${t.date}</div>
        `;
        
        const btn = document.createElement("button");
    btn.textContent = "❌";
    btn.onclick = () => deleteTransaction(t.id);


    li.appendChild(textDiv);
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