from fastapi import FastAPI
from app.routes.topsis import router as topsis
from app.routes.ahp import router as ahp
from app.routes.wsm import router as wsm
from app.routes.promethee import router as promethee
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Replace with the frontend URL
    allow_credentials=True,
    allow_methods=["POST", "OPTIONS"],  # Allow specific methods
    allow_headers=["*"],  # Allow all headers
)

app.include_router(topsis)
app.include_router(ahp)
app.include_router(wsm)
app.include_router(promethee)

@app.get("/")
def read_root():
    return {"message": "Hello, Next.js!"}
