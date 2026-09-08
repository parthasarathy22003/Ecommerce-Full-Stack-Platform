
# 🛍️ Full-Stack E-Commerce Application

A complete **E-Commerce Web Application** built with the **MERN** stack (MySQL instead of MongoDB) featuring user authentication, product management, shopping cart, order placement, and admin dashboard. This project demonstrates a robust full‑stack implementation with a RESTful API and a modern React frontend.

---

## 📸 Screenshots

*(Add your screenshots here)*

---

## 🚀 Features

### 👤 User Features
- **Authentication**: Sign up, login, and logout with JWT‑based authentication.
- **Product Browsing**: Search, filter by category, and view product details.
- **Shopping Cart**: Add/remove items, update quantities, and view cart summary.
- **Checkout**: Select or add a delivery address, place orders (COD).
- **Order Management**: View order confirmation with order ID.

### 🛠️ Admin Features
- **Product Management**: Add, edit, delete products (title, price, description, category, image, stock).
- **Inventory Control**: Update stock levels and product information.

---

## 🧰 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **ORM**: Sequelize (MySQL)
- **Authentication**: JSON Web Tokens (JWT), bcryptjs
- **Database**: MySQL (or any SQL dialect supported by Sequelize)
- **Other**: dotenv, cors

### Frontend
- **Library**: React (with Hooks)
- **Routing**: React Router v7 (createBrowserRouter)
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS (with custom gradients and responsive design)

---

## 📁 Project Structure

```
.
├── backend/
│   ├── config/
│   │   └── db.js                 # Sequelize connection & model initialisation
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   ├── OrderItem.js
│   │   ├── Address.js
│   │   ├── Cart.js
│   │   └── CartItem.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   └── addressController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── orderRoutes.js
│   │   └── addressRoutes.js
│   ├── .env.example               # Environment variables template
│   ├── server.js                  # Main entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── CheckoutAddress.jsx
│   │   │   ├── OrderSuccess.jsx
│   │   │   └── ProductDetails.jsx
│   │   ├── Admin/
│   │   │   ├── ProductList.jsx
│   │   │   ├── AddProduct.jsx
│   │   │   └── EditProduct.jsx
│   │   ├── api/
│   │   │   └── api.js            # Axios instance
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example               # Frontend env variables (if any)
│   ├── package.json
│   └── vite.config.js            # (if using Vite)
├── .gitignore
└── README.md
```

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v16+)
- MySQL (or any SQL database supported by Sequelize)
- npm or yarn

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/ecommerce-app.git
cd ecommerce-app
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory based on `.env.example`:

```env
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=localhost
DB_PORT=3306
DIALECT=mysql         # or 'postgres', 'sqlite', etc.
JWT_SECRET=your_jwt_secret_key
PORT=5001
```

Then start the backend server:

```bash
npm start


The server will run at `http://localhost:5001` and automatically sync the database tables (with `{ alter: true }` – use cautiously in production).

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd ../frontend
npm install
```

Create a `.env` file (optional) if you need to change the API base URL. By default, the frontend expects the backend at `http://localhost:5001/api`.

Start the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173` (or the port shown in your terminal).

---

## 🔌 API Endpoints

All endpoints are prefixed with `/api`.

### Auth
| Method | Endpoint       | Description           |
|--------|---------------|-----------------------|
| POST   | `/auth/signup`| Register a new user   |
| POST   | `/auth/login` | Login and get JWT     |

### Products
| Method | Endpoint               | Description                     |
|--------|------------------------|---------------------------------|
| GET    | `/products`            | Get all products (with search & category filters) |
| POST   | `/products/add`        | Add a new product (Admin)       |
| PUT    | `/products/update/:id` | Update product details (Admin)  |
| DELETE | `/products/delete/:id` | Delete a product (Admin)        |

### Cart
| Method | Endpoint         | Description                        |
|--------|------------------|------------------------------------|
| GET    | `/cart/:userId`  | Get the user's cart with items     |
| POST   | `/cart/add`      | Add a product to cart              |
| POST   | `/cart/remove`   | Remove a product from cart         |
| POST   | `/cart/update`   | Update quantity of an item         |

### Address
| Method | Endpoint           | Description              |
|--------|--------------------|--------------------------|
| POST   | `/address/add`     | Save a new address       |
| GET    | `/address/:userId` | Get all addresses of user|

### Order
| Method | Endpoint      | Description                  |
|--------|---------------|------------------------------|
| POST   | `/order/place`| Place a new order (COD only) |

---

## 🗃️ Database Schema

The application uses **Sequelize** to define the following models:

- **User**: `id`, `name`, `email`, `password`
- **Product**: `id`, `title`, `description`, `price`, `category`, `image`, `stock`
- **Order**: `id`, `userId`, `totalAmount`, `paymentMethod`, `status`, `address`
- **OrderItem**: `id`, `orderId`, `productId`, `quantity`, `price`
- **Cart**: `id`, `userId` (unique)
- **CartItem**: `id`, `cartId`, `productId`, `quantity`
- **Address**: `id`, `userId`, `fullName`, `phone`, `addressLine`, `city`, `state`, `pincode`

Relationships are properly defined (one‑to‑many, belongs‑to).

---

## 📦 Dependencies

### Backend
- `express`
- `sequelize`
- `mysql2` (or your chosen dialect)
- `dotenv`
- `cors`
- `jsonwebtoken`
- `bcryptjs`
- `nodemon` (dev)

### Frontend
- `react`
- `react-dom`
- `react-router-dom`
- `axios`
- `tailwindcss` (with postcss)

---

## 🧪 Running Tests

*(No tests are included in this project yet; feel free to add and contribute.)*

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the **MIT License**.

---

## ✨ Acknowledgements

- [Sequelize](https://sequelize.org/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Express](https://expressjs.com/)
- [JSON Web Tokens](https://jwt.io/)

---

**Happy Coding!** 🚀
```
