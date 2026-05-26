# 🌍 TravelPlanner — Full-Stack Travel Planning Application

A comprehensive web-based travel planning and cost estimation application built with **Spring Boot**, **MySQL/H2**, and **Bootstrap**.

---

## ✨ Features

- **User Authentication** — Register, login, session-based auth with BCrypt
- **Travel Search** — Compare flights, trains, and buses between cities
- **Accommodation** — Browse hotels, hostels, homestays with price/rating filters
- **Tourist Attractions** — Discover popular places, add to itinerary
- **Cost Estimator** — Full trip budget (transport, hotel, food, local transport, entry fees)
- **Reviews & Ratings** — Read and submit reviews for any travel entity
- **Save Itinerary** — Save trips to your dashboard for future reference
- **Responsive UI** — Dark glassmorphism theme, works on all devices

---

## 🛠️ Tech Stack

| Layer      | Technology                     |
|------------|--------------------------------|
| Backend    | Java 17, Spring Boot 3.2       |
| Frontend   | HTML5, CSS3, JavaScript, Bootstrap 5 |
| Database   | H2 (default) / MySQL           |
| ORM        | Spring Data JPA / Hibernate     |
| Security   | Spring Security + BCrypt        |
| Templates  | Thymeleaf                       |

---

## 📁 Project Structure

```
travel-planner/
├── pom.xml
├── README.md
├── src/main/java/com/travelplanner/
│   ├── TravelPlannerApplication.java
│   ├── config/
│   │   └── SecurityConfig.java
│   ├── model/
│   │   ├── User.java
│   │   ├── Trip.java
│   │   ├── TransportOption.java
│   │   ├── Hotel.java
│   │   ├── TouristPlace.java
│   │   └── Review.java
│   ├── repository/
│   │   ├── UserRepository.java
│   │   ├── TripRepository.java
│   │   ├── TransportRepository.java
│   │   ├── HotelRepository.java
│   │   ├── TouristPlaceRepository.java
│   │   └── ReviewRepository.java
│   ├── service/
│   │   ├── UserService.java
│   │   ├── TripService.java
│   │   ├── TransportService.java
│   │   ├── HotelService.java
│   │   ├── TouristPlaceService.java
│   │   └── ReviewService.java
│   └── controller/
│       ├── AuthController.java
│       ├── TransportController.java
│       ├── HotelController.java
│       ├── TouristPlaceController.java
│       ├── TripController.java
│       ├── ReviewController.java
│       └── PageController.java
└── src/main/resources/
    ├── application.properties
    ├── data.sql
    ├── templates/
    │   ├── index.html
    │   ├── login.html
    │   ├── register.html
    │   ├── dashboard.html
    │   ├── search.html
    │   ├── results.html
    │   ├── trip-summary.html
    │   └── reviews.html
    └── static/
        ├── css/style.css
        └── js/app.js
```

---

## 🚀 How to Run

### Prerequisites
- **Java 17+** installed ([Download](https://adoptium.net/))
- **Maven** installed ([Download](https://maven.apache.org/download.cgi))

### Option 1: H2 In-Memory Database (Default — No Setup Needed)

```bash
cd d:\iverilog\bin\travel-planner
mvn spring-boot:run
```

Open your browser at **http://localhost:8080**

> H2 Console available at http://localhost:8080/h2-console (JDBC URL: `jdbc:h2:mem:travel_planner`, user: `sa`, no password)

### Option 2: MySQL Database

1. **Install MySQL** and start the server
2. Create the database:
   ```sql
   CREATE DATABASE travel_planner;
   ```
3. Edit `src/main/resources/application.properties`:
   - Comment out the H2 lines
   - Uncomment the MySQL lines
   - Set your MySQL username and password
4. Run the application:
   ```bash
   mvn spring-boot:run
   ```

---

## 🔑 Demo Account

| Email              | Password    |
|--------------------|-------------|
| demo@travel.com    | password123 |

---

## 🌐 Available Pages

| URL              | Description                    |
|------------------|--------------------------------|
| `/`              | Landing page                   |
| `/login`         | User login                     |
| `/register`      | User registration              |
| `/dashboard`     | Saved trips dashboard          |
| `/search`        | Trip search form               |
| `/results`       | Transport, hotels, attractions |
| `/trip-summary`  | Saved trip detail              |
| `/reviews`       | Reviews & ratings              |

---

## 📡 API Endpoints

| Method | Endpoint                | Description            |
|--------|------------------------|------------------------|
| POST   | `/api/auth/register`    | Register new user      |
| POST   | `/api/auth/login`       | Login                  |
| POST   | `/api/auth/logout`      | Logout                 |
| GET    | `/api/auth/status`      | Check login status     |
| GET    | `/api/transport/search` | Search transport       |
| GET    | `/api/hotels/search`    | Search hotels          |
| GET    | `/api/places/search`    | Search attractions     |
| POST   | `/api/trips`            | Create/save trip       |
| GET    | `/api/trips`            | Get user's trips       |
| GET    | `/api/trips/{id}`       | Get trip details       |
| POST   | `/api/trips/calculate`  | Calculate trip cost    |
| GET    | `/api/reviews`          | Get reviews            |
| POST   | `/api/reviews`          | Submit review          |

---

## 📊 Database Tables

| Table              | Purpose                          |
|--------------------|----------------------------------|
| `users`            | User accounts                    |
| `trips`            | Saved trip plans with costs      |
| `transport_options` | Flight/train/bus options         |
| `hotels`           | Accommodation options            |
| `tourist_places`   | Attractions at destinations      |
| `reviews`          | User reviews and ratings         |

---

## 🎨 Sample Data Included

- **5 Cities**: Delhi, Mumbai, Goa, Jaipur, Bangalore
- **30+ Transport Options**: Flights, trains, buses
- **25+ Hotels**: From budget hostels to luxury properties
- **30+ Tourist Attractions**: With descriptions and entry fees
- **5 Sample Reviews**: Pre-loaded for demo

---

*Built with ❤️ as a full-stack travel planning application*
