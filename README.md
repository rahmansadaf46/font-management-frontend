# Font Management System - Frontend

![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Vite](https://img.shields.io/badge/Vite-6.x-yellow)
![Redux](https://img.shields.io/badge/Redux-4.x-purple)
![React Router](https://img.shields.io/badge/React_Router-7.x-orange)

## Project Structure (Updated with .env)

```
font-management-frontend/
├── public/                # Static assets
├── src/                   # Source code
│   ├── assets/            # Static files like images
│   ├── components/        # Reusable UI components
│   ├── pages/             # Page components
│   ├── services/          # API service layer
│   ├── store/             # Redux store
│   ├── types/             # Type definitions
├── .env                   # Environment variables
├── .gitignore
├── index.html             # Main HTML file
├── package.json
├── tsconfig.json          # TypeScript config
└── vite.config.ts         # Vite config
```

## Features

- Drag-and-drop font upload (TTF only)
- Font preview functionality
- Create and manage font groups
- Responsive design with Bootstrap
- State management with Redux Toolkit
- Type-safe codebase
- Single-page application with React Router

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend server running (see [backend repository](https://github.com/rahmansadaf46/font-management-backend))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rahmansadaf46/font-management-frontend.git
   cd font-management-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Environment Variables

Create a `.env` file in the root directory with the following content:

```env
# Base URL for API requests
VITE_API_BASE_URL=http://localhost:5050/api

```

### Running the Application

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

Other commands:
- `npm run build`: Create production build
- `npm run preview`: Preview production build locally
- `npm run lint`: Run ESLint

## API Service Configuration

The API service is configured in `src/services/api.ts` to use the environment variable:

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

```

## Key Components

### Pages
- **Home**: Dashboard view
- **FontUploadPage**: Upload TTF fonts
- **FontListPage**: View all uploaded fonts
- **FontGroupsPage**: Manage font groups
- **CreateFontGroupPage**: Create new font groups

### Components
- **FontUpload**: Drag-and-drop file upload component
- **FontList**: Displays all fonts with previews
- **FontGroupList**: Shows all font groups
- **CreateFontGroup**: Form to create new groups
- **EditFontGroupModal**: Modal for editing groups

## Dependencies

### Core
- `react`: ^19.0.0
- `react-dom`: ^19.0.0
- `typescript`: ~5.7.2

### State Management
- `@reduxjs/toolkit`: ^2.6.1
- `react-redux`: ^9.2.0

### Routing
- `react-router-dom`: ^7.4.1

### UI
- `bootstrap`: ^5.3.4
- `lucide-react`: ^0.487.0
- `@fortawesome/react-fontawesome`: ^0.2.2

### API
- `axios`: ^1.8.4
- `react-dropzone`: ^14.3.8 (for file uploads)

### Development
- `vite`: ^6.2.0
- `@vitejs/plugin-react`: ^4.3.4
- `eslint`: ^9.21.0

## Connecting to Backend

1. Ensure your backend server is running (default: `http://localhost:5050`)
2. Verify the `VITE_API_BASE_URL` in your `.env` file points to your backend API
3. The frontend will automatically use this URL for all API requests

## Deployment

For production deployment:
1. Set production environment variables
2. Build the project:
   ```bash
   npm run build
   ```
3. Deploy the contents of the `dist` folder to your hosting provider

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

For any questions or issues, please open an issue on the [GitHub repository](https://github.com/rahmansadaf46/font-management-frontend/issues).
