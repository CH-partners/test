import os
from dotenv import load_dotenv
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import Base, engine, get_db
from models import User
from schemas import SignupRequest, LoginRequest, TokenResponse
from auth import hash_password, verify_password, create_access_token

load_dotenv()

Base.metadata.create_all(bind=engine)

app = FastAPI()

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "FastAPI backend is running"}

@app.post("/auth/signup")
def signup(request: SignupRequest, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == request.email).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="이미 가입된 이메일입니다.")

    new_user = User(
        email=request.email,
        name=request.name,
        hashed_password=hash_password(request.password),
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "회원가입 성공"}

@app.post("/auth/login", response_model=TokenResponse)
def login(request: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request.email).first()

    if not user:
        raise HTTPException(status_code=401, detail="이메일 또는 비밀번호가 올바르지 않습니다.")

    if not verify_password(request.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="이메일 또는 비밀번호가 올바르지 않습니다.")

    token = create_access_token({
        "sub": user.email,
        "user_id": user.id,
        "name": user.name,
    })

    return {
        "access_token": token,
        "token_type": "bearer",
    }