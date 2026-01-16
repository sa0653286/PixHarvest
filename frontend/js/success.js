// Load order details on success page
async function loadOrderDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('orderId');

    if (!orderId) {
        document.getElementById('order-details').innerHTML = '<p>Order ID not found.</p>';
        return;
    }

    try {
        const response = await fetch(`/api/orders/${orderId}`);
        const order = await response.json();

        if (response.ok) {
            const orderDetailsHTML = `
                <h4 style="color: #8B4513; margin-bottom: 1rem;">Order #${order.orderId}</h4>
                <div style="margin-bottom: 1rem;">
                    <strong>Customer:</strong> ${order.customerDetails.name}<br>
                    <strong>Email:</strong> ${order.customerDetails.email}<br>
                    <strong>Phone:</strong> ${order.customerDetails.phone}<br>
                    <strong>Delivery:</strong> ${order.deliveryType === 'local' ? 'Local Delivery' : 'National Courier'}<br>
                    <strong>Payment:</strong> ${order.paymentMethod === 'UPI' ? 'UPI Payment' : 'Cash on Delivery'}<br>
                    <strong>Status:</strong> ${order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}<br>
                    <strong>Total Amount:</strong> ₹${order.totalAmount}
                </div>
                <div>
                    <strong>Products:</strong>
                    <ul style="margin-top: 0.5rem;">
                        ${order.products.map(item => `
                            <li>${item.product.name} × ${item.quantity} - ₹${item.price * item.quantity}</li>
                        `).join('')}
                    </ul>
                </div>
            `;

            document.getElementById('order-details').innerHTML = orderDetailsHTML;

            // Set up WhatsApp link
            const whatsappMessage = encodeURIComponent(
                `Hi PixHarvest! My order #${order.orderId} has been placed successfully. Total: ₹${order.totalAmount}. Please confirm.`
            );
            const whatsappLink = document.getElementById('whatsapp-link');
            whatsappLink.href = `https://wa.me/919876543210?text=${whatsappMessage}`; // Replace with actual WhatsApp number
        } else {
            document.getElementById('order-details').innerHTML = '<p>Error loading order details.</p>';
        }
    } catch (error) {
        console.error('Error loading order details:', error);
        document.getElementById('order-details').innerHTML = '<p>Error loading order details.</p>';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadOrderDetails();
});
