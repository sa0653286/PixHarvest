// Cart functionality
let cart = JSON.parse(localStorage.getItem('pixharvest_cart')) || [];

// Update cart count in navigation
function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartLink = document.querySelector('.cart-link');
    if (cartLink) {
        cartLink.textContent = `Cart (${cartCount})`;
    }
}

// Add to cart functionality
function addToCart(productId, productName, price, quantity = 1) {
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: price,
            quantity: quantity
        });
    }

    localStorage.setItem('pixharvest_cart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`${productName} added to cart!`);
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #8B4513;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Load bestsellers on homepage
async function loadBestsellers() {
    try {
        const response = await fetch('/api/products');
        const products = await response.json();

        const bestsellersGrid = document.getElementById('bestsellers-grid');
        if (bestsellersGrid) {
            bestsellersGrid.innerHTML = products.slice(0, 3).map(product => `
                <div class="product-card">
                    <div class="product-image">
                        <img src="${product.images[0] || 'https://via.placeholder.com/280x200/8B4513/FFFFFF?text=Til+Pitha'}" alt="${product.name}">
                    </div>
                    <div class="product-info">
                        <div class="product-name">${product.name}</div>
                        <div class="product-price">₹${product.price}</div>
                        <a href="product-details.html?id=${product._id}" class="btn-secondary">View Details</a>
                    </div>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading bestsellers:', error);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();

    // Load bestsellers if on homepage
    if (document.getElementById('bestsellers-grid')) {
        loadBestsellers();
    }

    // Add to cart button functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart-btn')) {
            e.preventDefault();
            const productId = e.target.dataset.productId;
            const productName = e.target.dataset.productName;
            const price = parseFloat(e.target.dataset.price);
            addToCart(productId, productName, price);
        }
    });
});

// CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
