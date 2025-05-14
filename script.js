// Store expenses in an array
let expenses = [];

// Function to add a new expense
function addExpense() {
    const category = document.getElementById('category').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (category && amount) {
        // Add expense to array
        expenses.push({ category, amount });

        // Add expense to table
        updateExpensesList();

        // Clear input fields
        document.getElementById('category').value = '';
        document.getElementById('amount').value = '';
    } else {
        alert('Please fill in both category and amount!');
    }
}

// Function to update the expenses list in the table
function updateExpensesList() {
    const expensesList = document.getElementById('expensesList');
    expensesList.innerHTML = '';

    expenses.forEach((expense, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.category}</td>
            <td>$${expense.amount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
            <td><button class="delete-btn" onclick="deleteExpense(${index})">Delete</button></td>
        `;
        expensesList.appendChild(row);
    });
}

// Function to delete an expense
function deleteExpense(index) {
    expenses.splice(index, 1);
    updateExpensesList();
}

// Function to calculate and display results
function calculateExpenses() {
    if (expenses.length === 0) {
        alert('Please add some expenses first!');
        return;
    }

    // Calculate total expenses
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    
    // Calculate average daily expense (assuming 30 days per month)
    const averageDaily = total / 30;

    // Get top 3 expenses
    const topExpenses = [...expenses]
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 3);

    // Update display
    document.getElementById('totalExpenses').textContent = 
        `$${total.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    
    document.getElementById('averageExpense').textContent = 
        `$${averageDaily.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;

    const topExpensesList = document.getElementById('topExpenses');
    topExpensesList.innerHTML = topExpenses
        .map(expense => `<li>${expense.category}: $${expense.amount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</li>`)
        .join('');

    // If less than 3 expenses, fill remaining slots with placeholder
    for (let i = topExpenses.length; i < 3; i++) {
        topExpensesList.innerHTML += '<li>-</li>';
    }
} 