<?php
// Initialize the inventory array
$inventory = [];

// Function to add an item to the inventory
function add_item($item_name, $quantity, $price, $category) {
    global $inventory;

    // Basic validation
    if (empty($item_name) || $quantity <= 0 || $price <= 0) {
        return false;
    }

    $inventory[] = [
        'name' => $item_name,
        'quantity' => $quantity,
        'price' => $price,
        'category' => $category
    ];

    return true;
}

// Function to get the inventory
function get_inventory() {
    global $inventory;
    return $inventory;
}

// Function to delete an item from the inventory
function delete_item($item_name) {
    global $inventory;

    for ($i = 0; $i < count($inventory); $i++) {
        if ($inventory[$i]['name'] === $item_name) {
            array_splice($inventory, $i, 1);
            return true;
        }
    }

    return false;
}

// Function to search for items
function search_items($search_term) {
    global $inventory;

    $filtered_inventory = [];
    foreach ($inventory as $item) {
        if (stripos($item['name'], $search_term) !== false || stripos($item['category'], $search_term) !== false) {
            $filtered_inventory[] = $item;
        }
    }

    return $filtered_inventory;
}

// Function to sort items by price
function sort_items($ascending) {
    global $inventory;

    usort($inventory, function ($a, $b) use ($ascending) {
        if ($ascending) {
            return $a['price'] - $b['price'];
        } else {
            return $b['price'] - $a['price'];
        }
    });
}

// Function to calculate the total inventory value
function calculate_total_value() {
    global $inventory;

    $total_value = 0;
    foreach ($inventory as $item) {
        $total_value += $item['price'] * $item['quantity'];
    }

    return $total_value;
}