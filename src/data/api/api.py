from fastapi import FastAPI, APIRouter
from db import print_table
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(title="journal_bot_ag API")#, openapi_url="/openapi.json")

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_router = APIRouter()

@api_router.get("/get_db", status_code=200)
def root() -> dict:
    data = print_table("database")
    return data

app.include_router(api_router)

if __name__ == "__main__":
    # Use this for debugging purposes only
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8001, log_level="debug")
