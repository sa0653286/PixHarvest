// Load cart items
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('pixharvest_cart')) || [];
    const cartContainer = document.getElementById('cart-container');
    const emptyCart = document.getElementById('empty-cart');

    if (cart.length === 0) {
        cartContainer.style.display = 'none';
        emptyCart.style.display = 'block';
        return;
    }

    cartContainer.style.display = 'block';
    emptyCart.style.display = 'none';

    let totalAmount = 0;
    const cartHTML = `
        <div style="display: grid; gap: 1rem;">
            ${cart.map((item, index) => {
                const itemTotal = item.price * item.quantity;
                totalAmount += itemTotal;
                return `
                    <div style="display: flex; align-items: center; background: white; padding: 1rem; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                        <div style="flex: 1;">
                            <h4 style="margin: 0 0 0.5rem 0; color: #333;">${item.name}</h4>
                            <p style="margin: 0; color: #666;">₹${item.price} × ${item.quantity} = ₹${itemTotal}</p>
                        </div>
                        <div style="display: flex; align-items: center; gap: 1rem;">
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <button onclick="updateQuantity(${index}, ${item.quantity - 1})" style="padding: 0.5rem; border: 1px solid #ddd; background: #f9f9f9; border-radius: 5px; cursor: pointer;">-</button>
                                <span style="min-width: 30px; text-align: center;">${item.quantity}</span>
                                <button onclick="updateQuantity(${index}, ${item.quantity + 1})" style="padding: 0.5rem; border: 1px solid #ddd; background: #f9f9f9; border-radius: 5px; cursor: pointer;">+</button>
                            </div>
                            <button onclick="removeItem(${index})" style="padding: 0.5rem 1rem; background: #dc3545; color: white; border: none; border-radius: 5px; cursor: pointer;">Remove</button>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
        <div style="background: white; padding: 2rem; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-top: 2rem;">
            <h3 style="color: #8B4513; margin-bottom: 1rem;">Order Summary</h3>
            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                <span>Total Items:</span>
                <span>${cart.reduce((total, item) => total + item.quantity, 0)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 1.2rem; font-weight: bold; margin-bottom: 2rem;">
                <span>Total Amount:</span>
                <span>₹${totalAmount}</span>
            </div>
            <a href="checkout.html" class="btn-primary" style="width: 100%; text-align: center; display: inline-block; box-sizing: border-box;">Proceed to Checkout</a>
        </div>
    `;

    cartContainer.innerHTML = cartHTML;
}

// Update item quantity
function updateQuantity(index, newQuantity) {
    const cart = JSON.parse(localStorage.getItem('pixharvest_cart')) || [];

    if (newQuantity <= 0) {
        removeItem(index);
        return;
    }

    cart[index].quantity = newQuantity;
    localStorage.setItem('pixharvest_cart', JSON.stringify(cart));
    loadCart();
    updateCartCount();
}

// Remove item from cart
function removeItem(index) {
    const cart = JSON.parse(localStorage.getItem('pixharvest_cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('pixharvest_cart', JSON.stringify(cart));
    loadCart();
    updateCartCount();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
});
