// script.js

// ==================
// 1. STATE & CONSTANTS
// ==================
let cartItems = []; // Array to store { name, price, quantity } objects
const PAYPAL_BUSINESS_EMAIL = "ricky.chenwok@gmail.com"; // <-- I've updated this for you.

// ==================
// 2. DOM REFERENCES
// ==================
const cartCountElement = document.getElementById('cart-count');
const buyButtons = document.querySelectorAll('.buy-button');
const cartIconButton = document.getElementById('cart-icon-button');
const cartModal = document.getElementById('cart-modal');
const closeModalButton = document.getElementById('close-modal-button');
const continueShoppingButton = document.getElementById('continue-shopping-button');
const checkoutButton = document.getElementById('checkout-button');
const cartItemsListElement = document.getElementById('cart-items-list');
const contactLink = document.getElementById('contact-link'); // <-- ADDED

// ==================
// 3. FUNCTIONS
// ==================

/**
 * Updates the cart icon's counter bubble.
 * Calculates total items from the cartItems array.
 */
function updateCartIcon() {
    let totalItems = 0;
    cartItems.forEach(item => {
        totalItems += item.quantity; // Sum the quantities of all items
    });
    
    cartCountElement.textContent = totalItems;

    if (totalItems === 0) {
        cartCountElement.style.display = 'none';
    } else {
        cartCountElement.style.display = 'block';
    }
}

/**
 * Adds an item to the cart or updates its quantity.
 * Triggered when "Add to Cart" is clicked.
 */
function handleBuyClick(event) {
    const button = event.target;
    const itemName = button.getAttribute('data-name');
    const itemPrice = parseFloat(button.getAttribute('data-price'));

    // Check if item is already in the cart
    const existingItem = cartItems.find(item => item.name === itemName);

    if (existingItem) {
        existingItem.quantity++; // Increment quantity
    } else {
        // Add new item to cart
        cartItems.push({ name: itemName, price: itemPrice, quantity: 1 });
    }
    
    console.log("Cart updated:", cartItems);
    
    // Update the visual icon
    updateCartIcon();
    
    // Give user feedback
    alert(`${itemName} added to cart!`);
}

/**
 * Shows the modal.
 */
function showModal() {
    updateCartItemsList(); // Update the list right before showing
    cartModal.style.display = 'block';
}

/**
 * Hides the modal.
 */
function hideModal() {
    cartModal.style.display = 'none';
}

/**
 * Updates the text inside the modal's item list.
 */
function updateCartItemsList() {
    if (cartItems.length === 0) {
        cartItemsListElement.innerHTML = "Your cart is currently empty.";
        return;
    }

    // Clear the list
    cartItemsListElement.innerHTML = "";
    
    // Add each item as a new paragraph
    cartItems.forEach(item => {
        const itemElement = document.createElement('p');
        itemElement.textContent = `${item.quantity} x ${item.name} - $${(item.price * item.quantity).toFixed(2)}`;
        cartItemsListElement.appendChild(itemElement);
    });
}

/**
 * Builds a PayPal "Cart Upload" URL and redirects the user.
 */
function handleCheckout() {
    if (cartItems.length === 0) {
        alert("Your cart is empty. Please add items before checking out.");
        return;
    }

    if (PAYPAL_BUSINESS_EMAIL === "YOUR_PAYPAL_EMAIL@example.com") {
        alert("Site error: PayPal business email is not configured.");
        return;
    }
    
    // Base URL for PayPal cart upload
    let paypalURL = `https://www.paypal.com/cgi-bin/webscr?cmd=_cart&upload=1&business=${PAYPAL_BUSINESS_EMAIL}`;

    // Add each item in the cart to the URL
    cartItems.forEach((item, index) => {
        let itemNumber = index + 1;
        paypalURL += `&item_name_${itemNumber}=${encodeURIComponent(item.name)}`;
        paypalURL += `&amount_${itemNumber}=${item.price.toFixed(2)}`;
        paypalURL += `&quantity_${itemNumber}=${item.quantity}`;
    });

    console.log("Redirecting to PayPal:", paypalURL);
    
    // Send the user to PayPal
    window.location.href = paypalURL;
}


/**
 * NEW FUNCTION: Handles the contact link click.
 * Copies the email address to the clipboard and provides user feedback.
 */
function handleContactClick(event) {
    event.preventDefault(); // Stop the '#' link from jumping
    
    const email = 'ricky.chenwok@gmail.com';
    
    // Use the modern, secure Clipboard API
    navigator.clipboard.writeText(email).then(() => {
        // Success!
        const originalText = contactLink.textContent;
        contactLink.textContent = 'Email Copied!';
        
        // Revert back after 2 seconds
        setTimeout(() => {
            contactLink.textContent = originalText;
        }, 2000);
    }).catch(err => {
        // Error (e.g., in a very old browser or if permissions are denied)
        console.error('Failed to copy email: ', err);
        // Fallback for old browsers
        alert('Failed to copy. Email is: ricky.chenwok@gmail.com');
    });
}


// ==================
// 4. EVENT LISTENERS
// ==================
document.addEventListener('DOMContentLoaded', () => {
    
    // Attach click event to all "Add to Cart" buttons
    buyButtons.forEach(button => {
        button.addEventListener('click', handleBuyClick);
    });

    // Modal open/close events
    cartIconButton.addEventListener('click', showModal);
    closeModalButton.addEventListener('click', hideModal);
    continueShoppingButton.addEventListener('click', hideModal);
    
    // Checkout event
    checkoutButton.addEventListener('click', handleCheckout);

    // ADDED: Contact link click event
    contactLink.addEventListener('click', handleContactClick);

    // Update cart on initial load (to hide '0')
    updateCartIcon();
    
    console.log("J&Z Trade Inc. site initialized.");
});