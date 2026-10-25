# SevaSetu AI — Intelligent Civic Complaint Management Platform

<p align="center">

  **Connecting Citizens with Municipal Authorities Through Technology**

  An AI-powered civic complaint management platform designed to make reporting, tracking, and resolving urban problems simpler, faster, and more transparent.

</p>

---

## 📌 Overview

**SevaSetu AI** is a civic technology platform that bridges the gap between citizens and municipal authorities. It enables citizens to report everyday urban problems through a digital interface and helps administrators manage complaints, monitor progress, and improve accountability.

Citizens can describe civic issues such as potholes, garbage accumulation, broken streetlights, water shortages, and drainage problems. The platform is designed to analyze submitted information, recommend an appropriate issue category and department, and support complaint tracking.

The project aims to encourage citizen participation, streamline municipal workflows, and support more efficient urban governance.

## 🎯 Problem Statement

Urban communities frequently face challenges when reporting and resolving civic problems:

- Complicated or fragmented complaint-reporting processes.
- Limited visibility into complaint status and progress.
- Delays in directing complaints to the appropriate department.
- Lack of centralized complaint records and monitoring.
- Limited access to useful information about complaint resolution.

SevaSetu AI proposes a unified digital platform to make these processes more accessible, organized, and transparent.

## 💡 Proposed Solution

SevaSetu AI provides a citizen-facing reporting interface and an administrative complaint-management interface.

The intended workflow is:

1. A citizen opens the platform and reports a civic issue.
2. The citizen enters a description and location and can select an image.
3. The application analyzes the description and suggests a category, severity, and responsible department.
4. The citizen reviews the suggested complaint details.
5. The complaint is submitted and stored in the PostgreSQL database.
6. The citizen can view complaint information and track its status.
7. Administrators can manage complaints, update their status, and monitor complaint statistics.

*Note: AI classification, voice input, image storage, and other integrations may be at different stages of implementation. Only features connected and tested in the current build should be presented as fully operational.*

## ✨ Key Features

### 👤 Citizen Module

- Citizen-facing dashboard.
- Civic issue reporting interface.
- Text-based issue description.
- Image selection and preview interface.
- AI-assisted complaint categorization prototype.
- Suggested severity and department.
- Complaint review before submission.
- Complaint submission confirmation.
- Complaint history and tracking interfaces.
- Complaint status visibility.

### 🛡️ Administrator Module

- Administrative dashboard.
- Complaint listing and inspection.
- Complaint details view.
- Department and status management interfaces.
- Complaint analytics dashboard.
- Status-based complaint monitoring.

### 🤖 AI-Assisted Workflow

The prototype is designed to assist with:

- Identifying the likely category of a civic issue.
- Suggesting an appropriate severity level.
- Recommending a responsible municipal department.
- Reducing manual effort during complaint classification.

The current description-based classification should be treated as a prototype unless a trained or externally integrated AI model has been connected and validated.

### 🗄️ Data Management

- PostgreSQL database integration.
- SQLAlchemy ORM for database operations.
- Structured complaint records.
- Unique complaint identifiers.
- Complaint status and department fields.
- Creation and update timestamps.

## 🧰 Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React |
| Development server and build tool | Vite |
| Styling | Tailwind CSS |
| Routing | React Router |
| Backend API | FastAPI |
| Programming languages | JavaScript and Python |
| Database | PostgreSQL |
| Database ORM | SQLAlchemy |
| Database driver | psycopg2-binary or psycopg |
| Configuration | python-dotenv |
| API documentation | Swagger UI / OpenAPI |
| Version control | Git and GitHub |

## 🏗️ System Architecture

```text
             CITIZEN / ADMIN
                    |
                    v
          React + Vite Frontend
                    |
              HTTP / REST API
                    |
                    v
             FastAPI Backend
                    |
          SQLAlchemy ORM Layer
                    |
                    v
             PostgreSQL DB
                    |
                    v
          Stored Complaint Records
```

The frontend communicates with the FastAPI backend through HTTP requests. The backend processes requests and interacts with PostgreSQL through SQLAlchemy.

## 📁 Project Structure

```text
sevasetu-ai/
│
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── database.py
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   └── complaint.py
│   │   ├── schemas/
│   │   │   ├── __init__.py
│   │   │   └── complaint.py
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   └── complaints.py
│   │   └── services/
│   │
│   ├── uploads/
│   ├── .env
│   └── requirements.txt
│
├── public/
├── src/
│   ├── layouts/
│   ├── pages/
│   │   ├── admin/
│   │   └── citizen/
│   ├── App.jsx
│   └── ...
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── .gitignore
└── README.md
```

*This is a representative structure. Some optional files or folders may not yet exist in your local checkout.*

## ⚙️ Prerequisites

Install the following before running the project:

- [Node.js](https://nodejs.org/) — an LTS version compatible with the project.
- npm — included with Node.js.
- [Python](https://www.python.org/downloads/) — Python 3.10 or later is a reasonable starting point; verify compatibility with your installed dependencies.
- [PostgreSQL](https://www.postgresql.org/download/).
- [Git](https://git-scm.com/downloads/).
- A code editor such as [Visual Studio Code](https://code.visualstudio.com/).

## 🚀 Installation and Setup

### 1. Clone the repository

Open PowerShell and run:

```powershell
git clone https://github.com/Patidarvinita08/Sevasetu-AI.git
cd Sevasetu-AI
```

If you already have the project on your computer, open its existing folder instead.

### 2. Configure PostgreSQL

Create a PostgreSQL database named:

```sql
CREATE DATABASE sevasetu_db;
```

If the database already exists, you do not need to create it again.

### 3. Set up the backend

From the project root, run:

```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
```

If PowerShell prevents activation, you can use the virtual environment's Python directly:

```powershell
.\venv\Scripts\python.exe -m pip install -r requirements.txt
```

If `requirements.txt` is missing, create it with the packages used by the backend:

```text
fastapi
uvicorn
sqlalchemy
psycopg2-binary
python-dotenv
python-multipart
```

Install them using:

```powershell
python -m pip install -r requirements.txt
```

If your existing project uses `psycopg[binary]` instead of `psycopg2-binary`, retain the driver your database configuration actually uses rather than installing unnecessary alternatives.

### 4. Configure environment variables

Create a file named `.env` inside the `backend` directory:

```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/sevasetu_db
```

Replace `YOUR_PASSWORD` with your own PostgreSQL password.

Do not commit this file to GitHub. The `.gitignore` file should exclude `.env` and other secret files.

### 5. Start the backend

From the `backend` directory, run:

```powershell
python -m uvicorn app.main:app --reload
```

The API should be available at:

- API root: http://localhost:8000/
- Health check: http://localhost:8000/health
- Interactive API documentation: http://localhost:8000/docs

These URLs assume the application is running locally on port `8000`.

### 6. Start the frontend

Open a **second PowerShell terminal** in the project root:

```powershell
cd "$HOME\Documents\Hackathon\sevasetu-ai"
npm install
npm run dev
```

Vite will print the local development URL. It is commonly:

http://localhost:5173/

Open the URL shown in your terminal.

If you cloned the repository into a different directory, navigate to that directory instead.

## 🔌 Backend API

The complaint router is configured under the `/api/complaints` prefix.

The intended complaint endpoints are:

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/complaints/` | Create a complaint |
| `GET` | `/api/complaints/` | Retrieve complaint records |
| `GET` | `/api/complaints/{complaint_id}` | Retrieve a complaint by its identifier |
| `PATCH` | `/api/complaints/{complaint_id}` | Update supported complaint fields |

If the optional image-upload endpoint has been implemented, it can be documented as:

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/complaints/upload` | Upload a complaint image |

Confirm the routes available in your current backend using Swagger UI at http://localhost:8000/docs.

## 🗃️ Complaint Data Model

A complaint record can contain the following fields:

| Field | Description |
|---|---|
| `id` | Database record identifier |
| `complaint_id` | Public complaint reference |
| `category` | Civic issue category |
| `description` | Citizen-provided issue description |
| `location` | Reported issue location |
| `severity` | Complaint severity |
| `department` | Responsible or suggested department |
| `status` | Current complaint status |
| `image_url` | Optional image reference |
| `created_at` | Record creation timestamp |
| `updated_at` | Last update timestamp |

### Complaint Lifecycle

The intended complaint lifecycle is:

```text
Reported
   |
   v
Assigned
   |
   v
In Progress
   |
   v
Resolved
```

The actual available status transitions depend on the backend and administrative workflow implemented in the current version.

## 🧪 Testing

Use the following checks to verify the local application:

1. Start PostgreSQL and confirm that the `sevasetu_db` database is accessible.
2. Start the FastAPI backend.
3. Open `/health` and verify that the API responds.
4. Open `/docs` and inspect the available API endpoints.
5. Start the React frontend.
6. Open the citizen reporting page.
7. Enter a sample civic issue and review the suggested details.
8. Submit a complaint and confirm that it is saved in PostgreSQL.
9. Open the complaint tracking page and verify the displayed complaint details.
10. Open the administrator interface and verify the complaint-management features that are connected.

A successful page load alone does not confirm that the database, upload, or AI integrations are working. Test each integration separately.

## 🔐 Security Considerations

- Store database credentials in environment variables.
- Never commit `.env` files, API keys, or passwords.
- Validate uploaded files by file type and size.
- Use unique filenames for uploaded images.
- Validate and sanitize incoming API data.
- Restrict administrative actions to authorized administrators.
- Implement authentication and role-based authorization before production deployment.
- Configure CORS for the actual frontend origin.
- Avoid exposing internal error messages or sensitive database details.
- Use HTTPS and managed secret storage in production.

**Prototype limitation:** Frontend routes or role-specific screens alone do not provide secure authentication or authorization. These controls must also be enforced by the backend.

## 🌱 Future Enhancements

Potential improvements include:

- Integrating a validated AI model for civic issue classification.
- Adding speech-to-text for voice-based complaint reporting.
- Connecting image uploads to persistent storage.
- Introducing map-based location selection and geospatial complaint views.
- Implementing secure citizen and administrator authentication.
- Adding department assignment and notification workflows.
- Providing email or SMS status notifications.
- Improving analytics with complaint-resolution time and department-level statistics.
- Adding automated testing, CI/CD, and production deployment.
- Supporting multilingual reporting for greater accessibility.

These are proposed enhancements and should not be interpreted as completed features unless implemented.

## 🌍 Social Impact

SevaSetu AI is designed to contribute to:

- **Transparency:** Helping citizens understand the progress of their complaints.
- **Accountability:** Organizing civic issues and their responsible departments.
- **Efficiency:** Supporting structured reporting and complaint management.
- **Accessibility:** Making civic issue reporting easier through a digital interface.
- **Data-driven governance:** Enabling analysis of complaint categories, status, and resolution patterns.

## 🎓 Project Information

**Project Name:** SevaSetu AI

**Project Domain:** Civic Technology / Smart Cities / Urban Governance

**Project Category:** Local Community Level Innovations — City & Urban Problems

**Project Type:** Web Application Prototype

**Primary Goal:** Simplify civic complaint reporting and improve visibility into municipal complaint management.

## 🤝 Contributing

Contributions and suggestions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Implement and test your changes.
4. Commit your changes with a descriptive message.
5. Open a pull request describing the improvement.

Please do not include passwords, API keys, personal citizen data, or private complaint images in commits or test fixtures.

## 📄 License

No license has been specified yet. If you intend to publish this project for reuse, choose an appropriate open-source license and add its corresponding `LICENSE` file.

## 📬 Contact

For project questions, collaboration, or feedback, open an issue in the repository:

[SevaSetu AI — GitHub Repository](https://github.com/Patidarvinita08/Sevasetu-AI)

---

<p align="center">

  **SevaSetu AI — Empowering Citizens, Improving Cities.**

</p>
