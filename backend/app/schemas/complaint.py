from datetime import datetime

from pydantic import BaseModel, ConfigDict


class ComplaintCreate(BaseModel):
    category: str
    description: str
    location: str
    severity: str = "Medium"
    department: str = "Municipal Corporation"
    image_url: str | None = None


class ComplaintUpdate(BaseModel):
    department: str | None = None
    status: str | None = None
    severity: str | None = None


class ComplaintResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    complaint_id: str
    category: str
    description: str
    location: str
    severity: str
    department: str
    status: str
    image_url: str | None
    created_at: datetime