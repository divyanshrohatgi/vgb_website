# BNI Clone - MERN Stack

This project is a clone of the [Business Network International (BNI) website](https://www.bni.com/) built using the MERN stack (MongoDB, Express.js, React.js, and Node.js).

## Features

- Responsive design that mimics the original BNI website
- User authentication and registration
- Member profiles
- Chapter information and listings
- Testimonials
- Statistics and metrics display
- Mobile-friendly UI

## Technology Stack

### Frontend
- React.js
- React Router for routing
- Styled Components for styling
- React Icons for icons
- React Slick for carousel/slider
- Framer Motion for animations
- React CountUp for statistics animation

### Backend
- Node.js
- Express.js
- MongoDB for the database
- Mongoose as MongoDB ODM
- JWT for authentication
- Bcrypt for password hashing

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)

### Installation Steps

1. Clone the repository
```bash
git clone https://github.com/yourusername/bni-clone.git
cd bni-clone
```

2. Install all dependencies
```bash
npm run install-deps
```

3. Set up environment variables
- Create a `.env` file in the server directory with the following variables:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

4. Run the development server
```bash
npm run dev
```

This will start both the backend server on port 5000 and the frontend development server on port 3000.

## Project Structure

```
bni-clone/
├── client/               # Frontend React application
│   ├── public/           # Public assets
│   └── src/              # React source files
│       ├── components/   # Reusable components
│       ├── pages/        # Page components
│       ├── assets/       # Static assets
│       └── context/      # React context for state management
├── server/               # Backend Express application
│   ├── controllers/      # Request controllers
│   ├── middleware/       # Express middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   └── index.js          # Entry point for the server
└── package.json          # Project dependencies and scripts
```

## Available Scripts

- `npm run dev`: Starts both client and server in development mode
- `npm run server`: Starts just the backend server with nodemon
- `npm run client`: Starts just the frontend development server
- `npm run build`: Builds the React frontend for production
- `npm start`: Starts the production server after building

## License

This project is for educational purposes only. The original BNI website and its design are owned by BNI Global, LLC.

## Acknowledgements

- This project is inspired by the [BNI Website](https://www.bni.com/)
- All images and logos used in this project belong to their respective owners
