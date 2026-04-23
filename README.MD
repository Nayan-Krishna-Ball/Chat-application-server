# ⚙️ Quick Chat App — Backend Server

This is the backend service for the **Quick Chat App**, built with **Node.js**, **Express.js**, **MongoDB**, and **Socket.IO**. It provides REST APIs and real-time communication for messaging, authentication, and user management.

## 🚀 Features

- 🔐 JWT-based Authentication (Signup/Login)
- 👤 User management & profile handling
- 💬 One-to-one real-time chat with Socket.IO
- 📨 Message storage & retrieval
- ☁️ Image upload support via Cloudinary
- 🛡️ Protected routes with middleware
- ⚡ Scalable and modular structure

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- Socket.IO
- Cloudinary (for media uploads)
- JSON Web Token (JWT)

## 📁 Folder Structure

```
Server/
├─ config/
│  └─ dbConfig.js          # MongoDB connection setup
│
├─ controllers/            # Request handling logic
│  ├─ authController.js
│  ├─ chatController.js
│  ├─ messageController.js
│  └─ userController.js
│
├─ middlewares/            # Custom middleware
│  └─ authMiddleware.js    # JWT verification
│
├─ models/                 # Mongoose schemas
│  ├─ chat.js
│  ├─ message.js
│  └─ user.js
│
├─ app.js                  # Express app configuration
├─ server.js               # Server entry point (HTTP + Socket.IO)
├─ cloudinary.js           # Cloudinary configuration
│
├─ .env                    # Environment variables
├─ .env.example            # Sample environment file
├─ .gitignore
├─ package.json
├─ package-lock.json
└─ README.MD
```

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env id="env-config"
PORT=create a port
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

# Cloudinary Config
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret


```

## ⚙️ Installation & Setup

### Clone Repository

```
git clone https://github.com/Nayan-Krishna-Ball/Chat-application-server.git
```

### Install dependencies

```bash id="install-deps"
npm install
```

## ▶️ Run the Server

### Development mode

```bash id="run-dev"
npm run dev
```

### Production mode

```bash id="run-prod"
npm start
```

---

## 🔌 API Overview

### 🔐 Authentication

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| POST   | /api/auth/signup | Register new user |
| POST   | /api/auth/login  | Login user        |

---

### 👤 Users

| Method | Endpoint       | Description         |
| ------ | -------------- | ------------------- |
| GET    | /api/users     | Get all users       |
| GET    | /api/users/:id | Get user by ID      |
| PUT    | /api/users/:id | Update user profile |

---

### 💬 Chats

| Method | Endpoint  | Description           |
| ------ | --------- | --------------------- |
| POST   | /api/chat | Create or access chat |
| GET    | /api/chat | Get user chats        |

---

### 📨 Messages

| Method | Endpoint              | Description       |
| ------ | --------------------- | ----------------- |
| POST   | /api/messages         | Send a message    |
| GET    | /api/messages/:chatId | Get chat messages |

---

## 🔄 Real-Time Communication (Socket.IO)

### 📡 Connection Events

- `connection` → User connects
- `disconnect` → User disconnects

---

### 💬 Chat Events

- `join_chat` → Join a chat room
- `send_message` → Emit message
- `receive_message` → Receive message

## ☁️ File Uploads

- Uses **Cloudinary** for storing images
- Configured in `cloudinary.js`
- Can be used for:
  - Profile pictures
  - Chat media (images)

---

## 🔐 Authentication & Security

- JWT stored on client side
- Protected routes via `authMiddleware`
- Token required in headers:

```bash id="auth-header"
Authorization: Bearer <token>
```

## 🧠 Application Flow

1. User authenticates → receives JWT
2. Client connects to Socket.IO server
3. User joins chat rooms
4. Messages are:
   - Saved in database
   - Emitted in real-time

## 📌 Future Improvements

- ✅ Group chat support
- ✅ Message reactions
- ✅ Online/offline status
- ✅ Push notifications
- ✅ End-to-end encryption

---

## 🧪 Testing

Recommended tools:

- Postman
- Thunder Client

## 🤝 Contributing

1. Fork the repository
2. Create a new branch (`feature/your-feature`)
3. Commit your changes
4. Push and create a Pull Request
