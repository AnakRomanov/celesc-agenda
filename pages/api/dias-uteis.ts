from fastapi import FastAPI, Query
from datetime import datetime, timedelta

app = FastAPI()

def is_business_day(date: datetime) -> bool:
    return date.weekday() < 5  # Monday=0, Sunday=6

@app.get("/api/dias-uteis")
def contar_dias_uteis(inicio: str = Query(...), fim: str = Query(...)):
    try:
        data_inicio = datetime.strptime(inicio, "%Y-%m-%d")
        data_fim = datetime.strptime(fim, "%Y-%m-%d")
    except ValueError:
        return {"erro": "Formato de data inválido. Use YYYY-MM-DD."}

    if data_inicio > data_fim:
        return {"erro": "Data de início não pode ser maior que a data final."}

    dias_uteis = 0
    data_atual = data_inicio
    while data_atual <= data_fim:
        if is_business_day(data_atual):
            dias_uteis += 1
        data_atual += timedelta(days=1)

    return {
        "inicio": inicio,
        "fim": fim,
        "dias_uteis": dias_uteis
    }