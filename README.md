# Urban Rental - Backend API

A car rental management system backend built with Node.js, Express, and MySQL. This API provides comprehensive functionality for managing vehicles, users, reservations, rentals, and administrative operations.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Installation](#installation)
- [Configuration](#configuration)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Authentication](#authentication)
- [Middleware](#middleware)

## Features

### User Management
- User registration with email validation and password hashing (bcrypt)
- Secure login/logout with JWT tokens and HTTP-only cookies
- Profile management (view, edit, delete account)
- Profile picture upload and management
- View all available cars with images

### Vehicle Management
- Browse all vehicles with their images
- Admin can add new vehicles with multiple images
- Edit vehicle details (category, brand, model, color, transmission, license plate, year, price)
- Delete vehicles from the database
- Vehicle image upload and management
- Category-based vehicle classification

### Reservation System
- Book vehicles for specific date ranges
- Real-time availability checking to prevent double bookings
- View user's own reservations
- Update or cancel existing reservations
- Admin can view, edit, and delete all reservations

### Rental Management
- Create new rentals from reservations
- Track rental status (active, completed)
- Record actual return dates and damage notes
- View all rentals and user-specific rentals
- Update and delete rental records

### Filtering & Search
- Filter vehicles by brand, color, transmission type, year
- Sort by price (ascending/descending)
- Price range filtering (min/max)

### Admin Functions
- Admin dashboard with full system access
- User management (view all users, edit user details, ban users)
- Vehicle and category management
- Reservation oversight
- Rental management

## Technologies

| Technology | Version | Description |
|------------|---------|-------------|
| Node.js | Latest LTS | JavaScript runtime for server-side execution |
| Express.js | 5.2.1 | Web framework for building RESTful APIs |
| MySQL2 | 3.17.2 | MySQL database driver with Promise support |
| bcrypt | 6.0.0 | Password hashing and verification |
| jsonwebtoken | 9.0.3 | JWT token generation and verification |
| cookie-parser | 1.4.7 | Cookie parsing middleware |
| cors | 2.8.6 | Cross-Origin Resource Sharing middleware |
| dotenv | 17.3.1 | Environment variable management |
| multer | 2.0.2 | File upload handling (images) |

## Project Structure

```
urban-rental/
├── config/                 # Configuration files
│   └── dotenvConfig.js     # Environment variable configuration
├── controllers/            # Business logic layer
│   ├── adminController.js          # Admin authentication and vehicle management
│   ├── AdminReservationCont.js    # Admin reservation management
│   ├── categoryController.js      # Vehicle category operations
│   ├── FilterController.js        # Vehicle filtering functionality
│   ├── RentalController.js        # Rental management operations
│   ├── userController.js          # User authentication and profile management
│   └── UserreservationCont.js     # User reservation operations
├── db/
│   └── db.js               # MySQL database connection pool
├── middleware/             # Custom middleware
│   ├── adminMiddleware.js         # Admin authorization check
│   ├── uploadMiddleware.js        # Vehicle image upload configuration
│   ├── userMiddleware.js          # User authentication middleware
│   └── userpicuploadMiddleware.js # Profile picture upload middleware
├── models/                 # Database models (DAO layer)
│   ├── adminModel.js         # Admin database operations
│   ├── AdminreserveModel.js  # Admin reservation model
│   ├── cardataModel.js       # Vehicle data model
│   ├── carImgModel.js        # Vehicle image model
│   ├── categoryModel.js      # Category model
│   ├── filterModels.js       # Filtering functionality
│   ├── rentalModel.js        # Rental model
│   ├── reserveModel.js       # Reservation model
│   └── userModel.js          # User data model
├── routes/                 # API route definitions
│   ├── adminRoutes.js     # Admin endpoint routes
│   ├── notLoggedinRoutes.js # Public routes (no auth required)
│   └── userRoutes.js      # User endpoint routes
├── public/                 # Static files
│   ├── carimgs/           # Vehicle images storage
│   │   └── temp/          # Temporary upload directory
│   └── userpics/          # User profile pictures storage
├── app.js                  # Express application setup
├── server.js               # Server startup script
└── README.md               # This documentation file
```

## Database Schema

### Tables

#### `users`
Stores user and admin accounts.

| Column | Type | Description |
|--------|------|-------------|
| user_id | INT (PK, Auto) | Unique user identifier |
| username | VARCHAR(255) | User's display name |
| email | VARCHAR(255) | User's email address (unique) |
| password | VARCHAR(255) | Bcrypt-hashed password |
| role | ENUM('user', 'admin') | User role |
| created_at | TIMESTAMP | Account creation timestamp |

#### `users_img`
Stores user profile picture paths.

| Column | Type | Description |
|--------|------|-------------|
| img_id | INT (PK, Auto) | Image identifier |
| user_id | INT (FK) | Reference to users table |
| user_img | VARCHAR(500) | Path to the image file |

#### `vehicle_category`
Stores vehicle categories (e.g., Sedan, SUV, Luxury).

| Column | Type | Description |
|--------|------|-------------|
| category_id | INT (PK, Auto) | Category identifier |
| name | VARCHAR(255) | Category name |

#### `vehicles`
Stores car information.

| Column | Type | Description |
|--------|------|-------------|
| vehicle_id | INT (PK, Auto) | Vehicle identifier |
| category_id | INT (FK) | Reference to vehicle_category |
| brand | VARCHAR(255) | Car manufacturer |
| model | VARCHAR(255) | Car model |
| color | VARCHAR(100) | Car color |
| transmission | ENUM('automatic', 'manual') | Transmission type |
| license_plate | VARCHAR(20) | Vehicle license plate number |
| year | INT | Manufacturing year |
| price_per_day | DECIMAL(10,2) | Rental price per day |

#### `vehicles_img`
Stores vehicle image paths.

| Column | Type | Description |
|--------|------|-------------|
| img_id | INT (PK, Auto) | Image identifier |
| vehicle_id | INT (FK) | Reference to vehicles table |
| img | VARCHAR(500) | Path to the image file |

#### `reservations`
Stores vehicle booking requests.

| Column | Type | Description |
|--------|------|-------------|
| reservation_id | INT (PK, Auto) | Reservation identifier |
| user_id | INT (FK) | Reference to users table |
| vehicle_id | INT (FK) | Reference to vehicles table |
| pickup_date | DATE | Planned pickup date |
| return_date | DATE | Planned return date |
| status | ENUM('lefoglalva', 'active_rental', 'cancelled', 'completed') | Reservation status |
| created_at | TIMESTAMP | Reservation creation timestamp |

#### `rentals`
Stores actual rental records.

| Column | Type | Description |
|--------|------|-------------|
| rental_id | INT (PK, Auto) | Rental identifier |
| reservation_id | INT (FK) | Reference to reservations table |
| vehicle_id | INT (FK) | Reference to vehicles table |
| user_id | INT (FK) | Reference to users table |
| start_time | DATETIME | Actual rental start time |
| expected_return | DATETIME | Expected return time |
| actual_return | DATETIME | Actual return time |
| status | ENUM('active', 'completed') | Rental status |
| damage_notes | TEXT | Notes about vehicle condition |

## API Endpoints

### Global (Public) Routes
**Base URL:** `/global`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/cars` | Get all vehicles with images | No |
| POST | `/filter` | Filter vehicles by criteria | No |

---

### User Routes
**Base URL:** `/users`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register a new user | No |
| POST | `/login` | Login as a user | No |
| GET | `/whoami` | Get current user info | Yes |
| POST | `/logout` | Logout the current user | Yes |
| GET | `/userprofile` | Get user profile with picture | Yes |
| POST | `/newuserprofile/:user_id` | Upload profile picture | Yes |
| PUT | `/edituserprofile/:user_id` | Update user profile info | Yes |
| DELETE | `/deleteuserpic/:user_id` | Delete profile picture | Yes |
| DELETE | `/deleteuser/:user_id` | Delete user account | Yes |
| GET | `/cars` | Get all cars (authenticated) | Yes |
| GET | `/reservation` | Get user's reservations | Yes |
| POST | `/newreservation` | Create a new reservation | Yes |
| PUT | `/updatereservation` | Update an existing reservation | Yes |
| DELETE | `/deletereservation/:reservation_id` | Cancel a reservation | Yes |
| POST | `/filter` | Filter vehicles (authenticated) | Yes |

---

### Admin Routes
**Base URL:** `/admin`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/login` | Login as an admin | No |
| GET | `/whoami` | Get current admin info | Yes (Admin) |
| POST | `/logout` | Logout the current admin | Yes (Admin) |
| POST | `/carwithimgupload` | Upload vehicle with images | Yes (Admin) |
| DELETE | `/deletecarimg/:vehicle_id` | Delete vehicle image | Yes (Admin) |
| GET | `/adminshowallcars` | Get all vehicles with images | Yes (Admin) |
| DELETE | `/deletewholecar/:vehicle_id` | Delete a vehicle completely | Yes (Admin) |
| PUT | `/editvehicle/:vehicle_id` | Update vehicle details | Yes (Admin) |
| GET | `/allcategory` | Get all vehicle categories | Yes (Admin) |
| POST | `/newcategory` | Add new vehicle category | Yes (Admin) |
| PUT | `/updatecategory/:category_id` | Edit a category | Yes (Admin) |
| DELETE | `/deletecategory/:category_id` | Delete a category | Yes (Admin) |
| GET | `/alluser` | Get all users | Yes (Admin) |
| PUT | `/editoneuser/:user_id` | Edit user details | Yes (Admin) |
| DELETE | `/deleteoneuser/:user_id` | Ban/delete a user | Yes (Admin) |
| GET | `/reservation` | Get all reservations | Yes (Admin) |
| PUT | `/updatereservation/:reservation_id` | Update any reservation | Yes (Admin) |
| DELETE | `/deletereservation/:reservation_id` | Delete any reservation | Yes (Admin) |
| GET | `/allrentals` | Get all rentals | Yes (Admin) |
| GET | `/rentals/:user_id` | Get rentals for a specific user | Yes (Admin) |
| POST | `/newrental` | Create a new rental record | Yes (Admin) |
| PUT | `/updaterental/:user_id` | Update a rental record | Yes (Admin) |
| DELETE | `/deleterental` | Delete a rental record | Yes (Admin) |
| POST | `/filter` | Filter vehicles (admin) | Yes (Admin) |

---

## Installation

### Prerequisites
- Node.js (v16 or higher recommended)
- MySQL Server (v5.7 or higher)
- npm or yarn package manager

### Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd urban-rental
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up the database**
Create a MySQL database and import the schema:
```sql
CREATE DATABASE urban_rental;

USE urban_rental;

-- Create users table
CREATE TABLE `users` (
  `user_id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) UNIQUE NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('user', 'admin') DEFAULT 'user',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create users_img table
CREATE TABLE `users_img` (
  `img_id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `user_img` VARCHAR(500) NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE
);

-- Create vehicle_category table
CREATE TABLE `vehicle_category` (
  `category_id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL
);

-- Create vehicles table
CREATE TABLE `vehicles` (
  `vehicle_id` INT AUTO_INCREMENT PRIMARY KEY,
  `category_id` INT NOT NULL,
  `brand` VARCHAR(255) NOT NULL,
  `model` VARCHAR(255) NOT NULL,
  `color` VARCHAR(100),
  `transmission` ENUM('automatic', 'manual') NOT NULL,
  `license_plate` VARCHAR(20) UNIQUE NOT NULL,
  `year` INT NOT NULL,
  `price_per_day` DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (`category_id`) REFERENCES `vehicle_category`(`category_id`)
);

-- Create vehicles_img table
CREATE TABLE `vehicles_img` (
  `img_id` INT AUTO_INCREMENT PRIMARY KEY,
  `vehicle_id` INT NOT NULL,
  `img` VARCHAR(500) NOT NULL,
  FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles`(`vehicle_id`) ON DELETE CASCADE
);

-- Create reservations table
CREATE TABLE `reservations` (
  `reservation_id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `vehicle_id` INT NOT NULL,
  `pickup_date` DATE NOT NULL,
  `return_date` DATE NOT NULL,
  `status` ENUM('lefoglalva', 'active_rental', 'cancelled', 'completed') DEFAULT 'lefoglalva',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE,
  FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles`(`vehicle_id`)
);

-- Create rentals table
CREATE TABLE `rentals` (
  `rental_id` INT AUTO_INCREMENT PRIMARY KEY,
  `reservation_id` INT NOT NULL,
  `vehicle_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `start_time` DATETIME,
  `expected_return` DATETIME,
  `actual_return` DATETIME,
  `status` ENUM('active', 'completed') DEFAULT 'active',
  `damage_notes` TEXT,
  FOREIGN KEY (`reservation_id`) REFERENCES `reservations`(`reservation_id`),
  FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles`(`vehicle_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`)
);
```

4. **Configure environment variables**
Create a `.env` file in the root directory (see [Configuration](#configuration) section)

5. **Run the application**
```bash
npm run dev
```
The server will start on `http://localhost:<PORT>` (default port 3000).

---

## Configuration

### Directory Structure Setup

The application requires specific directories for image uploads:

```bash
mkdir -p public/carimgs/temp
mkdir -p public/userpics
```

On Windows:
```cmd
mkdir public\carimgs\temp
mkdir public\userpics
```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
HOST=0.0.0.0
PORT=3000

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_database_password
DB_NAME=urban_rental
DB_TIMEZONE=+00:00

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d
COOKIE_NAME=auth_token
```

#### Environment Variable Descriptions

| Variable | Description | Default |
|----------|-------------|---------|
| `HOST` | Server host address | 0.0.0.0 |
| `PORT` | Server port number | 3000 |
| `DB_HOST` | MySQL database host | localhost |
| `DB_USER` | Database username | root |
| `DB_PASSWORD` | Database password | (required) |
| `DB_NAME` | Database name | urban_rental |
| `DB_TIMEZONE` | Timezone for database operations | +00:00 |
| `JWT_SECRET` | Secret key for JWT token signing | (required - use strong random string) |
| `JWT_EXPIRES_IN` | Token expiration time | 7d |
| `COOKIE_NAME` | Name of the authentication cookie | auth_token |

---

## Usage

### Starting the Server

Development mode with auto-restart:
```bash
npm run dev
```

Production mode (without nodemon):
```bash
node server.js
```

### API Request Format

All requests should use appropriate HTTP methods and content types:

#### JSON Requests
```json
POST /users/login
Content-Type: application/json

{
  "email": "user@example.com",
  "psw": "password123"
}
```

#### Form Data with File Upload
For vehicle image uploads:
```
Content-Type: multipart/form-data

body: {
  category_id: 1,
  brand: "Toyota",
  model: "Camry",
  color: "Black",
  transmission: "automatic",
  license_plate: "ABC-123",
  year: 2023,
  price_per_day: "75.99"
}
files: {
  img: [file1, file2, ...] // up to 10 images
}
```

### Example API Calls

#### User Registration
```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "psw": "password123"
  }'
```

#### User Login
```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "psw": "password123"
  }' \
  --cookie-jar cookies.txt
```

#### Get User Profile (requires authentication)
```bash
curl http://localhost:3000/users/userprofile \
  --cookie cookies.txt
```

#### Filter Vehicles
```bash
curl -X POST http://localhost:3000/global/filter \
  -H "Content-Type: application/json" \
  -d '{
    "brand": "Toyota",
    "transmission": "automatic",
    "min_price": 50,
    "max_price": 100,
    "sort_order": "high_to_low"
  }'
```

---

## Authentication

### Token-Based Authentication
The API uses JWT tokens stored in HTTP-only cookies for authentication.

#### Cookie Configuration
- **Name**: Defined by `COOKIE_NAME` environment variable (default: `auth_token`)
- **HttpOnly**: true (prevents JavaScript access)
- **Secure**: false (set to true in production with HTTPS)
- **SameSite**: lax
- **MaxAge**: 7 days

### Authentication Flow

1. User sends login credentials (email + password)
2. Server validates credentials against database
3. On success, server generates JWT token and sets it as HTTP-only cookie
4. Client includes cookie in subsequent requests
5. Server verifies token on protected endpoints

### Protected Endpoints
Any endpoint with `Auth Required: Yes` requires a valid authentication token in the cookies.

---

## Middleware

### Custom Middleware

#### 1. Authentication (`userMiddleware.js`)
```javascript
const { auth } = require('./middleware/userMiddleware')
```
- Extracts JWT from cookie
- Verifies token signature and expiration
- Attaches decoded user info to `req.user`
- Returns 401 Unauthorized if invalid

#### 2. Admin Authorization (`adminMiddleware.js`)
```javascript
const { admin } = require('./middleware/adminMiddleware')
```
- Checks if `req.user.role === 'admin'`
- Returns 409 Conflict if not an admin
- Should be chained after auth middleware

#### 3. Vehicle Image Upload (`uploadMiddleware.js`)
```javascript
const { upload } = require('./middleware/uploadMiddleware')
```
- Uses Multer for file uploads
- Maximum file size: 20MB per image
- Accepts: jpg, jpeg, png, gif, svg, webp, avif, bmp, tiff
- Stores temporarily in `public/carimgs/temp/`

#### 4. Profile Picture Upload (`userpicuploadMiddleware.js`)
```javascript
const { useruploadpic } = require('./middleware/userpicuploadMiddleware')
```
- User-specific upload directory: `public/userpics/{user_id}/`
- Maximum file size: 10MB
- File naming format: `{date}-{originalname}`
- Auto-creates user directory

### Middleware Chain Example
```javascript
// Admin route with auth + admin check
app.post('/admin/upload', auth, admin, upload.array('img'), controllerFunction)
```

---

## Security Considerations

### Current Security Features
1. **Password Hashing**: bcrypt with 10 salt rounds
2. **SQL Injection Protection**: Parameterized queries
3. **JWT Tokens**: Time-limited authentication
4. **HTTP-only Cookies**: Prevents XSS token theft
5. **CORS Configuration**: Origin restriction (localhost:5173)
6. **File Upload Validation**: MIME type and extension checking

### Production Recommendations
1. Set `secure: true` in cookie options (requires HTTPS)
2. Use environment variables for all sensitive data
3. Implement rate limiting on login endpoints
4. Add request logging middleware
5. Implement input validation middleware
6. Use a production-ready database connection pool manager
7. Add CSRF protection if using cookies for auth
8. Implement password complexity requirements

---

## Troubleshooting

### Common Issues

#### 1. Database Connection Error
```
Error: ER_ACCESS_DENIED_ERROR
```
- Verify DB credentials in `.env` file
- Ensure MySQL server is running
- Check user permissions for the database

#### 2. File Upload Errors
```
MulterError: File too large
```
- Increase `MAX_FILE_SIZE` in middleware files if needed
- Check disk space availability

#### 3. JWT Verification Failed
```
JsonWebTokenError: invalid token
```
- Ensure `JWT_SECRET` matches between token generation and verification
- Check server time synchronization (token expiration)

#### 4. CORS Errors
```
Access to fetch at '...' has been blocked by CORS policy
```
- Verify frontend origin in `app.js` cors configuration
- For development, ensure frontend runs on `http://localhost:5173`

---

## Development

### Running Tests
```bash
npm test
```
*Note: Test suite not yet implemented*

### Code Style
- Uses standard JavaScript conventions
- Consistent naming: camelCase for functions/variables, PascalCase for classes
- Module exports at the end of each controller/model file

### Adding New Features

1. Create database queries in `models/` directory
2. Implement business logic in `controllers/` directory
3. Define routes in appropriate `routes/` file
4. Add middleware if needed in `middleware/` directory
5. Update this README with new endpoint documentation

---

## License

ISC License - See LICENSE file for details.

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
