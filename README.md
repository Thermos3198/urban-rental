# UrbanRental Backend API

A RESTful API built with Node.js, Express, and MySQL for a car rental management system. This backend provides authentication, user management, vehicle listings, reservations, and administrative controls.

## Features

- **User Management**: Registration, login, profile management (view, edit, delete)
- **Vehicle Browsing**: View available cars with images
- **Reservations**: Create, view, update, and delete car reservations
- **Admin Panel**: User management, vehicle CRUD operations, category management, reservation oversight
- **Authentication**: JWT-based authentication with cookies
- **File Uploads**: Profile picture and vehicle image uploads

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime environment |
| Express.js | Web framework |
| MySQL2 | Database connector |
| bcrypt | Password hashing |
| jsonwebtoken | JWT authentication |
| cookie-parser | Cookie parsing |
| cors | Cross-origin resource sharing |
| multer | File uploads |

## Project Structure

```
urban-rental/
├── config/          # Configuration files (dotenv)
├── controllers/     # Business logic and route handlers
├── middleware/      # Auth, admin, upload middlewares
├── models/          # Database model functions
├── routes/          # API route definitions
├── db/              # Database connection setup
├── public/          # Static files (uploaded images)
├── app.js           # Express app configuration
└── server.js        # Server entry point
```

## Installation & Setup

1. **Clone the repository**
   ```bash
   cd urban-rental
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```
   HOST=localhost
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=urban_rental
   DB_TIMEZONE=Europe/Budapest
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=24h
   COOKIE_NAME=session_cookie
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   
   The server will start at `http://localhost:5000` (or your configured port).

## API Endpoints

### Public Routes (`/global`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/global/cars` | View all cars (no auth required) |
| POST | `/global/filter` | Filter cars by criteria |

### User Routes (`/users`) - Auth Required
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/users/register` | Register a new user |
| POST | `/users/login` | User login |
| GET | `/users/whoami` | Get current user info |
| POST | `/users/logout` | Logout user |
| GET | `/users/userprofile` | View profile |
| POST | `/users/newuserprofile/:user_id` | Update profile picture |
| PUT | `/users/edituserprofile/:user_id` | Edit profile |
| DELETE | `/users/deleteuser/:user_id` | Delete account |
| GET | `/users/cars` | View all cars |
| GET | `/users/reservation` | View user reservations |
| POST | `/users/newreservation` | Create reservation |
| PUT | `/users/updatereservation` | Update reservation |
| DELETE | `/users/deletereservation` | Delete reservation |
| POST | `/users/filter` | Filter cars |

### Admin Routes (`/admin`) - Auth + Admin Required
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/admin/login` | Admin login |
| GET | `/admin/whoami` | Get admin info |
| POST | `/admin/logout` | Admin logout |
| POST | `/admin/carwithimgupload` | Add new car with image |
| DELETE | `/admin/deletecarimg/:vehicle_id` | Delete vehicle image |
| GET | `/admin/adminshowallcars` | View all cars with images |
| DELETE | `/admin/deletewholecar/:vehicle_id` | Delete car completely |
| PUT | `/admin/editvehicle/:vehicle_id` | Edit vehicle details |
| GET | `/admin/allcategory` | View all categories |
| POST | `/admin/newcategory` | Add new category |
| PUT | `/admin/updatecategory/:category_id` | Update category |
| DELETE | `/admin/deletecategory/:category_id` | Delete category |
| GET | `/admin/alluser` | View all users |
| PUT | `/admin/editoneuser/:user_id` | Edit user (admin) |
| DELETE | `/admin/deleteoneuser/:user_id` | Ban/delete user |
| GET | `/admin/reservation` | View all reservations |
| PUT | `/admin/updatereservation/:reservation_id` | Update reservation |
| DELETE | `/admin/deletereservation/:reservation_id` | Delete reservation |
| GET | `/admin/allrentals` | View all rentals |
| GET | `/admin/rentals/:user_id` | View user rentals |
| POST | `/admin/newrental` | Create rental |
| PUT | `/admin/updaterental/:user_id` | Update rental |
| DELETE | `/admin/deleterental` | Delete rental |
| POST | `/admin/filter` | Filter cars |

## Database Schema

The backend uses MySQL with tables for:
- `users` - User accounts and authentication
- `users_img` - User profile images
- `vehicles` - Car listings
- `vehicles_img` - Vehicle images
- `categories` - Car categories
- `reservations` - Car reservations
- `rentals` - Rental records

## Security Features

- Password hashing with bcrypt
- JWT authentication
- Cookie-based session management
- CORS configuration for frontend origin
- Admin middleware protection