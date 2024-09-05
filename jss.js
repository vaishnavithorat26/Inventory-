const inventoryContainer = document.getElementById('inventory-container');
const addItemForm = document.getElementById('add-item-form');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const sortAscBtn = document.getElementById('sort-asc');
const sortDescBtn = document.getElementById('sort-desc');
const totalValueDisplay = document.getElementById('total-value-display');

let inventory = [];

// Function to add an item to the inventory
function addItem() {
    const itemName = document.getElementById('item-name').value;
    const quantity = document.getElementById('quantity').value;
    const price = document.getElementById('price').value;
    const category = document.getElementById('category').value;   


    // Basic validation
    if (!itemName || quantity <= 0 || price <= 0) {
        alert('Please enter valid values.');
        return;
    }

    const newItem = {
        name: itemName,
        quantity: parseInt(quantity),
        price: parseFloat(price),
        category: category
    };

    inventory.push(newItem);
    displayInventory();
    calculateTotalValue();
}

// Function to display the inventory
function displayInventory() {
    inventoryContainer.innerHTML = '';
    inventory.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
            <h3>${item.name}</h3>
            <p>Quantity: ${item.quantity}</p>
            <p>Price: $${item.price}</p>
            <p>Category: ${item.category}</p>
            <button onclick="deleteItem('${item.name}')">Delete</button>
        `;
        inventoryContainer.appendChild(itemDiv);
    });
}

// Function to delete an item from the inventory
function deleteItem(itemName) {
    inventory = inventory.filter(item => item.name !== itemName);
    displayInventory();
    calculateTotalValue();
}

// Function to search for items
function searchItems() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredInventory = inventory.filter(item => {
        return item.name.toLowerCase().includes(searchTerm) || item.category.toLowerCase().includes(searchTerm);
    });
    displayInventory(filteredInventory);
}

// Function to sort items by price
function sortItems(ascending) {
    inventory.sort((a, b) => {
        if (ascending) {
            return a.price - b.price;
        } else {
            return b.price - a.price;
        }
    });
    displayInventory();
}

// Function to calculate the total inventory value
function calculateTotalValue() {
    const totalValue = inventory.reduce((acc, item) => acc + item.price * item.quantity, 0);
    totalValueDisplay.textContent = totalValue.toFixed(2);
}

// Event listeners
addItemForm.addEventListener('submit', (event) => {
    event.preventDefault();
    addItem();
});

searchBtn.addEventListener('click', searchItems);
sortAscBtn.addEventListener('click', () => sortItems(true));
sortDescBtn.addEventListener('click', () => sortItems(false));

// Initial display
displayInventory();
calculateTotalValue();// JavaScript Document