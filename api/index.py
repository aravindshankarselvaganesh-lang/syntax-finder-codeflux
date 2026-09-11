from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

from api.ai_routes import router as ai_router

app = FastAPI(title="PSM API", description="Intelligent Drilling Intelligence System API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ai_router, prefix="/api/ai", tags=["ai"])

@app.get("/api/health")
def health_check():
    return {"status": "ok", "service": "PSM Backend on Vercel"}

# Vercel needs 'app' to be exported. The file being named index.py makes it the default entrypoint for /api
