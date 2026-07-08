<div align="center">

# 🚀 CodeNexus

### AI-Powered Competitive Programming & Developer Assistant

Generate optimized code, review code quality, execute programs, analyze performance, and accelerate software development using Google's Gemini AI.

![Python](https://img.shields.io/badge/Python-3.11-blue?style=for-the-badge&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?style=for-the-badge&logo=fastapi)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-Build-646CFF?style=for-the-badge&logo=vite)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb)
![Redis](https://img.shields.io/badge/Redis-Cache-DC382D?style=for-the-badge&logo=redis)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=for-the-badge&logo=docker)
![Gemini](https://img.shields.io/badge/Gemini-AI-orange?style=for-the-badge)

⭐ Star this repository if you like the project!

</div>

---

# 📖 Overview

CodeNexus is a full-stack AI-powered coding assistant that helps developers and competitive programmers write better code faster.

It combines modern AI with software engineering tools to generate optimized code, perform intelligent code reviews, execute code with custom inputs, generate test cases, and provide analytics through an interactive dashboard.

Designed with scalability in mind, CodeNexus uses Docker, Redis caching, MongoDB storage, and FastAPI to provide a fast and responsive experience.

---

# ✨ Features

## 🤖 AI Code Generation

- Generate optimized code
- Supports multiple programming languages
- Detailed explanation
- Time Complexity
- Space Complexity
- Automatic Test Cases

---

## 🔍 AI Code Review

- AI-powered code analysis
- Best practice suggestions
- Performance improvements
- Readability analysis
- Optimization recommendations

---

## ▶ Code Execution

- Execute generated code
- Custom user input
- Runtime output
- Error handling
- Compilation support

---

## 📊 Analytics Dashboard

- Request statistics
- Language usage
- Performance metrics
- Response time analytics
- Cache statistics
- AI insights

---

## 🔐 User Authentication

- User Signup
- Login
- Password Reset
- Secure Authentication

---

## ⚡ High Performance

- Redis Caching
- Docker Containers
- FastAPI Backend
- Optimized API calls

---

# 🌍 Supported Programming Languages

- Python
- Java
- C++
- C
- JavaScript
- SQL

---

# 🖼 Application Preview

## 🏠 Home

![](assets/screenshots/home.png)

---

## 🔐 Login

![](assets/screenshots/login.png)

---

## 📊 Dashboard

![](assets/screenshots/dashboard.png)

---

## 🤖 AI Code Generation

![](assets/screenshots/codegen.png)

---

## 🔍 AI Code Review

![](assets/screenshots/codereview.png)

---

## 📈 Analytics Dashboard

![](assets/screenshots/analytics.png)

---

# 🏗 System Architecture

```
                    User
                      │
                      ▼
          React + Vite Frontend
                      │
                      ▼
               FastAPI Backend
                      │
        ┌─────────────┼─────────────┐
        ▼             ▼             ▼
   Gemini AI      MongoDB        Redis
        │             │             │
        └─────────────┴─────────────┘
```

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- Axios
- React Router

---

## Backend

- FastAPI
- Python
- Uvicorn
- Pydantic

---

## Artificial Intelligence

- Google Gemini 2.5 Flash

---

## Database

- MongoDB

---

## Cache

- Redis

---

## DevOps

- Docker
- Docker Compose

---

# 📂 Folder Structure

```
CodeNexus
│
├── backend
│   ├── app
│   ├── Dockerfile
│   ├── requirements.txt
│   └── ...
│
├── frontend
│   ├── src
│   ├── public
│   ├── Dockerfile
│   └── ...
│
├── assets
│   └── screenshots
│
├── docker-compose.yml
│
└── README.md
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/hasinigolla/CodeNexus.git

cd CodeNexus
```

---

## Backend Setup

```bash
cd backend

pip install -r requirements.txt
```

Create a `.env` file inside the `backend` folder.

Example:

```env
GEMINI_API_KEY=your_api_key

MONGO_URL=your_mongodb_connection_string

REDIS_HOST=localhost

REDIS_PORT=6379
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# 🐳 Docker Deployment

Run the complete application:

```bash
docker compose up --build
```

---

## Frontend

```
http://localhost:5173
```

---

## Backend

```
http://localhost:8000
```

---

## API Documentation

```
http://localhost:8000/docs
```

---

# 📈 Future Enhancements

- Voice-Based AI Assistant
- AI Interview Preparation
- Real-Time Collaborative Coding
- Contest Recommendation System
- Leaderboards
- AI Debugging Assistant
- Code Similarity Detection
- GitHub Repository Analysis
- AI Resume Builder
- AI Pair Programmer

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository

2. Create a feature branch

```bash
git checkout -b feature-name
```

3. Commit changes

```bash
git commit -m "Add feature"
```

4. Push

```bash
git push origin feature-name
```

5. Open a Pull Request

---

# 👨‍💻 Author

## Hasini Golla

Computer Science Engineering Student

Full Stack Developer • AI Enthusiast • Competitive Programmer

GitHub:

https://github.com/hasinigolla

---

<div align="center">

## ⭐ If you found this project useful, please give it a Star!

Made with ❤️ by Hasini Golla

</div>