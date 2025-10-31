# Finance Plan

A full-stack solution for financial planning, including backend, frontend, and Docker orchestration.

## 🔍 Overview

This project allows users to plan and monitor personal or business finances, tracking income, expenses, projections, and dashboards. The architecture is divided into three layers: **backend**, **database**, and **frontend**, all containerized for easy deployment and maintenance.

## 🧰 Technologies Used

* **Backend:** Python + Flask
* **Frontend:** React / TypeScript
* **Database:** (e.g., PostgreSQL)
* **Orchestration:** Docker Compose
* **Architecture:** Hexagonal, Clean Code practices, TDD (Test-Driven Development)
* **Other tools:** Git, GitHub

## 📁 Repository Structure

```
/
│   docker-compose.yml
│   README.md
│   .gitignore
│
├── backend/
│   ├── app/
│   ├── tests/
│   └── …
├── database/
│   └── scripts/
└── frontend/
    ├── src/
    ├── public/
    └── …
```

## 🚀 Running the Project Locally

1. Clone the repository:

```bash
git clone https://github.com/juniorrrfagundes/finance-plan.git
cd finance-plan
```

2. Configure environment variables:

```bash
cp .env.example .env
# Edit variables like DB_HOST, DB_USER, DB_PASS, FRONTEND_PORT, etc.
```

3. Start containers with Docker Compose:

```bash
docker-compose up --build
```

4. Access via browser:

* Frontend: `http://localhost:<PORT_FRONTEND>`
* API: `http://localhost:<PORT_BACKEND>/api/docs` (if Swagger documentation exists)

## 🧪 Tests

* Backend tests:

```bash
cd backend
pytest
```

* Frontend tests:

```bash
cd frontend
npm test
```

## 📦 Production / Deployment

Configure environment variables for production, use optimized Docker images, and run:

```bash
docker-compose -f docker-compose.prod.yml up --build
```

Consider CI/CD, monitoring, and logging for production.

## 📝 Main Features

* User registration and authentication
* Income and expense tracking
* Cash flow projections
* Dashboard with interactive charts
* (Optional) PDF report export
* (Optional) Geospatial data visualization
* Containerized for easy deployment

## 👨‍💻 Author

**Junior Rafael Rosa Fagundes**
Computer Engineering graduate with experience in Python, SQL, ArcGIS, React, Docker, and best coding practices (Hexagonal Architecture, TDD).
GitHub: [https://github.com/juniorrrfagundes](https://github.com/juniorrrfagundes)
LinkedIn: [https://www.linkedin.com/in/junior-fagundes-385731201/](https://www.linkedin.com/in/junior-fagundes-385731201/)

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
