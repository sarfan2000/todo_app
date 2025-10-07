# todo_app

A full-stack Todo application built with **React + Vite** for the frontend, **Python Flask** for the backend, and **MySQL** for the database.

---



## Tech Stack

- **Frontend:** React + Vite
- **Backend:** Python Flask
- **Database:** MySQL (can use phpMyAdmin/XAMPP)

---

## Prerequisites

- Node.js and npm or Yarn
- Python 3.x
- MySQL (with phpMyAdmin or XAMPP)

---

## Setup Instructions

### 1. Database Setup

1. Create a database named `todo`.
2. Create the `tasks_todo` table using the following query:

```sql
CREATE TABLE tasks_todo (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
