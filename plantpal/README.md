🌿 PlantPal — Discover & Care for Your Favorite Plants

PlantPal is a simple and beautiful React web app that helps users discover, learn, and care for plants using real data from the Trefle API
.
Designed with a clean, nature-inspired aesthetic, PlantPal makes it easy to explore plant species, view care details, and save favorites.

🚀 Project Overview

PlantPal allows users to:

🌱 Browse and search for plants by name or type.

🔍 View detailed information such as scientific name, family, and care instructions.

💚 Save plants to favorites (local storage or future Supabase integration).

📱 Enjoy a modern, responsive UI that works across desktop and mobile.

This project is part of the ALX Frontend Capstone Project, showcasing API integration, React component structure, and responsive design.

🧩 Tech Stack
Category	Tools / Libraries
Frontend Framework	React (with Vite)
Routing	React Router DOM
Styling	Tailwind CSS
API Data	Trefle API

Design Tool	Figma
Deployment	Vercel / Netlify (planned)
📁 Project Structure
src/
 ┣ components/
 ┃ ┣ SearchBar.jsx
 ┃ ┣ PlantCard.jsx
 ┃ ┗ PlantList.jsx
 ┣ pages/
 ┃ ┣ LandingPage.jsx
 ┃ ┣ ExplorePage.jsx
 ┃ ┗ PlantDetails.jsx
 ┣ App.jsx
 ┗ index.css

🖥️ Key Screens (from Figma)

Landing Page — App intro with tagline and CTA (“Explore Plants”)

Explore Page — Search bar and plant grid fetched from API

Plant Details Page — Full details, care info, and “Add to Favorites” button

(Optional) Favorites Page — List of saved plants

💚 All screens are responsive (desktop 1440px & mobile 375px).

🔧 Setup & Installation
1️⃣ Clone the Repository
git clone https://github.com/yourusername/plantpal.git
cd plantpal

2️⃣ Install Dependencies
npm install

3️⃣ Run the Development Server
npm run dev


Visit 👉 http://localhost:5173

4️⃣ (Optional) Build for Production
npm run build

🌐 API Integration

PlantPal uses the Trefle API for plant data.
You’ll need an API key from trefle.io
.

Example usage:

const response = await fetch(`https://trefle.io/api/v1/plants?token=YOUR_API_KEY`);
const data = await response.json();

✨ Future Improvements

✅ Persistent favorites with Supabase

✅ Advanced filtering (by sunlight, watering, etc.)

✅ Dark mode

✅ User authentication

🧠 Learnings

Through this project, I practiced:

Building a full React app from scratch

Structuring components and pages

Integrating an external API

Designing responsive layouts in Figma

Managing project flow using ALX Capstone milestones

📸 Preview (from Figma)

(Insert your Figma design link here)
👉 Figma Design — PlantPal UI

👩🏽‍💻 Author

Emmaan Kinyua
Frontend Developer | Nature Lover 🌱
GitHub:https://github.com/EmmsKarimi/plantpal
LinkedIn: https://www.linkedin.com/in/emma-karimi-kinyua-6525a1257/