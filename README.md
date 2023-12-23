# Book Review App - Laravel Inertia React Demo Application

Welcome to the Book Review App, a demo application showcasing my work with Laravel, Inertia.js, and React.

## Key Features

-   **Laravel Inertia.js Integration**: Seamless integration of Inertia.js for a smooth React experience.
-   **Efficient Query Filtering**: Utilization of scope methods for efficient query filtering.
-   **Data Consistency**: Establishment of relationships between models for consistent data handling.
-   **Database Schema Setup**: Perform migrations for setting up and updating the database schema.
-   **Initial Data Seeding**: Seed data for initial application testing and development.
-   **Data Caching**: Implementation of data caching for improved performance.

## Demo Application

This repository serves as a demonstration of my skills in building applications with Laravel, Inertia.js, and React.

## Installation

Follow these steps to set up and run the Book Review App locally:

1. **Clone the Repository:**

```bash
    git clone https://github.com/amansultani/book-review
    cd book-review-app
```

2. **Install Laravel,React and Dependencies:**

```bash
    composer install
    npm install
```

3. **Copy ENV file:** make sure to configure your database

```bash
    cp .env.example .env
```

4. **Run Migrations and database Seeders:**

```bash
    php artisan migrate --seed
```

5. **Start Application:**

```bash
    npm run dev
    php artisan serve
```
