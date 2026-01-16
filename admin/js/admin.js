let authToken = localStorage.getItem('admin_token');

// Show login or dashboard based on authentication
function checkAuth() {
    if (authToken) {
        showDashboard();
        loadDashboardData();
    } else {
        showLogin();
    }
}

// Show login form
function showLogin() {
    document.getElementById('login-section').style.display = 'flex';
    document.getElementById('dashboard-section').style.display = 'none';
}

// Show dashboard
function showDashboard() {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('dashboard-section').style.display = 'block';
}

// Handle admin login
async function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            authToken = data.token;
            localStorage.setItem('admin_token', authToken);
            document.getElementById('admin-name').textContent = `Welcome, ${data.admin.username}`;
            showDashboard();
            loadDashboardData();
        } else {
            alert('Login failed: ' + data.message);
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('Login failed. Please try again.');
    }
}

// Load dashboard data
async function loadDashboardData() {
    try {
        const response = await fetch('/api/admin/stats', {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });

        if (response.ok) {
            const stats = await response.json();
            updateStats(stats);
        } else if (response.status === 401) {
            // Token expired, logout
            logout();
        }
    } catch (error) {
        console.error('Error loading dashboard data:', error);
    }

    // Load recent orders
    loadRecentOrders();
}

// Update stats display
function updateStats(stats) {
    document.getElementById('total-orders').textContent = stats.totalOrders;
    document.getElementById('total-revenue').textContent = `₹${stats.totalRevenue}`;
    document.getElementById('pending-orders').textContent = stats.totalOrders; // You might want to filter for pending
    document.getElementById('total-products').textContent = '0'; // This would need a separate API call
}

// Load recent orders
async function loadRecentOrders() {
    try {
        const response = await fetch('/api/orders', {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });

        if (response.ok) {
            const orders = await response.json();
            displayRecentOrders(orders.slice(0, 10)); // Show last 10 orders
        }
    } catch (error) {
        console.error('Error loading orders:', error);
    }
}

// Display recent orders in table
function displayRecentOrders(orders) {
    const tbody = document.getElementById('recent-orders-body');
    tbody.innerHTML = orders.map(order => `
        <tr>
            <td>${order.orderId}</td>
            <td>${order.customerDetails.name}</td>
            <td>₹${order.totalAmount}</td>
            <td><span class="status-badge status-${order.orderStatus}">${order.orderStatus}</span></td>
            <td><span class="status-badge status-${order.paymentStatus}">${order.paymentStatus}</span></td>
            <td>
                <button class="action-btn btn-update" onclick="updateOrderStatus('${order._id}', 'paid')">Mark Paid</button>
                <button class="action-btn btn-update" onclick="updateOrderStatus('${order._id}', 'shipped')">Ship</button>
                <button class="action-btn btn-cancel" onclick="updateOrderStatus('${order._id}', 'cancelled')">Cancel</button>
            </td>
        </tr>
    `).join('');
}

// Update order status
async function updateOrderStatus(orderId, newStatus) {
    try {
        const updateData = {};

        if (newStatus === 'paid') {
            updateData.paymentStatus = 'paid';
            updateData.orderStatus = 'paid';
        } else if (newStatus === 'shipped') {
            updateData.orderStatus = 'shipped';
        } else if (newStatus === 'cancelled') {
            updateData.orderStatus = 'cancelled';
        }

        const response = await fetch(`/api/orders/${orderId}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(updateData)
        });

        if (response.ok) {
            loadRecentOrders(); // Refresh the orders list
            loadDashboardData(); // Refresh stats
        } else {
            alert('Failed to update order status');
        }
    } catch (error) {
        console.error('Error updating order:', error);
        alert('Error updating order status');
    }
}

// Logout function
function logout() {
    authToken = null;
    localStorage.removeItem('admin_token');
    showLogin();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();

    // Login form handler
    const loginForm = document.getElementById('admin-login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Sidebar navigation
    document.querySelectorAll('.sidebar-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');

            if (target === '#logout') {
                logout();
            } else {
                // Handle other navigation items
                document.querySelectorAll('.sidebar-menu a').forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
});
