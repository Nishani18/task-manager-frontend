# Task Manager Frontend

A modern, responsive task management application built with React, TypeScript, and Vite.

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool and dev server
- **CSS3** - Styling

## Features

- ✅ Create new tasks
- ✅ View all tasks with filtering (pending/completed)
- ✅ Pagination support
- ✅ Mark tasks as completed or pending
- ✅ Delete tasks
- ✅ Responsive design
- ✅ Real-time updates
- ✅ Error handling with user feedback

## Project Structure

```
task-manager-frontend/
│
├── src/
│   ├── api/
│   │   └── httpClient.ts       # API service
│   │   └── index.ts            # API barrel file
│   │   └── taskApi.ts          # Backend API calls
│   │
│   ├── assets/                 # Static assets (images, icons)
│   │
│   ├── components/             # Reusable React components
│   │   ├── ConfirmModal.tsx    # Confirmation Modal
│   │   ├── Pagination.tsx      # Pagination control
│   │   ├── TaskFilter.tsx      # Filter control
│   │   ├── TaskInput.tsx       # Create task form
│   │   ├── TaskList.tsx        # Task list display
│   │   ├── TaskItem.tsx        # Individual task card
│   │   └── Toast.tsx           # Display toast when actions are performed
│   │
│   ├── types/                  # TypeScript type definitions
│   │   └── componentTypes
│   │       └── task.types.ts   # Task interfaces and types
│   │   └── api.types.ts        # API request, response, error interfaces and types
│   │
│   ├── App.tsx                 # Main application component
│   ├── App.css                 # Application styles
│   ├── main.tsx                # Application entry point
│   └── main.css                # Global styles
│
├── public/                     # Static public assets
├── .env                        # Environment variables
├── .gitignore                  # Git ignore rules
├── index.html                  # HTML entry point
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite configuration
└── README.md                   # Project documentation
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Task Manager Backend running on `http://localhost:8000`

### Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Configure environment variables:**

   Create a `.env` file in the root directory:

   ```env
   VITE_API_BASE_URL=http://localhost:5000/api/tasks
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser:**
   ```
   http://localhost:5173
   ```

## Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

## Environment Variables

| Variable            | Description          | Example                     |
| ------------------- | -------------------- | --------------------------- |
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:5000/api/tasks` |

**Note:** All environment variables must be prefixed with `VITE_` to be accessible in the application.

## API Integration

The frontend connects to the Task Manager Backend API with the following endpoints:

| Method | Endpoint     | Description                  |
| ------ | ------------ | ---------------------------- |
| GET    | `/tasks`     | Fetch all tasks with filters |
| POST   | `/tasks`     | Create a new task            |
| PATCH  | `/tasks/:id` | Update task status           |
| DELETE | `/tasks/:id` | Delete a task                |

### Query Parameters (GET /tasks)

- `status` - Filter by status (`pending` or `completed`)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
