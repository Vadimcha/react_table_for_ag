from fastapi import FastAPI, APIRouter
from db import print_table
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(title="journal_bot_ag API")#, openapi_url="/openapi.json")

origins = [
    "http://localhost:3000",
    "http://localhost:3001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_router = APIRouter()

@api_router.get("/get_database", status_code=200)
def root() -> dict:
    data = print_table("database")
    return data

@api_router.get("/get_users", status_code=200)
def root() -> dict:
    data = print_table("users")
    return data

@api_router.post("/send_code", status_code=200)
def code(data: dict):
    code = send_mail(data["email"])
    return code

import smtplib, random
def send_mail(student_st):
    try:
        smtpObj = smtplib.SMTP('smtp.yandex.ru:587')
        smtpObj.starttls()
        smtpObj.login('ag.spbu@yandex.ru', "journal.ag.spbu@yandex.ru")
        random_number = str(random.randint(100, 1000))
        student_mail = student_st
        smtpObj.sendmail("ag.spbu@yandex.ru",student_mail, random_number)
        smtpObj.quit()
        random_number = int(random_number)
        return random_number
    except Exception as e:
        print(e)

app.include_router(api_router)

if __name__ == "__main__":
    # Use this for debugging purposes only
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8001, log_level="debug")
