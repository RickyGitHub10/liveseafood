// script.js

// ==================
// 1. STATE & CONSTANTS
// ==================
let cartItems = JSON.parse(localStorage.getItem('jAndZCart')) || [];
const PAYPAL_BUSINESS_EMAIL = "ricky.chenwok@gmail.com"; // Your email is set

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
const contactLink = document.getElementById('contact-link');
const hamburgerBtn = document.getElementById('hamburger-btn');
const mainNav = document.getElementById('main-nav');
const accordionHeaders = document.querySelectorAll('.accordion-header'); // ADDED (Line 28)

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
    
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;

        if (totalItems === 0) {
            cartCountElement.style.display = 'none';
        } else {
            cartCountElement.style.display = 'block';
        }
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

    const existingItem = cartItems.find(item => item.name === itemName);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItems.push({ name: itemName, price: itemPrice, quantity: 1 });
    }
    
    console.log("Cart updated:", cartItems);
    
    localStorage.setItem('jAndZCart', JSON.stringify(cartItems));
    
    updateCartIcon();
    
    alert(`${itemName} added to cart!`);
}

/**
 * Shows the modal.
 */
function showModal() {
    if (cartModal) {
        updateCartItemsList(); 
        cartModal.style.display = 'block';
    }
}

/**
 * Hides the modal.
 */
function hideModal() {
    if (cartModal) {
        cartModal.style.display = 'none';
    }
}

/**
 * Updates the text inside the modal's item list.
 */
function updateCartItemsList() {
    if (!cartItemsListElement) return;

    if (cartItems.length === 0) {
        cartItemsListElement.innerHTML = "Your cart is currently empty.";
        return;
    }

    cartItemsListElement.innerHTML = "";
    
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
    
    let paypalURL = `https://www.paypal.com/cgi-bin/webscr?cmd=_cart&upload=1&business=${PAYPAL_BUSINESS_EMAIL}`;

    cartItems.forEach((item, index) => {
        let itemNumber = index + 1;
        paypalURL += `&item_name_${itemNumber}=${encodeURIComponent(item.name)}`;
        paypalURL += `&amount_${itemNumber}=${item.price.toFixed(2)}`;
        paypalURL += `&quantity_${itemNumber}=${item.quantity}`;
    });

    console.log("Redirecting to PayPal:", paypalURL);
    
    window.location.href = paypalURL;
}


/**
 * Handles the contact link click.
 * Copies the email address to the clipboard and provides user feedback.
 */
function handleContactClick(event) {
    event.preventDefault(); 
    
    const email = 'jztrade2024@gmail.com';
    
    navigator.clipboard.writeText(email).then(() => {
        const originalText = contactLink.textContent;
        contactLink.textContent = 'Email Copied!';
        
        setTimeout(() => {
            contactLink.textContent = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy email: ', err);
        alert('Failed to copy. Email is jztrade@gmail.com');
    });
}


// ==================
// 4. EVENT LISTENERS
// ==================
document.addEventListener('DOMContentLoaded', () => {
    
    buyButtons.forEach(button => {
        button.addEventListener('click', handleBuyClick);
    });

    if (cartIconButton) {
        cartIconButton.addEventListener('click', showModal);
    }
    if (closeModalButton) {
        closeModalButton.addEventListener('click', hideModal);
    }
    if (continueShoppingButton) {
        continueShoppingButton.addEventListener('click', hideModal);
    }
    if (checkoutButton) {
        checkoutButton.addEventListener('click', handleCheckout);
    }
    if (contactLink) {
        contactLink.addEventListener('click', handleContactClick);
    }
    
    if (hamburgerBtn && mainNav) {
        hamburgerBtn.addEventListener('click', () => {
            mainNav.classList.toggle('is-open');
        });
    }

    // NEW ACCORDION LISTENER (Lines 207-217)
    if(accordionHeaders) {
        accordionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const content = header.nextElementSibling;
                
                // Toggle the classes
                header.classList.toggle('is-open');
                content.classList.toggle('is-open');
            });
        });
    }

    updateCartIcon();
    
    console.log("J&Z Trade Inc. site initialized.");
});