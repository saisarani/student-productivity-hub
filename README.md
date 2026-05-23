# 🎯 Student Productivity Hub

Your all-in-one productivity companion for students. Track your progress, stay focused, and manage your academic journey efficiently.

## 🚀 Features

✅ **Pomodoro Timer** - 25-minute focus sessions with break tracking  
✅ **To-Do List** - Organize tasks with priority labels  
✅ **Notes Section** - Save and search your notes  
✅ **Resume Tracker** - Track projects and skills learned  
✅ **Daily Coding Streak** - Build your coding habit  
✅ **CGPA Calculator** - Track academic performance  

## 🛠️ Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js + Express
- **Database**: SQLite
- **API Communication**: Axios

## 📁 Project Structure

```
student-productivity-hub/
├── frontend/           # React.js application
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
├── backend/            # Node.js + Express server
│   ├── database/
│   │   └── init.js
│   ├── server.js
│   ├── .env.example
│   └── package.json
├── .gitignore
└── README.md
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Start the backend server:
```bash
npm run dev
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React application:
```bash
npm start
```

Application will open on `http://localhost:3000`

## 📚 Feature Breakdown

### 1. Pomodoro Timer
- 25-minute focus sessions
- 5-minute break timers
- Session count tracking

### 2. To-Do List
- Create, edit, delete tasks
- Priority labels (High, Medium, Low)
- Mark tasks as completed

### 3. Notes
- Create and save notes
- Search functionality
- Markdown support (future)

### 4. CGPA Calculator
- Subject-wise GPA tracking
- Semester GPA calculation
- Overall CGPA tracking

### 5. Coding Streak
- Daily coding hours tracking
- Streak calendar
- Motivational statistics

### 6. Resume Tracker
- Track completed projects
- Log skills learned
- Monitor job applications sent

## 🗄️ Database Schema

### Tables
- `todos` - To-do list items
- `pomodoro_sessions` - Pomodoro session tracking
- `notes` - User notes
- `coding_streak` - Daily coding activity
- `cgpa_records` - CGPA and grades
- `resume_tracker` - Projects and skills

## 🔄 API Endpoints (To be implemented)

- `GET /api/health` - Health check
- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create todo
- `GET /api/notes` - Get all notes
- `POST /api/notes` - Create note
- And more...

## 🎨 Future Enhancements

- [ ] Dark mode
- [ ] User authentication/login
- [ ] Mobile responsive UI
- [ ] AI study planner
- [ ] Reminders and notifications
- [ ] Progress analytics dashboard

## 📝 Development Workflow

1. Create feature branch: `git checkout -b feature/feature-name`
2. Make changes
3. Commit: `git commit -m "Add feature description"`
4. Push: `git push origin feature/feature-name`
5. Create Pull Request

## 📄 License

This project is open source.

## 👨‍💻 Author

**saisarani**

---

**Happy coding! 🚀**
