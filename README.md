# PixHarvest E-Commerce Website

A complete e-commerce platform for PixHarvest, featuring authentic Assamese handmade Til Pitha with modern web technologies.

## 🌟 Features

### Frontend (Customer-Facing)
- **Responsive Design**: Mobile-first approach with clean, earthy aesthetic
- **Product Catalog**: Browse Til Pitha variants with detailed information
- **Shopping Cart**: Add, update, and remove items with local storage
- **Secure Checkout**: Customer details, shipping address, and payment options
- **Order Tracking**: Real-time order status updates
- **WhatsApp Integration**: Direct messaging for order confirmations

### Backend (API & Database)
- **RESTful API**: Built with Node.js and Express.js
- **MongoDB Atlas**: Cloud database for products, orders, and admin data
- **JWT Authentication**: Secure admin access
- **Order Management**: Complete order lifecycle from pending to delivered
- **Inventory Control**: Stock management with automatic deductions
- **Payment Verification**: Manual UPI and COD payment confirmation

### Admin Dashboard
- **Secure Login**: JWT-based authentication
- **Order Management**: View, update, and track all orders
- **Analytics**: Revenue tracking and best-selling products
- **Manual Payment Confirmation**: Mark payments as verified
- **Shipping Management**: Update order status and tracking details

## 🛠️ Tech Stack

### Frontend
- HTML5, CSS3, Vanilla JavaScript
- Mobile-first responsive design
- Local storage for cart persistence

### Backend
- Node.js & Express.js
- MongoDB Atlas
- JWT for authentication
- bcryptjs for password hashing

### Payment & Delivery
- UPI ID: `sa063286@okicici`
- Cash on Delivery
- Manual payment verification
- Delhivery integration (manual workflow)

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm
- MongoDB Atlas account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/pixharvest.git
   cd pixharvest
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the backend directory:
   ```env
   MONGO_URI=mongodb+srv://PixHarvest_Admin:sa063286@okicici@pixharvest-production.nobejny.mongodb.net/pixharvest?retryWrites=true&w=majority
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

4. **Start the backend server**
   ```bash
   npm start
   ```

5. **Open the frontend**
   Open `frontend/index.html` in your browser or use a local server.

6. **Access Admin Dashboard**
   Navigate to `admin/index.html` and login with admin credentials.

## 📁 Project Structure

```
PixHarvest/
│
├── frontend/
│   ├── index.html          # Home page
│   ├── products.html       # Product catalog
│   ├── product-details.html # Individual product page
│   ├── cart.html           # Shopping cart
│   ├── checkout.html       # Checkout process
│   ├── success.html        # Order confirmation
│   ├── about.html          # About PixHarvest
│   ├── contact.html        # Contact information
│   ├── css/
│   │   └── style.css       # Main stylesheet
│   └── js/
│       ├── main.js         # Common functionality
│       ├── products.js     # Product page logic
│       ├── cart.js         # Cart management
│       ├── checkout.js     # Checkout process
│       ├── success.js      # Order success page
│       └── contact.js      # Contact form handling
│
├── backend/
│   ├── server.js           # Express server setup
│   ├── models/
│   │   ├── Product.js      # Product schema
│   │   ├── Order.js        # Order schema
│   │   └── Admin.js        # Admin schema
│   ├── routes/
│   │   ├── products.js     # Product API routes
│   │   ├── orders.js       # Order API routes
│   │   └── admin.js        # Admin API routes
│   ├── middleware/
│   │   └── auth.js         # JWT authentication
│   └── config/
│       └── db.js           # Database configuration
│
├── admin/
│   ├── index.html          # Admin dashboard
│   ├── css/
│   │   └── admin.css       # Admin styles
│   └── js/
│       └── admin.js        # Admin functionality
│
└── README.md
```

## 🔐 Admin Setup

To create an admin user, you can add this to your backend startup or create a separate script:

```javascript
const Admin = require('./models/Admin');

const createAdmin = async () => {
  const admin = new Admin({
    username: 'admin',
    passwordHash: 'your_password' // Will be hashed automatically
  });
  await admin.save();
};
```

## 📊 Database Models

### Product Model
- name, price, weight, shelfLife
- stock, images, isActive
- isCourierSafe, createdAt

### Order Model
- orderId, products, totalAmount
- customerDetails, paymentMethod
- paymentStatus, orderStatus
- deliveryType, trackingDetails
- courierSafeRequired, adminNotes

### Admin Model
- username, passwordHash, role
- lastLogin, timestamps

## 🚚 Delivery Workflow

1. **Local Delivery**: Free delivery within Assam
2. **National Courier**: ₹100 delivery charge via Delhivery
3. **Manual Process**: Admin updates tracking and shipping details
4. **Courier Safety**: Flag for products requiring special packaging

## 💳 Payment Process

1. **UPI Payment**: Customer pays to `sa063286@okicici`
2. **Cash on Delivery**: Pay upon delivery
3. **Manual Verification**: Admin confirms payment receipt
4. **Order Status**: Updates from pending → paid → shipped → delivered

## 🎨 Design Philosophy

- **Earthy Palette**: Kraft brown, forest green, off-white
- **Cultural Authenticity**: Traditional Assamese aesthetics
- **Clean UI**: Minimal animations, uncluttered design
- **Mobile-First**: Responsive across all devices
- **Accessibility**: Semantic HTML and keyboard navigation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with ❤️ for PixHarvest
- Supporting Assamese artisans and culture
- Preserving traditional craftsmanship

## 📞 Support

For support, email hello@pixharvest.com or message us on WhatsApp at +91 98765 43210.
