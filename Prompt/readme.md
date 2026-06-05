Act as an Expert Full-Stack MERN Developer and System Architect. My goal is to build a complete, working Content Management System (CMS) for a furniture business from scratch. 

The system architecture is divided into two distinct frontend layers communicating with a single backend API:
1. Public Frontend (Target Domain: furniture.com): A view-only catalog for customers to browse furniture items (Beds, Chairs, Tables, etc.).
2. Admin Frontend (Target Domain: admin.furniture.com): A secure, private portal where authorized users can manage the catalog.
3. Centralized Backend (REST API): Handles database interactions and serves both frontends.

### TECH STACK
- Backend: Node.js, Express.js
- Database: MongoDB (using Mongoose)
- Frontend (Both Public & Admin): React.js (using Vite), Tailwind CSS for styling, React Router for navigation, and Axios for API requests.

### PROJECT STRUCTURE (Monorepo approach)
Create a root folder with three sub-directories:
- `/backend` (API & DB)
- `/admin-panel` (React App)
- `/public-store` (React App)

### CORE REQUIREMENTS & FEATURES

1. Database Schema (MongoDB):
- `User` Schema (for Admin access): name, email, password (hashed with bcrypt).
- `Product` Schema: title (e.g., "Wooden King Bed"), category (e.g., Bed, Chair), description, price, imageUrl, isAvailable (boolean).

2. Backend Server (/backend):
- Set up Express server with CORS properly configured to accept requests from both frontends (e.g., localhost:5173 and localhost:5174 during development).
- Implement JWT-based authentication for the Admin routes.
- Create RESTful API endpoints:
  - `GET /api/products` (Public & Admin)
  - `POST /api/products` (Protected - Admin only)
  - `PUT /api/products/:id` (Protected - Admin only)
  - `DELETE /api/products/:id` (Protected - Admin only)
  - `POST /api/auth/login` (Admin Auth)

3. Admin Frontend (/admin-panel):
- Secure login screen.
- Dashboard with a data table listing all products.
- Forms to Add, Edit, and Delete products. Changes here must instantly update the database.

4. Public Frontend (/public-store):
- Clean, modern UI to display products fetched from the backend.
- Filter functionality by category (e.g., show only 'Chairs').
- Responsive grid layout.

### YOUR TASK (Execution Plan)
Please generate the complete codebase step-by-step. Do not skip the boilerplate.
Step 1: Provide the exact folder structure and terminal commands to initialize the three directories.
Step 2: Generate the complete Backend code (server.js, Mongoose models, and route controllers).
Step 3: Generate the React code for the Admin Frontend (Auth context, API integration, and CRUD UI).
Step 4: Generate the React code for the Public Frontend (Catalog display and fetching logic).

Start by providing the response for Step 1 and Step 2. Ask for my confirmation before proceeding to the React frontends.