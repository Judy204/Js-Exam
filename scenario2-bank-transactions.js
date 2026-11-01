// Scenario 2: Bank Account Transactions

const transactions = [
  { id: 1, type: "deposit", amount: 1000 },
  { id: 2, type: "withdraw", amount: 200 },
  { id: 3, type: "deposit", amount: 500 },
  { id: 4, type: "withdraw", amount: 100 }
];

// Total deposits
function calculateTotalDeposits() {
  return transactions
    .filter((t) => t.type === "deposit")
    .reduce((sum, t) => sum + t.amount, 0);
}

// Total withdrawals
function calculateTotalWithdrawals() {
  return transactions
    .filter((t) => t.type === "withdraw")
    .reduce((sum, t) => sum + t.amount, 0);
}

// Final balance
function calculateBalance() {
  return calculateTotalDeposits() - calculateTotalWithdrawals();
}

// Largest transaction
function getLargestTransaction() {
  if (transactions.length === 0) return null;
  return transactions.reduce((max, t) => (t.amount > max.amount ? t : max));
}

// All withdrawals
function getWithdrawals() {
  return transactions.filter((t) => t.type === "withdraw");
}

// Add a new transaction (prevents withdrawal greater than balance)
function addTransaction(type, amount) {
  if (type !== "deposit" && type !== "withdraw") return "Invalid transaction type";
  if (typeof amount !== "number" || amount <= 0) return "Amount must be greater than 0";

  if (type === "withdraw" && amount > calculateBalance()) {
    return "Insufficient balance";
  }

  const newId = transactions.length > 0 ? transactions[transactions.length - 1].id + 1 : 1;
  const transaction = { id: newId, type, amount };
  transactions.push(transaction);
  return transaction;
}

// ---------- Tests ----------
console.log("Deposits:", calculateTotalDeposits());        // 1500
console.log("Withdrawals:", calculateTotalWithdrawals());  // 300
console.log("Balance:", calculateBalance());               // 1200
console.log("Largest:", getLargestTransaction());
console.log("Withdrawals list:", getWithdrawals());
console.log(addTransaction("withdraw", 5000));             // Insufficient balance
console.log(addTransaction("deposit", 300));
console.log(addTransaction("withdraw", 400));
console.log("New balance:", calculateBalance());           // 1100
