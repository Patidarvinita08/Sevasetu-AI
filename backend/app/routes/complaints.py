from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.complaint import Complaint
from app.schemas.complaint import (
    ComplaintCreate,
    ComplaintResponse,
    ComplaintUpdate,
)

router = APIRouter(
    prefix="/api/complaints",
    tags=["Complaints"],
)


def generate_complaint_id(db: Session):

    count = db.query(Complaint).count() + 1

    return f"SVS-{1000 + count}"


@router.post(
    "/",
    response_model=ComplaintResponse,
)
def create_complaint(
    complaint: ComplaintCreate,
    db: Session = Depends(get_db),
):

    complaint_id = generate_complaint_id(db)

    new_complaint = Complaint(
        complaint_id=complaint_id,
        category=complaint.category,
        description=complaint.description,
        location=complaint.location,
        severity=complaint.severity,
        department=complaint.department,
        status="Reported",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
    )

    db.add(new_complaint)
    db.commit()
    db.refresh(new_complaint)

    return new_complaint


@router.get(
    "/",
    response_model=list[ComplaintResponse],
)
def get_complaints(
    db: Session = Depends(get_db),
):

    return (
        db.query(Complaint)
        .order_by(Complaint.created_at.desc())
        .all()
    )


@router.get(
    "/{complaint_id}",
    response_model=ComplaintResponse,
)
def get_complaint(
    complaint_id: str,
    db: Session = Depends(get_db),
):

    complaint = (
        db.query(Complaint)
        .filter(
            Complaint.complaint_id == complaint_id
        )
        .first()
    )

    if not complaint:
        raise HTTPException(
            status_code=404,
            detail="Complaint not found",
        )

    return complaint


@router.patch(
    "/{complaint_id}",
    response_model=ComplaintResponse,
)
def update_complaint(
    complaint_id: str,
    updates: ComplaintUpdate,
    db: Session = Depends(get_db),
):

    complaint = (
        db.query(Complaint)
        .filter(
            Complaint.complaint_id == complaint_id
        )
        .first()
    )

    if not complaint:
        raise HTTPException(
            status_code=404,
            detail="Complaint not found",
        )

    if updates.department is not None:
        complaint.department = updates.department

    if updates.status is not None:
        complaint.status = updates.status

    if updates.severity is not None:
        complaint.severity = updates.severity

    complaint.updated_at = datetime.utcnow()

    db.commit()
    db.refresh(complaint)

    return complaint