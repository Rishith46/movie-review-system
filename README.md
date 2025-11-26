# 🎬 Movie Review System - MERN Stack

A full-stack movie review application built with MongoDB, Express.js, React.js, and Node.js. This platform allows users to discover movies, write reviews, and rate films, while admins can manage the movie collection.

![Movie Review System](https://img.shields.io/badge/MERN-Stack-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen)
![React](https://img.shields.io/badge/React-Frontend-blue)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green)

## ✨ Features

### For Users
- 🎥 Browse and discover movies
- ⭐ Rate movies (1-5 stars)
- 💬 Write and submit reviews
- 🔍 Filter movies by genre
- ➕ Add new movies to the collection
- 👤 User authentication with JWT

### For Admins
- ⚡ Admin dashboard
- ➕ Add movies to the database
- 🗑️ Delete movies
- 📊 View statistics
- 🎬 Manage movie collection

## 🛠️ Tech Stack

**Frontend:**
- React.js
- React Router
- Axios
- CSS3 (Custom styling with grey/white theme)

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Bcrypt.js for password hashing

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Git
- npm or yarn

## 🚀 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/movie-review-system.git
cd movie-review-system
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file in the backend folder:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/moviereview
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

**For MongoDB Atlas:**
Replace `MONGO_URI` with your MongoDB Atlas connection string.

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

### 4. Run the Application

**Start Backend (in backend folder):**
```bash
npm run dev
```
Backend will run on `http://localhost:5000`

**Start Frontend (in frontend folder - open new terminal):**
```bash
npm start
```
Frontend will run on `http://localhost:3000`

## 👥 User Roles

### Regular User
- Email: Any email
- Can add movies, rate movies, and write reviews

### Admin User
- Email: `rishithtechdv@gmail.com`
- Password: `ONETHREE46@`
- Can add/delete movies but cannot rate or review

## 📁 Project Structure
```
movie-review-system/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── movieController.js
│   │   └── reviewController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorHandler.js
│   │   └── validation.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Movie.js
│   │   └── Review.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── movieRoutes.js
│   │   └── reviewRoutes.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── MovieCard.js
│   │   │   ├── ReviewForm.js
│   │   │   ├── StarRating.js
│   │   │   └── ProtectedRoute.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── MovieDetail.js
│   │   │   ├── AddMovie.js
│   │   │   └── AdminDashboard.js
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── movieService.js
│   │   │   └── reviewService.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── styles/
│   │   │   └── global.css
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── .gitignore
│
├── .gitignore
└── README.md
```

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:
- Tokens are stored in localStorage
- Protected routes require authentication
- Admin routes require admin role

## 🎨 UI Design

- Minimalistic design with grey, white, and silver color scheme
- Interactive hover effects
- Smooth animations
- Responsive layout
- Modern card-based design

## 📸 Screenshots

### Home Page
Browse and discover movies with genre filters

### Movie Detail Page
View movie information, ratings, and reviews

### Admin Dashboard
Manage movies, view statistics

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (Protected)

### Movies
- `GET /api/movies` - Get all movies
- `GET /api/movies/:id` - Get single movie with reviews
- `POST /api/movies` - Create movie (Admin only)
- `PUT /api/movies/:id` - Update movie (Admin only)
- `DELETE /api/movies/:id` - Delete movie (Admin only)

### Reviews
- `POST /api/reviews` - Create review (User only)
- `PUT /api/reviews/:id` - Update review (Owner only)
- `DELETE /api/reviews/:id` - Delete review (Owner only)

## 🐛 Known Issues

- Image uploads are stored as base64 (for production, use cloud storage like AWS S3)
- No email verification for user registration

## 🚀 Future Enhancements

- [ ] Add search functionality
- [ ] Implement pagination
- [ ] Add movie trailers
- [ ] Social media sharing
- [ ] User profiles
- [ ] Favorite movies list
- [ ] Cloud image storage

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Movie data and posters from [TMDb](https://www.themoviedb.org/)
- Icons and design inspiration from modern UI/UX trends
- Built as a college project to demonstrate MERN stack skills

---

**⭐ If you found this project helpful, please give it a star!**