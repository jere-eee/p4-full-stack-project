# Phase 4 Full Stack Project by Jeremy Akanle

**GamerzHub** is a full-stack web application that brings together gamers in a local community. The platform allows users to create accounts, join and manage tournaments, post and edit game reviews, and connect with fellow gamers. It features modern UI elements, responsive design with Tailwind CSS, and uses Next.js on the frontend with a Flask-SQLAlchemy backend.

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
  - [Frontend (Next.js)](#frontend-nextjs)
  - [Backend (Flask-SQLAlchemy)](#backend-flask-sqlalchemy)
- [Usage](#usage)
- [Pages & Components](#pages--components)
- [Contributing](#contributing)
- [Technologies](#technologies)
- [License](#license)
- [Links](#links)


---

## Features

- **User Authentication:**  
  Sign-up, login, logout, and account deletion (with confirmation) are supported.

- **Profile Management:**  
  Users can edit their profile details (name, email, profile picture) via an intuitive in-place editing mode.

- **Tournaments:**  
  Browse, join, or leave local gaming tournaments.

- **Game Reviews:**  
  Post, edit, and delete reviews on games. Reviews are only allowed if the user is logged in.

- **Responsive UI:**  
  Fully responsive design for desktop and mobile using Tailwind CSS.

- **Navbar & Footer:**  
  Reusable navigation and footer components across pages.

- **About & Contact Pages:**  
  Informative pages that describe the platform, display statistics, and include a FAQ section.

---

## Installation

### Frontend (Next.js)

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/jere-eee/p4-full-stack-project.git
   cd p4-full-stack-project/client
   ```

2. **Install Dependencies:**


    ```bash
    npm install
    ```
    
3. **Run the Development Server:**

    ```bash
    npm run dev
    ```
    The frontend will be available at http://localhost:3000.

### Backend (Flask-SQLAlchemy)

1. **Navigate to the Backend Folder:**


    ```bash
    cd ../server
    ```
    
2. **Create a Virtual Environment and Activate It:**

    ```bash
    python3 -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```
   
3. **Run the Flask Server:**

    ```bash
    flask run
    ```
    The backend server will run at http://localhost:5000.

---

## Usage

### Authentication:
Users can sign up via the Signup page and log in via the Login page. Once logged in, sessions are maintained (via cookies), and user data is automatically fetched to personalize the experience.

### Profile Management:
The Profile page allows users to view and edit their personal information (name, email, profile picture) as well as log out or delete their account. Updates are sent to the backend via PATCH requests, and deletions require confirmation.

### Tournaments & Reviews:
Users can browse tournaments and join/leave events. The Game page allows users to submit reviews (only when logged in) and manage their existing reviews (edit or delete).

### Responsive Navigation:
The Navbar component adapts between desktop and mobile views, providing an accessible menu for navigation. The Footer is present on every page.

### About & Contact Pages:
The About page introduces the platform with statistics (member count, tournaments held, reviews, etc.) and features member testimonials.
The Contact page provides detailed contact information, including email, phone, and social media links, plus a FAQ section with collapsible answers.

---

## Pages & Components

### Key Pages

#### Home:
The landing page with highlights and calls-to-action. Provides information about GamerzHub, including statistics and testimonials.

#### Games:
Provides a list of games played with clickable cards.

#### Tournaments:
Provides a list of available tournaments for users to join/leave.

#### Contact:
Contains contact details (email, phone, social media) and an FAQ section.

#### Login / Signup:
User authentication pages.

#### Profile:
The user profile page for managing account details (editing, logging out, and account deletion).

### Key Components

#### Navbar:
A responsive navigation bar that displays user information when logged in.

#### Footer:
A simple footer with copyright.

#### Tournament & Game Cards:
Components to display upcoming tournaments and game reviews.

---

## Contributing
Contributions are welcome! If you have an idea for a new feature or a bug fix, please fork the repository and submit a pull request. For major changes, please open an issue first to discuss what you would like to change.

---

## Technologies

Next.js for an excellent React frontend framework.
Flask and SQLAlchemy for the robust backend.
Tailwind CSS for styling and responsiveness.
Heroicons and react-icons for beautiful icons.

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.

---

## Links
Front-end https://p4-full-stack-project.vercel.app/
Back-end https://p4-full-stack-project.onrender.com
