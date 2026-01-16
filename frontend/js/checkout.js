// Load cart items for checkout
function loadCheckoutSummary() {
    const cart = JSON.parse(localStorage.getItem('pixharvest_cart')) || [];
    const orderSummary = document.getElementById('order-summary');

    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }

    let totalAmount = 0;
    const summaryHTML = `
        <h3 style="color: #8B4513; margin-bottom: 1.5rem;">Order Summary</h3>
        ${cart.map(item => {
            const itemTotal = item.price * item.quantity;
            totalAmount += itemTotal;
            return `
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span>${item.name} × ${item.quantity}</span>
                    <span>₹${itemTotal}</span>
                </div>
            `;
        }).join('')}
        <hr style="margin: 1rem 0; border: none; border-top: 1px solid #ddd;">
        <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 1.1rem;">
            <span>Total Amount:</span>
            <span>₹${totalAmount}</span>
        </div>
    `;

    orderSummary.innerHTML = summaryHTML;
}

// Handle form submission
async function handleCheckout(event) {
    event.preventDefault();

    const cart = JSON.parse(localStorage.getItem('pixharvest_cart')) || [];
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    // Get form data
    const formData = {
        products: cart.map(item => ({
            product: item.id,
            quantity: item.quantity,
            price: item.price
        })),
        customerDetails: {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            pincode: document.getElementById('pincode').value
        },
        paymentMethod: document.querySelector('input[name="paymentMethod"]:checked').value,
        deliveryType: document.querySelector('input[name="deliveryType"]:checked').value
    };

    try {
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
            // Clear cart
            localStorage.removeItem('pixharvest_cart');

            // Redirect to success page with order ID
            window.location.href = `success.html?orderId=${result.orderId}`;
        } else {
            alert('Error placing order: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error placing order. Please try again.');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadCheckoutSummary();

    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckout);
    }
});
