// 1. Array to hold product data (makes it easy to update prices later)
const products = [
    { weight: 10, price: 169.00 },
    { weight: 20, price: 299.00 }
];

// 2. Function to handle what happens when a buy button is clicked
function handleBuyClick(event) {
    // Get the button element that was clicked
    const button = event.target;
    
    // Get the data stored in the button's data attributes
    const price = button.getAttribute('data-price');
    const weight = button.getAttribute('data-weight');
    
    // Log the selection for testing (you'll replace this with your payment link)
    console.log(`User selected the ${weight}lb package at $${price}.00`);
    
    // *** NEXT STEP: Integrate Payment / Redirect ***
    // For now, let's just alert the user (you can remove this later)
    alert(`Preparing your ${weight}lb Live Lobster order! Total: $${price}.00.`);
    
    // In a real e-commerce scenario, you would redirect to PayPal or a form here.
    // Example: window.location.href = 'https://paypal.com/buy?item=10lb&amount=169';
}

// 3. Find all "Buy" buttons and attach the click function to them
document.addEventListener('DOMContentLoaded', () => {
    // Select all elements with the class 'buy-button'
    const buyButtons = document.querySelectorAll('.buy-button');

    // Loop through each button and add an event listener
    buyButtons.forEach(button => {
        button.addEventListener('click', handleBuyClick);
    });
    
    console.log("Script loaded and event listeners are active.");
});