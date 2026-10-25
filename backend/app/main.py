from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.routes.complaints import router as complaints_router

from app.models import complaint


Base.metadata.create_all(
    bind=engine
)


app = FastAPI(
    title="SevaSetu AI API",
    description="AI-powered civic complaint management platform",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(
    complaints_router
)


@app.get("/")
def root():

    return {
        "message": "SevaSetu AI API is running",
        "status": "online",
    }


@app.get("/health")
def health():

    return {
        "status": "healthy",
        "service": "SevaSetu AI",
    }