from datetime import datetime

from sqlalchemy import Column, DateTime, Integer, String, Text

from app.database import Base


class Complaint(Base):

    __tablename__ = "complaints"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    complaint_id = Column(
        String(30),
        unique=True,
        index=True,
        nullable=False,
    )

    category = Column(
        String(100),
        nullable=False,
    )

    description = Column(
        Text,
        nullable=False,
    )

    location = Column(
        String(255),
        nullable=False,
    )

    severity = Column(
        String(30),
        default="Medium",
    )

    department = Column(
        String(150),
        default="Municipal Corporation",
    )

    status = Column(
        String(50),
        default="Reported",
    )

    image_url = Column(
        String(500),
        nullable=True,
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )