// script.js

// 1. STATE: Variable to hold the number of items in the cart
let cartItemCount = 0;

// 2. DOM REFERENCES: Get the elements we need to interact with
const cartCountElement = document.getElementById('cart-count');
const buyButtons = document.querySelectorAll('.buy-button');

// 3. FUNCTION: Create a function to update the cart icon's display
function updateCartIcon() {
    // Update the text content of the span
    cartCountElement.textContent = cartItemCount;

    // Optional: Add a class to hide the '0' if you want
    if (cartItemCount === 0) {
        cartCountElement.style.display = 'none';
    } else {
        cartCountElement.style.display = 'block';
    }
}

// 4. FUNCTION: This is the modified click handler
function handleBuyClick(event) {
    // Get the product data from the button
    const button = event.target;
    const price = button.getAttribute('data-price');
    const weight = button.getAttribute('data-weight');
    
    console.log(`Adding ${weight}lb package to cart at $${price}.00`);
    
    // 1. Increment the cart count
    cartItemCount++;
    
    // 2. Update the cart icon
    updateCartIcon();
    
    // We can change this alert to be a simple confirmation
    alert(`Added ${weight}lb Live Lobster to your cart!`);

    // We removed the PayPal redirect. We'll add that to a "Checkout" button later.
}

// 5. INITIALIZATION: Set up the page when it loads
document.addEventListener('DOMContentLoaded', () => {
    
    // Attach the event listener to all "Buy" buttons
    buyButtons.forEach(button => {
        button.addEventListener('click', handleBuyClick);
    });
    
    // Run the update function on load to set the initial state (e.g., hide '0')
    updateCartIcon();
    
    console.log("J&Z Trade Inc. site initialized. Cart is ready.");
});