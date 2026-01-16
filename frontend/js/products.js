// Load all products
async function loadProducts() {
    try {
        const response = await fetch('/api/products');
        const products = await response.json();

        const productsGrid = document.getElementById('products-grid');
        if (productsGrid) {
            productsGrid.innerHTML = products.map(product => `
                <div class="product-card">
                    <div class="product-image">
                        <img src="${product.images[0] || 'https://via.placeholder.com/280x200/8B4513/FFFFFF?text=Til+Pitha'}" alt="${product.name}">
                    </div>
                    <div class="product-info">
                        <div class="product-name">${product.name}</div>
                        <div class="product-price">₹${product.price}</div>
                        <div style="margin: 0.5rem 0; font-size: 0.9rem; color: #666;">
                            Weight: ${product.weight}g | Shelf Life: ${product.shelfLife}
                        </div>
                        <button class="btn-secondary add-to-cart-btn"
                                data-product-id="${product._id}"
                                data-product-name="${product.name}"
                                data-price="${product.price}">
                            Add to Cart
                        </button>
                    </div>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
});
